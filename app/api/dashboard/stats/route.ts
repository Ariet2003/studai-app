import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Получаем общее количество работ
    const totalWorks = await prisma.readyWork.count();

    // Получаем количество работ пользователя
    const userWorks = await prisma.readyWork.count({
      where: {
        userId: session.user.id
      }
    });

    // Получаем историю заказов пользователя
    const userWorkHistory = await prisma.readyWork.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        price: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      totalWorks,
      userWorks,
      userWorkHistory
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
} 