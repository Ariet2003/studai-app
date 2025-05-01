'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const handleGoogleRegister = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await signIn('google', {
        callbackUrl: '/dashboard',
        redirect: false,
      });

      if (result?.error) {
        setError('Произошла ошибка при регистрации через Google');
        console.error('Google Sign In Error:', result.error);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (err) {
      setError('Произошла ошибка при регистрации через Google');
      console.error('Google Sign In Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0A0F23] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-[#454CEE] rounded-full animate-spin" />
      </div>
    );
  }

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

          {/* Кнопка регистрации */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleRegister}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-xl transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-gray-300 border-t-[#454CEE] rounded-full animate-spin" />
              ) : (
                <Image
                  src="/google.svg"
                  alt="Google"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              )}
              {isLoading ? 'Выполняется регистрация...' : 'Регистрация через Google'}
            </button>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
          )}

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