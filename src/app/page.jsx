"use client"; // <== Required for client-side interactivity
import Link from 'next/link';

import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0EAFC] to-[#CFDEF3] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white bg-opacity-80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/30">
        
        {/* Left Panel - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-10 flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 mb-4">
            <img src="/favicon.ico" className="w-6 h-6" alt="Logo" />
            <span className="text-xl font-bold text-gray-900">Sellora</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back 👋</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your email and password to access your account.</p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue="pos@company.com"
                className="w-full px-4 py-3 text-sm border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                defaultValue="000000."
                className="w-full px-4 py-3 text-sm border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl shadow-md hover:opacity-90 transition"
            >
              Log In
            </button>
          </form>

          <div className="flex items-center my-5">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-sm text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex gap-4">
            <button className="w-full py-2 border rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 text-sm">
              <img src="https://img.icons8.com/color/16/google-logo.png" alt="Google" />
              Continue with Google
            </button>
            <button className="w-full py-2 border rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 text-sm">
              <img src="https://img.icons8.com/ios-filled/16/mac-os.png" alt="Apple" />
              Continue with Apple
            </button>
          </div>

          {/* <p className="text-sm text-center mt-6 text-gray-500">
            Don’t have an account? <a href="#" className="text-blue-600 font-medium hover:underline">Register now</a>
          </p> */}
          <p className="text-sm mt-6 text-center text-gray-500">
  Don’t have an account?{" "}
  <Link href="/register" className="text-blue-600 hover:underline font-semibold">
    Register now
  </Link>
</p>


          <p className="text-xs text-center mt-6 text-gray-400">
            © 2025 Sellora Enterprises LTD. <a href="#" className="underline">Privacy Policy</a>
          </p>
        </motion.div>

        {/* Right Panel - Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#2F3CFF] to-[#1E2EFF] text-white px-10 py-14 relative flex items-center justify-center"
        >
          <div className="z-10 relative text-center">
            <h2 className="text-2xl font-bold mb-4">Effortlessly manage your team and operations</h2>
            <p className="text-sm mb-6 max-w-xs mx-auto">
              Log in to access your CRM dashboard and manage your team’s performance with clarity.
            </p>
            <img
              src="https://hlpos.com/wp-content/uploads/2020/07/dashboard.png"
              alt="Dashboard Preview"
              className="rounded-2xl shadow-lg border border-white/10"
            />
          </div>

          {/* Optional background blur or icon pattern */}
          <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-5 bg-cover bg-center"></div>
        </motion.div>
      </div>
    </div>
  );
}
