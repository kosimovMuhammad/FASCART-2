import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Header/Header'; 
import { Footer } from '@/components/Footer/Footer'; 
import { cn } from "@/lib/utils";



export const Layout: React.FC = () => {

  return (
    <div className={cn('min-h-screen', 'flex', 'flex-col', 'bg-white', 'dark:bg-zinc-950', 'text-black', 'dark:text-white', 'transition-colors', 'duration-300')}>
      <Navbar />
      
      <main className="flex-1">
        <Suspense fallback={<div className={cn('min-h-screen', 'flex', 'items-center', 'justify-center', 'text-zinc-500')}>Loading page...</div>}>
          <Outlet />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;