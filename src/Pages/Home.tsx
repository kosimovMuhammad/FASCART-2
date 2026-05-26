import React from 'react';
import HomeHero from "@/components/Hero/Hero";
import FlashSales from '@/components/Hero/FlashSales';
import BrowseByCategory from '@/components/Hero/BrowseByCategory';
import BestSellingProducts from '@/components/Hero/BestSellingProducts';
import MusicExperienceBanner from '@/components/Hero/MusicExperienceBanner';
import ExploreOurProducts from '@/components/Hero/ExploreOurProducts';
import NewArrival from '@/components/Hero/NewArrival';
import Features from '@/components/Hero/Features';

 const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      {}
      <HomeHero />
<FlashSales/>
<BrowseByCategory/>
<BestSellingProducts/>
<MusicExperienceBanner/>
<ExploreOurProducts/>
<NewArrival/>
<Features/>
    </main>
  );
};
export default Home