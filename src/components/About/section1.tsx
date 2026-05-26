import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import img from '@/assets/portrait-two-african-females-holding-shopping-bags-while-reacting-something-their-smartphone 1.png';

export default function Section1() {
  const { t } = useTranslation(); 

  return (
    <div className={cn('w-full','max-w-7xl','mx-auto','bg-white', 'dark:bg-zinc-950', 'font-sans', 'select-none', 'transition-colors', 'duration-300', 'min-h-screen')}>
      
      {}
      <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'pt-12', 'md:px-8', 'lg:px-12')}>
        <div className={cn('flex', 'items-center', 'gap-2', 'text-sm', 'text-gray-500', 'dark:text-zinc-400')}>
          <Link to="/" className={cn('hover:text-black', 'dark:hover:text-white', 'transition-colors')}>
            {t('aboutPage.home', 'Home')}
          </Link>
          <span>/</span>
          <span className={cn('text-black', 'dark:text-white', 'font-medium')}>
            {t('aboutPage.about', 'About')}
          </span>
        </div>
      </div>

      {}
      <div className={cn('w-full', 'flex', 'flex-col', 'lg:flex-row', 'items-center', 'gap-12', 'lg:gap-2', 'pt-16', 'pb-24')}>
        
        {}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            'w-full', 'lg:w-[50%]', 'px-4', 'md:px-8', 'lg:pl-24', 'lg:pr-12',
            'flex', 'flex-col', 'gap-8'
          )}
        >
          {}
          <h1 className={cn(
            'text-[40px]', 'md:text-[54px]', 'font-semibold', 'tracking-wide', 
            'text-black', 'dark:text-white', 'leading-none', 'font-sans'
          )}>
            {t('aboutPage.title', 'Our Story')}
          </h1>

          {}
          <div className={cn('flex', 'flex-col', 'gap-6', 'text-base', 'leading-[26px]', 'text-black', 'dark:text-zinc-300', 'font-normal')}>
            <p>
              {t('aboutPage.description1', "Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.")}
            </p>
            <p>
              {t('aboutPage.description2', 'Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer.')}
            </p>
          </div>
        </motion.div>

        {}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn('w-full', 'lg:w-[50%]', 'flex', 'justify-end')}
        >
          <div className={cn(
            'w-full', 'lg:max-w-[605px]', 'h-[350px]', 'md:h-[400px]', 'lg:h-[450px]', 
            'overflow-hidden', 'rounded-l-sm', 'lg:rounded-r-none'
          )}>
            <img 
              src={img} 
              alt="Our Story - Exclusive Shopping" 
              className={cn('w-full', 'h-full', 'object-cover', 'object-center')}
              loading="lazy"
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}