'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { DocumentTextIcon, UserIcon, LanguageIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import WorkPreviewModal from '@/app/components/WorkPreviewModal';
import SearchBar from '@/app/components/SearchBar';
import WorkFilters, { FilterOptions, SortOption } from '@/app/components/WorkFilters';
import Pagination from '@/app/components/Pagination';
import { ReadyWork } from '@/types/work';

const ITEMS_PER_PAGE = 50;

export default function ReadyWorksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [works, setWorks] = useState<ReadyWork[]>([]);
  const [filteredWorks, setFilteredWorks] = useState<ReadyWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWork, setSelectedWork] = useState<ReadyWork | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    type: '',
    pageRange: '',
    language: '',
  });
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('/api/ready-works');
        if (!response.ok) {
          throw new Error('Failed to fetch works');
        }
        const data = await response.json();
        setWorks(data);
        setFilteredWorks(data);
      } catch (error) {
        console.error('Error fetching works:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

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

  const handlePurchase = async (work: ReadyWork) => {
    try {
      window.open(`${work.filePath}`, '_blank');
      setSelectedWork(null);
    } catch (error) {
      console.error('Error purchasing work:', error);
    }
  };

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
              onClick={() => router.back()}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Назад
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-6">Готовые работы</h1>
          
          <div className="space-y-6">
            <SearchBar onSearch={setSearchQuery} />
            <WorkFilters onFilterChange={setFilters} onSortChange={setSortBy} />
          </div>
        </div>

        {paginatedWorks.length === 0 ? (
          <div className="bg-[#181F38] rounded-xl p-8 text-center">
            <DocumentTextIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">
              {searchQuery || filters.type || filters.pageRange || filters.language
                ? 'Нет работ, соответствующих выбранным критериям'
                : 'Пока нет доступных работ'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilters({ type: '', pageRange: '', language: '' });
              }}
              className="px-6 py-2 bg-[#454CEE] hover:bg-[#3339AA] text-white font-medium rounded-lg transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedWorks.map((work) => (
                <div
                  key={work.id}
                  onClick={() => setSelectedWork(work)}
                  className="bg-[#181F38] rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{work.title}</h3>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4 text-[#454CEE]" />
                          <p className="text-gray-400 text-sm">Автор: {work.user.name || 'Аноним'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <LanguageIcon className="h-4 w-4 text-[#454CEE]" />
                          <p className="text-gray-400 text-sm">Язык: {work.language}</p>
                        </div>
                      </div>
                    </div>
                    <span className="inline-block px-3 py-1 bg-[#0A0F23] text-[#454CEE] rounded-full text-sm font-medium">
                      {work.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <DocumentDuplicateIcon className="h-4 w-4 text-[#454CEE]" />
                      <span className="text-gray-400 text-sm">{work.pageCount} страниц</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-gray-400 text-sm line-through">{work.price.amount} сом</div>
                        <div className="text-white font-medium">{work.price.amount / 2} сом</div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePurchase(work);
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-[#454CEE] to-[#3339AA] hover:from-[#3339AA] hover:to-[#454CEE] text-white font-medium rounded-lg transition-all duration-300"
                      >
                        Купить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </main>

      <WorkPreviewModal
        work={selectedWork}
        onClose={() => setSelectedWork(null)}
        onPurchase={handlePurchase}
      />
    </div>
  );
} 