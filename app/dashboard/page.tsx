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
  DocumentDuplicateIcon,
  EyeIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface DashboardStats {
  totalWorks: number;
  userWorks: number;
  userWorkHistory: Array<{
    id: string;
    title: string;
    type: string;
    pageCount: number;
    price: {
      amount: number;
    };
    createdAt: string;
    filePath: string;
  }>;
}

interface WorkDetailsModalProps {
  work: {
    id: string;
    title: string;
    type: string;
    pageCount: number;
    createdAt: string;
    filePath: string;
    language: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

// Функция форматирования даты
const formatDate = (date: string) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString('ru-RU', { month: 'long' });
  const year = d.getFullYear();
  return `${day} ${month} ${year} г.`;
};

const WorkDetailsModal: React.FC<WorkDetailsModalProps> = ({ work, isOpen, onClose }) => {
  if (!work) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = work.filePath;
    link.download = work.title;
    link.click();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#181F38] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white mb-4">
                  {work.title}
                </Dialog.Title>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Тип работы:</span>
                    <span className="px-3 py-1 bg-[#0A0F23] text-[#454CEE] rounded-full text-sm">
                      {work.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Язык:</span>
                    <span className="text-white">{work.language}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Количество страниц:</span>
                    <span className="text-white">{work.pageCount} стр.</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Дата создания:</span>
                    <span className="text-white">
                      {formatDate(work.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => window.open(work.filePath, '_blank')}
                    className="inline-flex items-center px-4 py-2 bg-[#242B44] text-white rounded-lg hover:bg-[#2A324E] transition-colors"
                  >
                    <DocumentTextIcon className="w-5 h-5 mr-2" />
                    Посмотреть
                  </button>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center px-4 py-2 bg-[#454CEE] text-white rounded-lg hover:bg-[#3339AA] transition-colors"
                  >
                    <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                    Скачать
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchStats();
    }
  }, [session]);

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

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#0A0F23] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-[#454CEE] rounded-full animate-spin" />
      </div>
    );
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const truncateTitle = (title: string, isMobile: boolean) => {
    const limit = isMobile ? 30 : 60;
    return title.length > limit ? `${title.substring(0, limit)}...` : title;
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
              <p className="text-xl md:text-3xl font-bold text-white">{stats?.totalWorks || 0}</p>
              <p className="text-xs md:text-sm text-white/60 mt-1 md:mt-2">На платформе</p>
            </div>
            <div className="col-span-1 bg-gradient-to-r from-[#454CEE] to-[#3339AA] p-4 md:p-6 rounded-xl relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4 opacity-10 transition-transform group-hover:translate-y-1/8">
                <ClockIcon className="w-24 md:w-32 h-24 md:h-32" />
              </div>
              <p className="text-white/80 mb-1 text-sm md:text-base">Среднее время</p>
              <p className="text-xl md:text-3xl font-bold text-white">3 мин</p>
              <p className="text-xs md:text-sm text-white/60 mt-1 md:mt-2">Выполнение заказа</p>
            </div>
            <div className="col-span-1 bg-gradient-to-r from-[#454CEE] to-[#3339AA] p-4 md:p-6 rounded-xl relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4 opacity-10 transition-transform group-hover:translate-y-1/8">
                <AcademicCapIcon className="w-24 md:w-32 h-24 md:h-32" />
              </div>
              <p className="text-white/80 mb-1 text-sm md:text-base">Выполнено работ</p>
              <p className="text-xl md:text-3xl font-bold text-white">{stats?.userWorks || 0}</p>
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
              <button 
                onClick={() => router.push('/new-order')}
                className="flex items-center gap-3 p-6 bg-[#181F38] hover:bg-[#242B44] rounded-xl transition-colors group"
              >
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">История заказов</h2>
                {stats?.userWorkHistory && stats.userWorkHistory.length > 4 && (
                  <button
                    onClick={() => router.push('/order-history')}
                    className="text-[#454CEE] hover:text-[#3339AA] transition-colors text-sm font-medium"
                  >
                    Смотреть все
                  </button>
                )}
              </div>
              
              {stats?.userWorkHistory && stats.userWorkHistory.length > 0 ? (
                <>
                  {/* Десктопная версия */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Название</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Тип</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Страниц</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Дата</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.userWorkHistory.slice(0, 10).map((work) => (
                          <tr 
                            key={work.id}
                            className="border-b border-gray-700/50 hover:bg-[#242B44] transition-colors cursor-pointer"
                            onClick={() => {
                              setSelectedWork(work);
                              setIsModalOpen(true);
                            }}
                          >
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <DocumentTextIcon className="w-5 h-5 text-[#454CEE] mr-2 flex-shrink-0" />
                                <span className="text-white">
                                  {truncateTitle(work.title, false)}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-3 py-1 bg-[#0A0F23] text-[#454CEE] rounded-full text-sm">
                                {work.type}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-gray-400">
                              {work.pageCount} стр.
                            </td>
                            <td className="py-4 px-4 text-gray-400">
                              {formatDate(work.createdAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Мобильная версия */}
                  <div className="md:hidden space-y-4">
                    {stats.userWorkHistory.slice(0, 4).map((work) => (
                      <div
                        key={work.id}
                        className="bg-gradient-to-r from-[#181F38] to-[#1C2333] p-5 rounded-xl hover:from-[#242B44] hover:to-[#2A324E] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border border-gray-800/30"
                        onClick={() => {
                          setSelectedWork(work);
                          setIsModalOpen(true);
                        }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-lg bg-[#454CEE]/10 flex items-center justify-center flex-shrink-0">
                            <DocumentTextIcon className="w-6 h-6 text-[#454CEE]" />
                          </div>
                          <div className="flex-1 space-y-3">
                            <div>
                              <h3 className="text-white font-medium leading-snug">
                                {truncateTitle(work.title, true)}
                              </h3>
                              <div className="h-0.5 w-16 bg-gradient-to-r from-[#454CEE] to-transparent mt-2" />
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="px-4 py-1.5 bg-[#454CEE]/10 text-[#454CEE] rounded-full text-sm font-medium border border-[#454CEE]/20">
                                {work.type}
                              </span>
                              <div className="flex items-center text-gray-400 text-sm">
                                <DocumentDuplicateIcon className="w-4 h-4 mr-1.5" />
                                {work.pageCount} стр.
                              </div>
                            </div>
                            <div className="flex items-center text-gray-400/80 text-sm pt-1">
                              <ClockIcon className="w-4 h-4 mr-1.5" />
                              <span className="bg-[#0A0F23]/50 px-3 py-1 rounded-full">
                                {formatDate(work.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {stats.userWorkHistory.length > 4 && (
                      <button
                        onClick={() => router.push('/order-history')}
                        className="w-full py-3 text-center text-[#454CEE] hover:text-[#3339AA] transition-colors text-sm font-medium bg-[#0A0F23]/50 rounded-xl mt-4"
                      >
                        Смотреть все заказы
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <DocumentTextIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">У вас пока нет заказов</p>
                  <button className="mt-4 px-8 py-3 bg-gradient-to-r from-[#454CEE] to-[#3339AA] hover:from-[#3339AA] hover:to-[#454CEE] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    Создать первый заказ
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <WorkDetailsModal
        work={selectedWork}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedWork(null);
        }}
      />
    </div>
  );
} 