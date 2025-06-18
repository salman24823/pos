import React from 'react'
import Sidebar from '../components/Sidebar'

const Layout = ({ children }) => {
  return (
    <div>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default Layout
