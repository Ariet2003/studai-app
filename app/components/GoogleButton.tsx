'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

export default function GoogleButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await signIn('google', { 
        callbackUrl: '/',
        redirect: false
      });
      
      if (result?.error) {
        setError('Произошла ошибка при входе через Google');
        console.error('Google Sign In Error:', result.error);
      }
    } catch (err) {
      setError('Произошла ошибка при входе через Google');
      console.error('Google Sign In Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-gray-300 border-t-[#454CEE] rounded-full animate-spin" />
        ) : (
          <Image
            src="/google.svg"
            alt="Google Logo"
            width={20}
            height={20}
          />
        )}
        {isLoading ? 'Выполняется вход...' : 'Войти через Google'}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
} 