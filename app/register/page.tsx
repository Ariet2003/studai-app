'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    // TODO: Добавить логику регистрации через Google
    setIsLoading(false);
  };

  const handleAppleRegister = async () => {
    setIsLoading(true);
    // TODO: Добавить логику регистрации через Apple
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0F23] flex flex-col justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Логотип */}
          <Link href="/" className="flex items-center justify-center mb-8">
            <Image
              src="/logo.svg"
              alt="StudAI Logo"
              width={48}
              height={48}
              className="w-12 h-12"
            />
            <span className="text-2xl font-bold text-white ml-2">StudAI</span>
          </Link>

          {/* Заголовок */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Создайте аккаунт
            </h1>
            <p className="text-gray-400">
              Зарегистрируйтесь для доступа ко всем возможностям сервиса
            </p>
          </div>

          {/* Кнопки регистрации */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleRegister}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-xl transition-colors disabled:opacity-50"
            >
              <Image
                src="/google.svg"
                alt="Google"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              Регистрация через Google
            </button>

            <button
              onClick={handleAppleRegister}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black hover:bg-gray-900 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
            >
              <Image
                src="/apple.svg"
                alt="Apple"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              Регистрация через Apple ID
            </button>
          </div>

          {/* Преимущества регистрации */}
          <div className="mt-8 p-6 bg-[#181F38] rounded-xl">
            <h3 className="text-white font-semibold mb-4">
              Преимущества регистрации:
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#454CEE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Сохранение истории заказов
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#454CEE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Отслеживание статуса работ
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#454CEE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Бонусная программа
              </li>
            </ul>
          </div>

          {/* Ссылка на вход */}
          <p className="mt-8 text-center text-gray-400">
            Уже есть аккаунт?{' '}
            <Link href="/login" className="text-[#454CEE] hover:text-[#3339AA] font-medium">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 