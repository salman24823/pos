import React from 'react'
import Sidebar from '../components/Sidebar'
import { ToastContainer } from 'react-toastify'

const Layout = ({ children }) => {
  return (
    <div>
      <div className="flex min-h-screen bg-gray-50">
        <ToastContainer />
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default Layout
