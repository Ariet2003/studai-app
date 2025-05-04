'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { DocumentTextIcon, ClockIcon, DocumentDuplicateIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import SearchBar from '@/app/components/SearchBar';
import WorkFilters, { FilterOptions, SortOption } from '@/app/components/WorkFilters';
import Pagination from '@/app/components/Pagination';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const ITEMS_PER_PAGE = 50;

interface OrderHistoryWork {
  id: string;
  title: string;
  type: string;
  pageCount: number;
  createdAt: string;
  filePath: string;
  language: string;
}

const formatDate = (date: string) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString('ru-RU', { month: 'long' });
  const year = d.getFullYear();
  return `${day} ${month} ${year} г.`;
};

// Функция для обрезки названия работы
const truncateTitle = (title: string, isMobile: boolean) => {
  const limit = isMobile ? 30 : 60;
  return title.length > limit ? `${title.substring(0, limit)}...` : title;
};

// Компонент модального окна
interface WorkDetailsModalProps {
  work: OrderHistoryWork | null;
  isOpen: boolean;
  onClose: () => void;
}

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

export default function OrderHistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [works, setWorks] = useState<OrderHistoryWork[]>([]);
  const [filteredWorks, setFilteredWorks] = useState<OrderHistoryWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWork, setSelectedWork] = useState<OrderHistoryWork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    type: '',
    pageRange: '',
    language: '',
  });
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch works');
        }
        const data = await response.json();
        setWorks(data.userWorkHistory);
        setFilteredWorks(data.userWorkHistory);
      } catch (error) {
        console.error('Error fetching works:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchWorks();
    }
  }, [session]);

  useEffect(() => {
    let result = [...works];

    // Поиск
    if (searchQuery) {
      result = result.filter(work => 
        work.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтры
    if (filters.type) {
      result = result.filter(work => work.type === filters.type);
    }

    if (filters.language) {
      result = result.filter(work => work.language === filters.language);
    }

    if (filters.pageRange) {
      result = result.filter(work => {
        const pages = work.pageCount;
        switch (filters.pageRange) {
          case 'до 10':
            return pages <= 10;
          case '10-20':
            return pages > 10 && pages <= 20;
          case '20-30':
            return pages > 20 && pages <= 30;
          case '30 и более':
            return pages > 30;
          default:
            return true;
        }
      });
    }

    // Сортировка
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    setFilteredWorks(result);
    setCurrentPage(1);
  }, [searchQuery, filters, sortBy, works]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F23] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-[#454CEE] rounded-full animate-spin" />
      </div>
    );
  }

  const totalPages = Math.ceil(filteredWorks.length / ITEMS_PER_PAGE);
  const paginatedWorks = filteredWorks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#0A0F23]">
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
            <button
              onClick={() => router.push('/dashboard')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Назад
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-6">История заказов</h1>
          
          <div className="space-y-6">
            <SearchBar onSearch={setSearchQuery} />
            <WorkFilters onFilterChange={setFilters} onSortChange={setSortBy} />
          </div>
        </div>

        {paginatedWorks.length === 0 ? (
          <div className="bg-[#181F38] rounded-xl p-8 text-center">
            <DocumentTextIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">
              {searchQuery || filters.type || filters.pageRange
                ? 'Нет работ, соответствующих выбранным критериям'
                : 'У вас пока нет заказов'}
            </p>
            {(searchQuery || filters.type || filters.pageRange) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilters({ type: '', pageRange: '', language: '' });
                }}
                className="px-6 py-2 bg-[#454CEE] hover:bg-[#3339AA] text-white font-medium rounded-lg transition-colors"
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        ) : (
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
                  {paginatedWorks.map((work) => (
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
              {paginatedWorks.map((work) => (
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
            </div>

            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </main>

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