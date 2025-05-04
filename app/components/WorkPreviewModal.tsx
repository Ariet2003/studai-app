import { XMarkIcon, MinusIcon, PlusIcon, DocumentTextIcon, LanguageIcon, CurrencyDollarIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { ReadyWork } from '@/types/work';
import { useState, useEffect } from 'react';

interface WorkPreviewModalProps {
  work: ReadyWork | null;
  onClose: () => void;
  onPurchase: (work: ReadyWork) => void;
}

export default function WorkPreviewModal({ work, onClose, onPurchase }: WorkPreviewModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1.0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  // Функция для преобразования пути файла из docx в pdf
  const getPdfPath = (docxPath: string) => {
    // Убираем public из пути и нормализуем слеши
    let path = docxPath
      .replace('public\\', '')
      .replace(/\\/g, '/');

    // Заменяем папку docx на pdf и расширение на .pdf
    path = path
      .replace('works/docx/', 'works/pdf/')
      .replace('.docx', '.pdf');

    return path;
  };

  if (!work) return null;

  // Получаем путь к PDF файлу
  const pdfPath = getPdfPath(work.filePath);

  console.log('Original path:', work.filePath);   // Для отладки
  console.log('PDF path:', pdfPath);              // Для отладки

  const renderPreview = () => {
    if (isMobile) {
      return (
        <>
          <p className="text-gray-400 text-center mb-6">
            Сейчас вы сможете посмотреть первые 5 страниц работы. Для покупки полной версии вернитесь назад после просмотра и нажмите кнопку "Купить работу"
          </p>
          <a
            href={`/${pdfPath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center"
          >
            Открыть предпросмотр (5 стр.)
          </a>
        </>
      );
    }

    return (
      <iframe
        src={`/${pdfPath}#toolbar=0`}
        className="w-full h-full"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          transition: 'transform 0.2s ease-in-out'
        }}
        onError={(e) => {
          console.error('Error loading PDF:', e);
          setError('Не удалось загрузить PDF файл');
        }}
      />
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
        <div className="relative w-full transform overflow-hidden rounded-xl bg-[#181F38] px-4 pb-4 pt-3 text-left shadow-xl transition-all sm:px-4 sm:pb-4 sm:pt-5 sm:my-8 sm:max-w-5xl sm:p-6">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-400 hover:text-white transition-colors sm:right-4 sm:top-4"
          >
            <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 pr-8">
              {work.title}
            </h3>
            <div className="text-gray-400 space-y-1">
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-[#454CEE]" />
                <p>Тип работы: {work.type}</p>
              </div>
              <div className="flex items-center gap-2">
                <LanguageIcon className="h-5 w-5 text-[#454CEE]" />
                <p>Язык: {work.language}</p>
              </div>
            </div>
          </div>

          {!isMobile ? (
            <>
              <div className="flex items-center justify-end mb-2 gap-1 sm:gap-2">
                <button
                  onClick={handleZoomOut}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                  title="Уменьшить"
                >
                  <MinusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <span className="text-sm sm:text-base text-gray-400">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                  title="Увеличить"
                >
                  <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>

              <div className="bg-white rounded-lg mb-3 sm:mb-6 overflow-hidden">
                <div className="bg-gray-100 p-3 text-center">
                  <p className="text-gray-600">
                    Сейчас вы сможете посмотреть первые 5 страниц работы. Для покупки полной версии вернитесь назад после просмотра и нажмите кнопку "Купить работу"
                  </p>
                </div>
                <div className="relative h-[60vh] sm:h-[70vh] overflow-auto bg-gray-100">
                  {renderPreview()}
                  {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-4">
                      <p className="text-red-500 mb-2">{error}</p>
                      <p className="text-gray-500 text-sm">Путь к файлу: {pdfPath}</p>
                      <button
                        onClick={() => window.open(`/${pdfPath}`, '_blank')}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        Открыть в новой вкладке
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-gray-400 space-y-2">
                  <div className="flex items-center gap-2">
                    <DocumentDuplicateIcon className="h-5 w-5 text-[#454CEE]" />
                    <p>Количество страниц: {work.pageCount}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CurrencyDollarIcon className="h-5 w-5 text-[#454CEE]" />
                    <div>
                      <p className="text-gray-400 text-sm line-through mb-0.5">Старая цена: {work.price.amount} сом</p>
                      <p className="text-lg font-semibold text-[#454CEE]">
                        {work.price.amount / 2} сом
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => onPurchase(work)}
                    className="px-6 py-3 bg-gradient-to-r from-[#454CEE] to-[#3339AA] hover:from-[#3339AA] hover:to-[#454CEE] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 text-base"
                  >
                    Купить работу
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-6">
              {renderPreview()}
              <button
                onClick={() => onPurchase(work)}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#454CEE] to-[#3339AA] hover:from-[#3339AA] hover:to-[#454CEE] text-white font-medium rounded-lg transition-all duration-300 text-base"
              >
                Купить работу
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}