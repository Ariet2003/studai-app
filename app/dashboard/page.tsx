'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import {
  ChartBarIcon,
  DocumentTextIcon,
  CreditCardIcon,
  BellIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const getAvatarUrl = () => {
    if (imageError || !session?.user?.image) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || 'User')}&background=454CEE&color=fff`;
    }
    return session.user.image;
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0A0F23] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-[#454CEE] rounded-full animate-spin" />
      </div>
    );
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-[#0A0F23]">
      {/* Header */}
      <header className="bg-[#181F38] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                alt="StudAI Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-white ml-2">StudAI</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <BellIcon className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <Image
                  src={getAvatarUrl()}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full"
                  onError={() => setImageError(true)}
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-white">{session?.user?.name}</p>
                  <p className="text-xs text-gray-400">{session?.user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Приветствие и статистика */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-4">
            Добро пожаловать, {session?.user?.name?.split(' ')[0]}!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-[#454CEE] to-[#3339AA] p-6 rounded-xl">
              <p className="text-white/80 mb-1">Активные заказы</p>
              <p className="text-3xl font-bold text-white">0</p>
            </div>
            <div className="bg-gradient-to-r from-[#454CEE] to-[#3339AA] p-6 rounded-xl">
              <p className="text-white/80 mb-1">Бонусные баллы</p>
              <p className="text-3xl font-bold text-white">100</p>
            </div>
            <div className="bg-gradient-to-r from-[#454CEE] to-[#3339AA] p-6 rounded-xl">
              <p className="text-white/80 mb-1">Выполнено работ</p>
              <p className="text-3xl font-bold text-white">0</p>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка */}
          <div className="lg:col-span-2 space-y-8">
            {/* Быстрые действия */}
            <div className="bg-[#181F38] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Быстрые действия</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="flex items-center gap-3 p-4 bg-[#242B44] hover:bg-[#2A324E] rounded-lg transition-colors">
                  <DocumentTextIcon className="w-6 h-6 text-[#454CEE]" />
                  <span className="text-white font-medium">Новый заказ</span>
                </button>
                <button className="flex items-center gap-3 p-4 bg-[#242B44] hover:bg-[#2A324E] rounded-lg transition-colors">
                  <ChartBarIcon className="w-6 h-6 text-[#454CEE]" />
                  <span className="text-white font-medium">Статистика</span>
                </button>
                <button className="flex items-center gap-3 p-4 bg-[#242B44] hover:bg-[#2A324E] rounded-lg transition-colors">
                  <CreditCardIcon className="w-6 h-6 text-[#454CEE]" />
                  <span className="text-white font-medium">Пополнить баланс</span>
                </button>
                <button className="flex items-center gap-3 p-4 bg-[#242B44] hover:bg-[#2A324E] rounded-lg transition-colors">
                  <UserCircleIcon className="w-6 h-6 text-[#454CEE]" />
                  <span className="text-white font-medium">Профиль</span>
                </button>
              </div>
            </div>

            {/* История заказов */}
            <div className="bg-[#181F38] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">История заказов</h2>
              <div className="text-center py-8">
                <DocumentTextIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">У вас пока нет заказов</p>
                <button className="mt-4 px-6 py-2 bg-[#454CEE] hover:bg-[#3339AA] text-white font-medium rounded-lg transition-colors">
                  Создать первый заказ
                </button>
              </div>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="space-y-8">
            {/* Профиль */}
            <div className="bg-[#181F38] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Профиль</h2>
              <div className="flex flex-col items-center">
                <Image
                  src={getAvatarUrl()}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full mb-4"
                  onError={() => setImageError(true)}
                />
                <p className="text-lg font-medium text-white">{session?.user?.name}</p>
                <p className="text-sm text-gray-400 mb-6">{session?.user?.email}</p>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Выйти
                </button>
              </div>
            </div>

            {/* Бонусная программа */}
            <div className="bg-[#181F38] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Бонусная программа</h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Прогресс до следующего уровня</span>
                  <span className="text-white">40%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full">
                  <div className="w-[40%] h-full bg-[#454CEE] rounded-full"></div>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Накопите еще 300 баллов для получения статуса VIP
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 