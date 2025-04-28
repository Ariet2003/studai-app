import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Features from '../components/Features';
import PriceList from '../components/PriceList';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-background-dark">
      <Header />
      <Hero />
      <Services />
      <PriceList />
      <Features />
      <CallToAction />
      <Footer />
    </main>
  );
} 