import React from 'react'
import Sidebar from '../components/Sidebar'
import { ToastContainer } from 'react-toastify'
import AuthProvider from '../components/SessionProvider'

const Layout = ({ children }) => {
  return (
    <div>
      <AuthProvider>
        <div className="flex min-h-screen bg-gray-50">

          <ToastContainer />
          <Sidebar />
          {children}
        </div>
      </AuthProvider>
    </div>
  )
}

export default Layout
