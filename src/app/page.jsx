'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { signIn }
import { FiLock, FiMail, FiEye, FiEyeOff, FiLoader } from 'react-icons/fi';
// import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setIsLoading(true);

  //   if (!email || !password) {
  //     setError('Please fill in all fields');
  //     setIsLoading(false);
  //     return;
  //   }

  //   const res = await signIn('credentials', {
  //     redirect: false,
  //     email,
  //     password,
  //   });

  //   if (res?.ok) {
  //     router.push('/dashboard');
  //   } else {
  //     setError('Invalid email or password');
  //   }

  //   setIsLoading(false);
  // };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full transition-all duration-300 hover:shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 text-2xl font-bold rounded-full flex items-center justify-center shadow-md">
            <Image
              src="/logo1.png"
              alt="Logo"
              width={100}
              height={100}
              className="rounded-xl"
            />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">Welcome Back</h2>
        <p className="text-center text-sm sm:text-base text-gray-500 mb-6">
          Sign in to your account to continue
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a87903] focus:border-transparent text-gray-700 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a87903] focus:border-transparent text-gray-700 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength="6"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="text-gray-400 hover:text-blue-600" />
                ) : (
                  <FiEye className="text-gray-400 hover:text-blue-600" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center ${
              isLoading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-[#0e0e0e] hover:bg-[#1d1d1d] shadow-md hover:shadow-lg'
            }`}
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
            </div>
          </div>

          <div className="mt-4">
            <Link
              href="/register"
              className="block w-full text-center py-2 px-4 border border-gray-200 rounded-lg font-medium bg-gray-50 text-[#0e0e0e] hover:bg-[#0e0e0e] hover:text-white hover:border-[#1d1d1d] transition-all"
            >
              Create new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
