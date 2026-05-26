import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Store, DollarSign, ShoppingBag, Coins } from 'lucide-react';

export default function AboutStats() {
  const { t } = useTranslation();
  
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  const stats = [
    {
      id: 0,
      icon: Store,
      value: '10.5k',
      labelKey: 'aboutPage.stats.sellers',
      defaultLabel: 'Sallers active our site',
    },
    {
      id: 1,
      icon: DollarSign,
      value: '33k',
      labelKey: 'aboutPage.stats.sales',
      defaultLabel: 'Mopnthly Product Sale',
    },
    {
      id: 2,
      icon: ShoppingBag,
      value: '45.5k',
      labelKey: 'aboutPage.stats.customers',
      defaultLabel: 'Customer active in our site',
    },
    {
      id: 3,
      icon: Coins,
      value: '25k',
      labelKey: 'aboutPage.stats.gross',
      defaultLabel: 'Anual gross sale in our site',
    },
  ];

  return (
    <div className={cn('w-full', 'py-12', 'transition-colors', 'duration-300')}>
      <div className={cn('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4', 'gap-[30px]', 'w-full')}>
        
        {stats.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(1)}
              className={cn(
                'border', 'rounded-sm', 'w-full',
                'h-[230px]', 'flex', 'flex-col', 'items-center', 'justify-center', 'text-center',
                'cursor-pointer', 'transition-all', 'duration-300', 'select-none', 'px-4',
                isActive 
                  ? 'bg-[#DB4444] border-[#DB4444] shadow-[0_10px_20px_rgba(219,68,68,0.15)] text-white' 
                  : 'bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-800 text-black dark:text-white'
              )}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className={cn(
                'w-20', 'h-20', 'rounded-full', 'flex', 'items-center', 'justify-center', 'mb-6', 'transition-all', 'duration-300',
                isActive 
                  ? 'bg-white/30 ring-8 ring-white/10' 
                  : 'bg-gray-200 dark:bg-zinc-800 ring-8 ring-gray-100/50 dark:ring-zinc-900/30'
              )}>
                <div className={cn(
                  'w-14', 'h-14', 'rounded-full', 'flex', 'items-center', 'justify-center', 'transition-colors', 'duration-300',
                  isActive ? 'bg-white text-black' : 'bg-black text-white dark:bg-white dark:text-black'
                )}>
                  <Icon className={cn('w-6', 'h-6')} />
                </div>
              </div>

              <h2 className={cn('text-[32px]', 'font-bold', 'tracking-wider', 'leading-none', 'mb-3', 'font-sans')}>
                {item.value}
              </h2>

              <p className={cn(
                'text-sm', 'font-normal', 'leading-[21px]', 'px-2',
                isActive ? 'text-white' : 'text-gray-600 dark:text-zinc-400'
              )}>
                {t(item.labelKey, item.defaultLabel)}
              </p>
            </motion.div>
          );
        })}

      </div>
    </div>
  );
}