import { Inter } from 'next/font/google';
import Providers from '../components/Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'Studai - Генератор студенческих работ',
  description: 'Автоматическая генерация рефератов, докладов, СРС и курсовых работ за 5 минут',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 