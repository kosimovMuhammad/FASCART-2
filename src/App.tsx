import '@/lib/i18n';
import { Suspense, useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "@/redux/store";
import type { RootState } from "@/redux/store";

import { Layout } from "@/Layout/Layout";
import { cn } from "@/lib/utils";
import { Home, Login, ProductCheckout, Wishlist, ProductDetails, Cart, Products, Checkout, Account, Contact, About, NotFound } from "@/router/router";

function AppContent() {
  const darkMode = useSelector((state: RootState) => state.app.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, 
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/Registre", element: <ProductCheckout /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/cart", element: <Cart /> },
        { path: "/products", element: <Products /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/account", element: <Account /> },
        { path: "/contact", element: <Contact /> },
        { path: "/about", element: <About /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <Provider store={store}>
      <Suspense 
        fallback={
          <div className={cn('min-h-screen', 'flex', 'items-center', 'justify-center', 'text-zinc-400', 'bg-white', 'dark:bg-zinc-950')}>
            Loading FastCart...
          </div>
        }
      >
        <AppContent />
      </Suspense>
    </Provider>
  );
}