import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Studai - Генератор студенческих работ',
  description: 'Автоматическая генерация учебных работ с помощью искусственного интеллекта',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className={`${inter.className} dark:bg-[#0A0F23]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 