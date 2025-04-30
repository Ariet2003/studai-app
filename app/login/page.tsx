'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // TODO: Добавить логику входа через Google
    setIsLoading(false);
  };

  const handleAppleLogin = async () => {
    setIsLoading(true);
    // TODO: Добавить логику входа через Apple
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
              Добро пожаловать
            </h1>
            <p className="text-gray-400">
              Войдите в свой аккаунт для доступа к сервису
            </p>
          </div>

          {/* Кнопки входа */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
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
              Войти через Google
            </button>

            <button
              onClick={handleAppleLogin}
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
              Войти через Apple ID
            </button>
          </div>

          {/* Ссылка на регистрацию */}
          <p className="mt-8 text-center text-gray-400">
            Ещё нет аккаунта?{' '}
            <Link href="/register" className="text-[#454CEE] hover:text-[#3339AA] font-medium">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 