'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Features from '../components/Features';
import PriceList from '@/components/PriceList';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import OrderForm from '@/components/OrderForm';

export default function HomePage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0A0F23] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-[#454CEE] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-background-dark">
      <Header />
      <Hero />
      <Services />
      <PriceList />
      <Features />
      <CallToAction />
      <OrderForm />
      <Footer />
    </main>
  );
} 