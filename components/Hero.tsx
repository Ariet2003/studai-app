import { ArrowRightIcon } from '@heroicons/react/24/outline';
import {
  DocumentTextIcon,
  PresentationChartBarIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon
} from '@heroicons/react/24/solid';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-[#0A0F23] min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-16 leading-tight">
            <span className="text-gray-900 dark:text-white">Учись легко: генерация учебных работ </span>
            <span className="text-[#454CEE] inline-block">с помощью ИИ</span>
          </h1>
          
          <div className="flex flex-col items-center gap-4">
            {/* Статистика */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 w-full max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#454CEE]/10 flex items-center justify-center">
                    <DocumentTextIcon className="w-5 h-5 text-[#454CEE]" />
                  </div>
                  <div className="text-2xl font-bold text-[#454CEE]">200+</div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Реферат</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#454CEE]/10 flex items-center justify-center">
                    <PresentationChartBarIcon className="w-5 h-5 text-[#454CEE]" />
                  </div>
                  <div className="text-2xl font-bold text-[#454CEE]">50+</div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Доклад</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#454CEE]/10 flex items-center justify-center">
                    <ClipboardDocumentListIcon className="w-5 h-5 text-[#454CEE]" />
                  </div>
                  <div className="text-2xl font-bold text-[#454CEE]">700+</div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">СРС</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#454CEE]/10 flex items-center justify-center">
                    <BookOpenIcon className="w-5 h-5 text-[#454CEE]" />
                  </div>
                  <div className="text-2xl font-bold text-[#454CEE]">100+</div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Курсовая работа</div>
              </div>
            </div>

            {/* Аватары и текст */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3">
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
            <div className="mt-8">
              <a
                href="#order"
                className="inline-flex items-center justify-center rounded-full bg-[#454CEE] px-8 py-4 text-xl font-semibold text-white shadow-[0_4px_20px_rgba(69,76,238,0.3)] hover:bg-[#3239BB] hover:shadow-[0_4px_20px_rgba(69,76,238,0.5)] transition-all duration-300"
              >
                Начать генерацию
                <ArrowRightIcon className="ml-3 h-6 w-6" />
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