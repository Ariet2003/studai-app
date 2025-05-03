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
  ArrowRightOnRectangleIcon,
  AcademicCapIcon,
  ClockIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('user-dropdown');
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              <div className="relative">
                <button 
                  className="flex items-center gap-3 hover:bg-[#242B44] p-2 rounded-lg transition-colors"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <Image
                    src={getAvatarUrl()}
                    alt="Profile"
                    width={36}
                    height={36}
                    className="rounded-full"
                    onError={() => setImageError(true)}
                  />
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-white text-left">{session?.user?.name}</p>
                    <p className="text-xs text-gray-400 text-left">{session?.user?.email}</p>
                  </div>
                </button>
                
                {showDropdown && (
                  <div 
                    id="user-dropdown"
                    className="absolute right-0 mt-2 w-48 bg-[#242B44] rounded-lg shadow-lg py-2 z-50"
                  >
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-[#2A324E] w-full transition-colors"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      <span>Выйти</span>
                    </button>
                  </div>
                )}
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
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            <div className="col-span-1 bg-gradient-to-r from-[#454CEE] to-[#3339AA] p-4 md:p-6 rounded-xl relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4 opacity-10 transition-transform group-hover:translate-y-1/8">
                <DocumentDuplicateIcon className="w-24 md:w-32 h-24 md:h-32" />
              </div>
              <p className="text-white/80 mb-1 text-sm md:text-base">Все заказы</p>
              <p className="text-xl md:text-3xl font-bold text-white">1,234</p>
              <p className="text-xs md:text-sm text-white/60 mt-1 md:mt-2">На платформе</p>
            </div>
            <div className="col-span-1 bg-gradient-to-r from-[#454CEE] to-[#3339AA] p-4 md:p-6 rounded-xl relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4 opacity-10 transition-transform group-hover:translate-y-1/8">
                <ClockIcon className="w-24 md:w-32 h-24 md:h-32" />
              </div>
              <p className="text-white/80 mb-1 text-sm md:text-base">Среднее время</p>
              <p className="text-xl md:text-3xl font-bold text-white">2.5ч</p>
              <p className="text-xs md:text-sm text-white/60 mt-1 md:mt-2">Выполнение заказа</p>
            </div>
            <div className="col-span-1 bg-gradient-to-r from-[#454CEE] to-[#3339AA] p-4 md:p-6 rounded-xl relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4 opacity-10 transition-transform group-hover:translate-y-1/8">
                <AcademicCapIcon className="w-24 md:w-32 h-24 md:h-32" />
              </div>
              <p className="text-white/80 mb-1 text-sm md:text-base">Выполнено работ</p>
              <p className="text-xl md:text-3xl font-bold text-white">856</p>
              <p className="text-xs md:text-sm text-white/60 mt-1 md:mt-2">За всё время</p>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 gap-8">
          {/* Левая колонка */}
          <div className="space-y-8">
            {/* Быстрые действия */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex items-center gap-3 p-6 bg-[#181F38] hover:bg-[#242B44] rounded-xl transition-colors group">
                <div className="p-3 bg-[#454CEE]/10 rounded-lg group-hover:bg-[#454CEE]/20 transition-colors">
                  <DocumentTextIcon className="w-6 h-6 text-[#454CEE]" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-white font-medium">Новый заказ</span>
                  <span className="text-gray-400 text-sm">Создать индивидуальную работу</span>
                </div>
              </button>
              <button 
                onClick={() => router.push('/ready-works')}
                className="flex items-center gap-3 p-6 bg-[#181F38] hover:bg-[#242B44] rounded-xl transition-colors group"
              >
                <div className="p-3 bg-[#454CEE]/10 rounded-lg group-hover:bg-[#454CEE]/20 transition-colors">
                  <DocumentDuplicateIcon className="w-6 h-6 text-[#454CEE]" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-white font-medium">Купить готовую работу</span>
                  <span className="text-gray-400 text-sm">Выбрать из базы готовых работ</span>
                </div>
              </button>
            </div>

            {/* История заказов */}
            <div className="bg-[#181F38] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">История заказов</h2>
              <div className="text-center py-8">
                <DocumentTextIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">У вас пока нет заказов</p>
                <button className="mt-4 px-8 py-3 bg-gradient-to-r from-[#454CEE] to-[#3339AA] hover:from-[#3339AA] hover:to-[#454CEE] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Создать первый заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 