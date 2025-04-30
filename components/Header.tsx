'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0F23]/95 backdrop-blur-sm text-white">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Логотип */}
          <div className="flex items-center">
            <button onClick={() => scrollToSection('hero')} className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="StudAI Logo"
                width={40}
                height={40}
                className="w-auto h-8"
              />
              <span className="text-xl font-bold text-white">StudAI</span>
            </button>
          </div>

          {/* Навигация */}
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Услуги
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Преимущества
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Цены
            </button>
            <button 
              onClick={() => scrollToSection('order')} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Заказать
            </button>
          </nav>

          {/* Кнопки авторизации */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Вход
            </Link>
            <Link 
              href="/register" 
              className="px-4 py-2 rounded-lg bg-[#454CEE] hover:bg-[#3339cc] transition-colors"
            >
              Регистрация
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 