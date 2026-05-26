import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from '@/redux/appSlice';
import { useProfile, getUserIdFromToken } from '@/hooks/useProfile';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { fetchProfile } = useProfile();
  
  const [formData, setFormData] = useState({ userName: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const apiUrl = import.meta.env.VITE_API_URL 

    try {
      const response = await axios.post(`${apiUrl}/Account/login`, {
        userName: formData.userName,
        password: formData.password
      }, {
        headers: { 'Content-Type': 'application/json', 'accept': '*/*' }
      });

      if (response.data && response.data.statusCode === 200) {
        const token = response.data.data;
        if (token) {
          localStorage.setItem('token', token);

          const userId = getUserIdFromToken(token);

          dispatch(login({
            userId: userId || undefined,
            name: formData.userName,
            email: ''
          }));

          if (userId) {
            await fetchProfile(userId);
          }

          setSuccess(t('loginPage.successLogin') || "Шумо бомуваффақият ворид шудед!");
          setTimeout(() => navigate('/'), 1500);
        }
      }
    } catch (err: any) {
      let errorMsg = t('loginPage.errorConnection') || "Ошибка соединения с сервером.";
      if (err.response?.data?.errors?.length > 0) {
        errorMsg = err.response.data.errors[0];
      } else if (err.response?.status === 401) {
        errorMsg = t('loginPage.errorLogin') || "Неверное имя пользователя или пароль!";
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn('min-h-[85vh]', 'w-full', 'flex', 'flex-col', 'lg:flex-row', 'items-center', 'justify-center', 'bg-white', 'dark:bg-zinc-950', 'overflow-hidden', 'pt-4', 'pb-12', 'lg:py-0')}>
      
    

      <div className={cn('w-full', 'lg:w-1/2', 'flex', 'items-center', 'justify-center', 'px-4', 'sm:px-8', 'md:px-16', 'lg:px-20')}>
        <div className={cn('w-full', 'max-w-[400px]', 'space-y-6', 'sm:space-y-8')}>
          
          <div className={cn('text-center', 'md:text-left', 'space-y-2')}>
            <h2 className={cn('text-2xl', 'sm:text-3xl', 'font-black', 'tracking-tight', 'text-zinc-900', 'dark:text-zinc-50', 'uppercase')}>
              {t('loginPage.loginTitle') || "Log in to Exclusive"}
            </h2>
            <p className={cn('text-xs', 'sm:text-sm', 'text-zinc-500', 'dark:text-zinc-400')}>
              {t('loginPage.loginSubtitle') || "Enter your details below"}
            </p>
          </div>
   {success && (
              <div className={cn('rounded-xl', 'bg-green-50', 'dark:bg-green-950/40', 'border', 'border-green-200', 'dark:border-green-800', 'px-4', 'py-3', 'text-sm', 'text-green-700', 'dark:text-green-400', 'text-center')}>
                {success}
              </div>
            )}

            {error && (
              <div className={cn('rounded-xl', 'bg-red-50', 'dark:bg-red-950/40', 'border', 'border-red-200', 'dark:border-red-800', 'px-4', 'py-3', 'text-sm', 'text-red-600', 'dark:text-red-400', 'text-center')}>
                {error}
              </div>
            )}


          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder={t('loginPage.placeholderUserOrEmail') || "Email or Phone Number"}
              required
              className={cn('h-12', 'rounded-xl', 'bg-zinc-50', 'dark:bg-zinc-900/50', 'border-zinc-200', 'dark:border-zinc-800', 'text-sm', 'focus-visible:ring-1', 'focus-visible:ring-zinc-400', 'placeholder:text-zinc-400')}
            />

            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('loginPage.placeholderPassword') || "Password"}
              required
              className={cn('h-12', 'rounded-xl', 'bg-zinc-50', 'dark:bg-zinc-900/50', 'border-zinc-200', 'dark:border-zinc-800', 'text-sm', 'focus-visible:ring-1', 'focus-visible:ring-zinc-400', 'placeholder:text-zinc-400')}
            />

         
            <div className={cn('flex', 'items-center', 'justify-end')}>
              <button type="button" className={cn('text-sm', 'font-medium', 'text-[#db4444]', 'hover:underline', 'bg-transparent', 'border-none', 'cursor-pointer')}>
                {t('loginPage.forgetPassword') || "Forget Password?"}
              </button>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className={cn('w-full', 'h-12', 'bg-[#db4444]', 'hover:bg-[#c33a3a]', 'text-white', 'font-bold', 'text-sm', 'rounded-xl', 'tracking-wide', 'transition-all', 'duration-300', 'disabled:opacity-50')}
              >
                {loading ? (t('loginPage.loggingIn') || "Logging In...") : (t('loginPage.btnLogIn') || "Log In")}
              </Button>
            </div>
          </form>

          <div className={cn('text-center', 'text-xs', 'sm:text-sm', 'text-zinc-500', 'dark:text-zinc-400', 'pt-4')}>
            {t('loginPage.noAccount') || "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className={cn('font-bold', 'text-black', 'dark:text-white', 'underline', 'underline-offset-4', 'hover:text-[#db4444]', 'transition-colors')}
            >
              {t('loginPage.signUp') || "Sign Up"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;