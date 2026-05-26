import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { toggleDarkMode, logout } from "@/redux/appSlice";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";


import logo from "@/assets/Group 1116606595 (3).png"; 
import logo1 from "@/assets/Group 1116606595 (3).png"; 

import { FaBars, FaRegHeart, FaSearch, FaShoppingCart, FaRegUser } from "react-icons/fa";
import { FiSun, FiMoon, FiLogOut, FiShoppingBag } from "react-icons/fi";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { darkMode, isAuthenticated, user } = useSelector(
    (state: RootState) => state.app
  );
  const { profile } = useSelector((state: RootState) => state.profile);
  
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const wishlistCount = wishlistItems.length;

  const displayName = profile?.firstName || user?.name || "Premium Client";

  const isRu = i18n.language.startsWith('ru');
  const toggleLanguage = () => {
    i18n.changeLanguage(isRu ? 'en' : 'ru');
  };

  const getNavLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return cn(
      "relative pb-1 text-sm font-medium tracking-wide transition-all duration-300",
      "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-black dark:after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100",
      isActive ? "text-black dark:text-white after:scale-x-100" : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
    );
  };

  return (
    <header className={cn('w-full', 'border-b', 'border-zinc-100', 'dark:border-zinc-900', 'bg-white/80', 'dark:bg-zinc-950/80', 'backdrop-blur-md', 'sticky', 'top-0', 'z-50', 'transition-all', 'duration-300')}>
      <div className={cn('container', 'mx-auto', 'px-4 md:px-6', 'h-16', 'flex', 'items-center', 'justify-between')}>
        
        {}
        <div className={cn('flex', 'items-center', 'gap-2 md:gap-6')}>
          {}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn('h-9', 'w-9', 'rounded-full')}>
                  <FaBars className={cn('h-5', 'w-5', 'text-zinc-800', 'dark:text-zinc-200')} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className={cn('w-[280px]', 'bg-white', 'dark:bg-zinc-950', 'p-6')}>
                <nav className={cn('flex', 'flex-col', 'gap-5', 'mt-10')}>
                  <Link to="/" onClick={() => setIsOpen(false)} className={cn('text-lg', 'font-semibold', 'tracking-wide')}>{t('nav.home')}</Link>
                  <Link to="/contact" onClick={() => setIsOpen(false)} className={cn('text-lg', 'font-semibold', 'tracking-wide')}>{t('nav.contact')}</Link>
                  <Link to="/about" onClick={() => setIsOpen(false)} className={cn('text-lg', 'font-semibold', 'tracking-wide')}>{t('nav.about')}</Link>
                  <Link to="/Registre" onClick={() => setIsOpen(false)} className={cn('text-lg', 'font-semibold', 'tracking-wide')}>{t('nav.signUp')}</Link>
                  
                  <hr className={cn('border-zinc-200', 'dark:border-zinc-800', 'my-2')} />

                  <Button onClick={() => dispatch(toggleDarkMode())} variant="outline" className={cn('w-full', 'justify-start', 'gap-3', 'rounded-xl')}>
                    {darkMode ? <FiSun className="text-yellow-500" /> : <FiMoon />}
                    {darkMode ? t('header.lightMode', 'Light Mode') : t('header.darkMode', 'Dark Mode')}
                  </Button>

                  <Button onClick={toggleLanguage} variant="outline" className={cn('w-full', 'justify-start', 'gap-3', 'rounded-xl')}>
                    <span>🌐</span> {isRu ? 'English' : 'Русский'}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {}
          <Link to="/" className={cn('flex', 'items-center', 'group')}>
            <span className={cn('block', 'md:hidden', 'text-xl', 'font-bold', 'tracking-tight', 'text-black', 'dark:text-white', 'ml-1')}>
              Exclusive
            </span>
            {}
            <img 
              src={darkMode ? logo1 : logo} 
              alt="logo" 
              className={cn('hidden md:block', 'w-48', 'h-auto', 'transition-all', 'duration-300')} 
            />
          </Link>
        </div>

        {}
        <nav className={cn('hidden', 'md:flex', 'items-center', 'gap-8')}>
          <Link to="/" className={getNavLinkClass("/")}>{t('nav.home')}</Link>
          <Link to="/contact" className={getNavLinkClass("/contact")}>{t('nav.contact')}</Link>
          <Link to="/about" className={getNavLinkClass("/about")}>{t('nav.about')}</Link>
          <Link to="/Registre" className={getNavLinkClass("/Registre")}>{t('nav.signUp')}</Link>
        </nav>

        {}
        <div className={cn('flex', 'items-center', 'gap-1 sm:gap-4')}>
          
          {}
          <div className={cn('relative', 'hidden', 'lg:block', 'w-64', 'group')}>
            <Input 
              type="search" 
              placeholder={t('search.placeholder') || "Search items..."} 
              className={cn('bg-zinc-50', 'dark:bg-zinc-900', 'border', 'border-zinc-200', 'dark:border-zinc-800', 'pr-10', 'text-xs', 'rounded-full', 'h-9')}
            />
            <FaSearch className={cn('absolute', 'right-3', 'top-3', 'h-3', 'w-3', 'text-zinc-400')} />
          </div>

          <div className={cn('flex', 'items-center', 'gap-0.5 sm:gap-2')}>
            
            {}
            <Button onClick={() => dispatch(toggleDarkMode())} variant="ghost" size="icon" className={cn('hidden md:flex', 'rounded-full', 'h-9', 'w-9', 'text-zinc-700', 'dark:text-zinc-300')}>
              {darkMode ? <FiSun className={cn('h-4', 'w-4', 'text-yellow-500')} /> : <FiMoon className={cn('h-4', 'w-4')} />}
            </Button>

            {}
            <Button onClick={toggleLanguage} variant="ghost" size="sm" className={cn('hidden md:flex', 'w-9', 'h-9', 'rounded-full', 'text-xs', 'font-bold', 'text-zinc-700', 'dark:text-zinc-300')}>
              {isRu ? 'EN' : 'RU'}
            </Button>

            {}
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className={cn('relative', 'rounded-full', 'h-9', 'w-9', 'text-zinc-800', 'dark:text-zinc-200')}>
                <FaRegHeart className={cn('h-[18px]', 'w-[18px]')} />
                {wishlistCount > 0 && (
                  <span className={cn('absolute', 'top-1', 'right-1', 'bg-red-500', 'text-white', 'text-[10px]', 'font-medium', 'rounded-full', 'h-4', 'w-4', 'flex', 'items-center', 'justify-center', 'border border-white dark:border-zinc-950')}>
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className={cn('relative', 'rounded-full', 'h-9', 'w-9', 'text-zinc-800', 'dark:text-zinc-200')}>
                <FaShoppingCart className={cn('h-[18px]', 'w-[18px]')} />
                {cartCount > 0 && (
                  <span className={cn('absolute', 'top-1', 'right-1', 'bg-red-500', 'text-white', 'text-[10px]', 'font-medium', 'rounded-full', 'h-4', 'w-4', 'flex', 'items-center', 'justify-center', 'border border-white dark:border-zinc-950')}>
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {}
            <div className={cn('h-4', 'w-px', 'bg-zinc-200', 'dark:bg-zinc-800', 'mx-1', 'hidden', 'md:block')} />

            {}
            {isAuthenticated ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button variant="ghost" className={cn('relative', 'h-9', 'w-9', 'rounded-full', 'p-0', 'overflow-hidden')}>
                    <div className={cn('h-full', 'w-full', 'flex', 'items-center', 'justify-center')}>
                      <FaRegUser className={cn('h-[18px]', 'w-[18px]', 'text-zinc-800', 'dark:text-zinc-200')} />
                    </div>
                  </Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content 
                    align="end" 
                    className={cn('z-50', 'min-w-[200px]', 'rounded-2xl', 'border', 'bg-white', 'dark:bg-zinc-950', 'p-2', 'shadow-2xl')}
                  >
                    <div className={cn('px-3', 'py-2.5', 'mb-1')}>
                      <p className={cn('text-xs', 'text-zinc-400')}>{t('header.loggedInAs', 'Logged in as')}</p>
                      <p className={cn('text-sm', 'font-bold', 'truncate')}>{displayName}</p>
                    </div>
                    
                    <DropdownMenu.Separator className={cn('h-px', 'bg-zinc-200', 'dark:bg-zinc-800', 'my-1')} />
                    
                    <DropdownMenu.Item onSelect={() => navigate("/account")} className={cn('flex', 'items-center', 'gap-3', 'px-3', 'py-2', 'text-sm', 'rounded-xl', 'hover:bg-zinc-100', 'dark:hover:bg-zinc-900', 'cursor-pointer', 'outline-none')}><FaRegUser className={cn('text-zinc-500', 'dark:text-zinc-400')} /> {t('header.account', 'Account')}</DropdownMenu.Item>
                    <DropdownMenu.Item onSelect={() => navigate("/orders")} className={cn('flex', 'items-center', 'gap-3', 'px-3', 'py-2', 'text-sm', 'rounded-xl', 'hover:bg-zinc-100', 'dark:hover:bg-zinc-900', 'cursor-pointer', 'outline-none')}><FiShoppingBag className={cn('text-zinc-500', 'dark:text-zinc-400')} /> {t('header.myOrders', 'My Orders')}</DropdownMenu.Item>
                    
                    <DropdownMenu.Separator className={cn('h-px', 'bg-zinc-200', 'dark:bg-zinc-800', 'my-1')} />
                    
                    <DropdownMenu.Item onSelect={() => dispatch(logout())} className={cn('flex', 'items-center', 'gap-3', 'px-3', 'py-2', 'text-sm', 'text-red-500', 'rounded-xl', 'hover:bg-red-50', 'dark:hover:bg-red-950/30', 'cursor-pointer', 'outline-none')}><FiLogOut className="text-red-500" /> {t('header.logout', 'Logout')}</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            ) : (
              
              <>
                <Link to="/Registre" className={cn('hidden', 'md:block')}>
                  <Button size="sm" className={cn('bg-black', 'text-white', 'dark:bg-white', 'dark:text-black', 'font-semibold', 'text-xs', 'h-9', 'rounded-full', 'px-5', 'shadow-md')}>
                    {t('nav.signUp')}
                  </Button>
                </Link>
                <Link to="/Registre" className={cn('block', 'md:hidden')}>
                  <Button variant="ghost" size="icon" className={cn('h-9', 'w-9', 'rounded-full', 'text-zinc-800', 'dark:text-zinc-200')}>
                    <FaRegUser className={cn('h-[18px]', 'w-[18px]')} />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};