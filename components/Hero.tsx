'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import {
  DocumentTextIcon,
  PresentationChartBarIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon
} from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

interface StatItem {
  current: number;
  target: number;
  icon: React.ElementType;
  label: string;
}

export default function Hero() {
  const stats: StatItem[] = [
    { current: 0, target: 200, icon: DocumentTextIcon, label: 'Рефераты' },
    { current: 0, target: 50, icon: PresentationChartBarIcon, label: 'Доклады' },
    { current: 0, target: 700, icon: ClipboardDocumentListIcon, label: 'СРС' },
    { current: 0, target: 100, icon: BookOpenIcon, label: 'Курсовые' }
  ];

  const [counters, setCounters] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000; // 2 секунды на анимацию
    const steps = 60; // количество шагов анимации
    const interval = duration / steps;

    stats.forEach((stat, index) => {
      const step = stat.target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += step;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(timer);
        }
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.round(current);
          return newCounters;
        });
      }, interval);

      return () => clearInterval(timer);
    });
  }, []);

  return (
    <div id="hero" className="relative overflow-hidden bg-white dark:bg-[#0A0F23] min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 md:mb-12 leading-tight">
            <span className="text-gray-900 dark:text-white">Учись легко: генерация учебных работ </span>
            <span className="text-[#454CEE] inline-block">с помощью ИИ</span>
          </h1>
          
          <div className="flex flex-col items-center gap-4">
            {/* Статистика */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 w-full max-w-3xl mx-auto">
              <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">Выполнено работ за последний месяц</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="flex flex-col items-center group hover:transform hover:scale-105 transition-all duration-300">
                    <div className="flex flex-col items-center gap-2 mb-1">
                      <div className="w-12 h-12 rounded-xl bg-[#454CEE]/10 group-hover:bg-[#454CEE]/20 flex items-center justify-center transition-all duration-300">
                        <stat.icon className="w-6 h-6 text-[#454CEE]" />
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white transition-all duration-300">
                          {counters[index]}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">работ</span>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Аватары и текст */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-2">
              <div className="flex -space-x-3">
                <img 
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  src="https://randomuser.me/api/portraits/women/1.jpg"
                  alt="User"
                />
                <img 
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="User"
                />
                <img 
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  src="https://randomuser.me/api/portraits/women/2.jpg"
                  alt="User"
                />
                <img 
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  src="https://randomuser.me/api/portraits/men/2.jpg"
                  alt="User"
                />
                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-[#454CEE] text-white flex items-center justify-center text-xs font-medium">
                  +12
                </div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Помогали более 1000 студентам
              </span>
            </div>

            {/* Кнопка */}
            <div className="mt-6">
              <a
                href="#order"
                className="inline-flex items-center justify-center rounded-full bg-[#454CEE] px-6 py-3 text-lg font-semibold text-white shadow-[0_4px_20px_rgba(69,76,238,0.3)] hover:bg-[#3239BB] hover:shadow-[0_4px_20px_rgba(69,76,238,0.5)] transition-all duration-300"
              >
                Начать генерацию
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Декоративный фоновый элемент */}
      <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#454CEE] to-[#3239BB] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
} 