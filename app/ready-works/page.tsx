'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import WorkPreviewModal from '@/app/components/WorkPreviewModal';
import { ReadyWork } from '@/types/work';

export default function ReadyWorksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [works, setWorks] = useState<ReadyWork[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedWork, setSelectedWork] = useState<ReadyWork | null>(null);

  const workTypes = ['all', 'Реферат', 'СРС', 'Доклад', 'Курсовая'];

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('/api/ready-works');
        if (!response.ok) {
          throw new Error('Failed to fetch works');
        }
        const data = await response.json();
        setWorks(data);
      } catch (error) {
        console.error('Error fetching works:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  const handlePurchase = async (work: ReadyWork) => {
    // В будущем здесь будет интеграция с платежной системой
    try {
      // Временное решение: сразу скачиваем файл
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
        <h1 className="text-2xl font-bold text-white mb-8">Готовые работы</h1>

        {/* Фильтры */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {workTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedType === type
                    ? 'bg-[#454CEE] text-white'
                    : 'bg-[#181F38] text-gray-400 hover:bg-[#242B44] hover:text-white'
                }`}
              >
                {type === 'all' ? 'Все типы' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Список работ */}
        {works.length === 0 ? (
          <div className="bg-[#181F38] rounded-xl p-8 text-center">
            <DocumentTextIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">Пока нет доступных работ</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-2 bg-[#454CEE] hover:bg-[#3339AA] text-white font-medium rounded-lg transition-colors"
            >
              Вернуться на главную
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {works
              .filter((work) => selectedType === 'all' || work.type === selectedType)
              .map((work) => (
                <div
                  key={work.id}
                  onClick={() => setSelectedWork(work)}
                  className="bg-[#181F38] rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{work.title}</h3>
                      <p className="text-gray-400 text-sm">Автор: {work.author}</p>
                    </div>
                    <span className="inline-block px-3 py-1 bg-[#0A0F23] text-[#454CEE] rounded-full text-sm font-medium">
                      {work.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-gray-400 text-sm">{work.pageCount} страниц</div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePurchase(work);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-[#454CEE] to-[#3339AA] hover:from-[#3339AA] hover:to-[#454CEE] text-white font-medium rounded-lg transition-all duration-300"
                    >
                      Купить за {work.price.amount} сом
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>

      {/* Модальное окно предпросмотра */}
      <WorkPreviewModal
        work={selectedWork}
        onClose={() => setSelectedWork(null)}
        onPurchase={handlePurchase}
      />
    </div>
  );
} 