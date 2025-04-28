import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import PriceList from '../components/PriceList';
import OrderForm from '../components/OrderForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-background-dark">
      <Header />
      <Hero />
      <Features />
      <PriceList />
      <OrderForm />
    </main>
  );
} 