import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={cn('min-h-[80vh]', 'w-full', 'flex', 'flex-col', 'items-center', 'justify-center', 'bg-white', 'dark:bg-zinc-950', 'transition-colors', 'duration-300', 'px-4', 'relative', 'overflow-hidden')}>
      
      {/* Background Decorative Elements */}
      <div className={cn('absolute', 'top-1/4', 'left-1/4', 'w-64', 'h-64', 'bg-rose-500/10', 'dark:bg-rose-500/5', 'rounded-full', 'blur-3xl', 'pointer-events-none')} />
      <div className={cn('absolute', 'bottom-1/4', 'right-1/4', 'w-96', 'h-96', 'bg-orange-500/10', 'dark:bg-orange-500/5', 'rounded-full', 'blur-3xl', 'pointer-events-none')} />
      
      <div className={cn('text-center', 'relative', 'z-10', 'flex', 'flex-col', 'items-center')}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={cn(
            'text-[120px]', 'md:text-[180px]', 'lg:text-[220px]', 'font-black', 'leading-none', 'tracking-tighter',
            'bg-clip-text', 'text-transparent', 'bg-linear-to-br', 'from-zinc-800', 'to-zinc-400', 'dark:from-zinc-100', 'dark:to-zinc-600',
            'drop-shadow-sm', 'select-none'
          )}>
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn('space-y-4', 'md:space-y-6', 'mt-[-10px]', 'md:mt-[-20px]')}
        >
          <h2 className={cn('text-2xl', 'md:text-4xl', 'font-bold', 'text-black', 'dark:text-white', 'tracking-tight')}>
            {t('notFound.title') || "Page Not Found"}
          </h2>
          
          <p className={cn('text-sm', 'md:text-base', 'text-zinc-500', 'dark:text-zinc-400', 'max-w-[400px]', 'mx-auto', 'leading-relaxed')}>
            {t('notFound.description') || "Your visited page not found. You may go home page."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={cn('mt-10', 'md:mt-12')}
        >
          <Link to="/">
            <button className={cn(
              'group', 'relative', 'inline-flex', 'items-center', 'gap-3', 'bg-[#DB4444]', 'hover:bg-[#bd3535]', 'text-white', 'px-8', 'py-4', 'rounded-sm', 'font-semibold', 'text-base', 'transition-all', 'duration-300', 'shadow-lg', 'shadow-[#DB4444]/20', 'hover:shadow-[#DB4444]/40', 'overflow-hidden'
            )}>
              <span className={cn('absolute', 'inset-0', 'w-full', 'h-full', '-mt-1', 'rounded-sm', 'opacity-30', 'bg-linear-to-b', 'from-transparent', 'via-transparent', 'to-black')} />
              <Home className={cn('w-5', 'h-5', 'relative', 'z-10', 'group-hover:-translate-y-0.5', 'transition-transform')} />
              <span className={cn('relative', 'z-10')}>{t('notFound.backHome') || "Back to home page"}</span>
            </button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default NotFound;
