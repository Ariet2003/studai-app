import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import mammoth from 'mammoth';

export async function POST(request: Request) {
  try {
    const { filePath } = await request.json();
    
    if (!filePath) {
      return NextResponse.json(
        { error: 'File path is required' },
        { status: 400 }
      );
    }

    // Нормализуем путь к файлу
    const normalizedPath = filePath.replace(/^public\\/, '').replace(/^public\//, '');
    const fullPath = path.join(process.cwd(), 'public', normalizedPath);
    
    console.log('Attempting to read file:', {
      originalPath: filePath,
      normalizedPath,
      fullPath
    });

    // Проверяем существование файла
    try {
      await fs.access(fullPath);
      console.log('File exists at path:', fullPath);
    } catch (error) {
      console.error('File not found:', fullPath, error);
      return NextResponse.json(
        { error: `File not found at path: ${fullPath}` },
        { status: 404 }
      );
    }

    try {
      // Читаем файл и конвертируем его в HTML
      const buffer = await fs.readFile(fullPath);
      console.log('Successfully read file, size:', buffer.length);

      const options = {
        styleMap: [
          "p[style-name='Title'] => h1.text-center:fresh",
          "p[style-name='Heading 1'] => h1:fresh",
          "p[style-name='Heading 2'] => h2:fresh",
          "p[style-name='Heading 3'] => h3:fresh",
          "p[style-name='Normal'] => p:fresh",
          "p[style-name='List Paragraph'] => li:fresh",
          "r[style-name='Strong'] => strong:fresh",
          "r[style-name='Emphasis'] => em:fresh",
          "p[style-name='Quote'] => blockquote:fresh",
          "p[style-name='Intense Quote'] => blockquote.intense:fresh",
          "p[style-name='Subtitle'] => p.subtitle:fresh",
          "r[style-name='Subtle Emphasis'] => em.subtle:fresh",
          "r[style-name='Intense Emphasis'] => em.intense:fresh",
          "r[style-name='Subtle Reference'] => em.reference:fresh",
          "r[style-name='Intense Reference'] => em.intense-reference:fresh",
          "p[style-name='Caption'] => p.caption:fresh",
          "p[style-name='TOC Heading'] => h1.toc-heading:fresh",
          "p[style-name='TOC 1'] => p.toc-1:fresh",
          "p[style-name='TOC 2'] => p.toc-2:fresh",
          "p[style-name='TOC 3'] => p.toc-3:fresh",
          "r[style-name='Hyperlink'] => a:fresh",
          "p[style-name='Header'] => div.header:fresh",
          "p[style-name='Footer'] => div.footer:fresh",
          "p[style-name='Footnote Text'] => div.footnote:fresh",
          "r[style-name='Footnote Reference'] => sup.footnote-ref:fresh",
          "r[style-name='Strikethrough'] => span.strikethrough:fresh",
          "r[style-name='Highlight'] => span.highlight:fresh",
          "r[style-name='Subscript'] => span.subscript:fresh",
          "r[style-name='Superscript'] => span.superscript:fresh",
          "table[style-name='Table No Borders'] => table.no-borders:fresh",
          "table[style-name='Table Vertical Borders'] => table.vertical-borders:fresh",
          "table[style-name='Table Horizontal Borders'] => table.horizontal-borders:fresh",
          "p[style-name='No Spacing'] => p.no-indent:fresh",
          "p[style-name='First Line Indent'] => p.first-line-indent:fresh",
          "p[style-name='Hanging Indent'] => p.hanging-indent:fresh",
          "p[style-name='Two Columns'] => div.multi-column-2:fresh",
          "p[style-name='Three Columns'] => div.multi-column-3:fresh"
        ],
        transformDocument: (element) => {
          if (element.type === "paragraph") {
            // Обработка выравнивания
            if (element.alignment) {
              element.className = (element.className || "") + 
                ` text-${element.alignment}`;
            }

            // Обработка отступов
            if (element.indent) {
              element.className = (element.className || "") + 
                ` indent-${element.indent}`;
            }

            // Обработка интервалов
            if (element.lineSpacing) {
              const spacing = element.lineSpacing.toString().replace(".", "-");
              element.className = (element.className || "") + 
                ` spacing-${spacing}`;
            }

            // Обработка размера страницы
            if (element.pageSize) {
              if (element.pageSize.width === 210) {
                element.className = (element.className || "") + " a4";
              } else if (element.pageSize.width === 215.9) {
                element.className = (element.className || "") + " letter";
              }
            }
          }

          return element;
        }
      };

      const result = await mammoth.convertToHtml({ buffer: buffer }, options);

      if (result.messages.length > 0) {
        console.log('Conversion messages:', result.messages);
      }

      // Формируем HTML документ
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Document Preview</title>
          <style>
            @page {
              size: A4;
              margin: 0;
            }
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
              .document-preview {
                margin: 0;
                border: none;
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="document-preview a4">
            <div class="page">
              ${result.value}
            </div>
          </div>
        </body>
        </html>
      `;

      return new NextResponse(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        }
      });
    } catch (error) {
      console.error('Error converting file:', error);
      return NextResponse.json(
        { error: 'Failed to convert file' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in preview generation:', error);
    return NextResponse.json(
      { error: 'Failed to generate preview' },
      { status: 500 }
    );
  }
} 