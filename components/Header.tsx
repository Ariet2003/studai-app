'use client';

import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary dark:text-white">
              Studai
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white">
              Главная
            </Link>
            <Link href="/ready-works" className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white">
              Готовые работы
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white">
              Прайс-лист
            </Link>
            <Link href="/contacts" className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white">
              Контакты
            </Link>
          </nav>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
} 