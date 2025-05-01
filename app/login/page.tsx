'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await signIn('google', {
        callbackUrl: '/dashboard',
        redirect: false,
      });

      if (result?.error) {
        setError('Произошла ошибка при входе через Google');
        console.error('Google Sign In Error:', result.error);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (err) {
      setError('Произошла ошибка при входе через Google');
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
              Добро пожаловать
            </h1>
            <p className="text-gray-400">
              Войдите в свой аккаунт для доступа к сервису
            </p>
          </div>

          {/* Кнопка входа */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
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
              {isLoading ? 'Выполняется вход...' : 'Войти через Google'}
            </button>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
          )}

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