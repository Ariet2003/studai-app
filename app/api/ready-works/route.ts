import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    const works = await prisma.readyWork.findMany({
      include: {
        price: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(works);
  } catch (error) {
    console.error('Error fetching ready works:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ready works' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const type = formData.get('type') as string;
    const pageCount = parseInt(formData.get('pageCount') as string);
    const file = formData.get('file') as File;

    if (!title || !type || !pageCount || !file) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Найдем подходящую цену для работы
    const price = await prisma.price.findFirst({
      where: {
        workType: type,
        pageRange: pageCount.toString(),
      },
    });

    if (!price) {
      return NextResponse.json(
        { error: 'Invalid work type or page count' },
        { status: 400 }
      );
    }

    // Сохраняем файл
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `/works/${fileName}`;
    await Bun.write(`public${filePath}`, buffer);

    // Создаем запись в базе данных
    const work = await prisma.readyWork.create({
      data: {
        title,
        type,
        pageCount,
        userId: session.user.id,
        priceId: price.id,
        filePath,
        language: "Русский",
      },
      include: {
        price: true,
        user: true,
      },
    });

    return NextResponse.json(work);
  } catch (error) {
    console.error('Error creating ready work:', error);
    return NextResponse.json(
      { error: 'Failed to create ready work' },
      { status: 500 }
    );
  }
} 