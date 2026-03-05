import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import Features from '../components/home/Features';
import PopularRoutes from '../components/home/PopularRoutes';
import HowItWorks from '../components/home/HowItWorks';
import BusOperators from '../components/home/BusOperators';
import Gallery from '../components/home/Gallery';
import FAQ from '../components/home/FAQ';
import ContactCTA from '../components/home/ContactCTA';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <Features />
        <PopularRoutes />
        <HowItWorks />
        <BusOperators />
        <Gallery />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;