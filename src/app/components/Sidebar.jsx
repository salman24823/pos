// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import {
//   FiHome, FiUsers, FiPackage, FiShoppingCart, FiTruck,
//   FiDollarSign, FiCreditCard, FiPieChart, FiShoppingBag,
//   FiBarChart2, FiGlobe, FiSettings, FiClock, FiLogOut
// } from 'react-icons/fi';

// export default function Sidebar() {
//   const navItems = [
//     { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
//     { name: 'Attendance', icon: FiClock, path: '/dashboard/attendance' },
//     { name: 'Check In', icon: FiClock, path: '/dashboard/checkIn' },
//     { name: 'Check Out', icon: FiClock, path: '/dashboard/checkOut' },
//     { name: 'Sales', icon: FiShoppingCart, path: '/dashboard/sales' },
//     { name: 'Purchases', icon: FiShoppingBag, path: '/dashboard/purchases' },
//     { name: 'Expenses', icon: FiPieChart, path: '/dashboard/expenses' },
//     { name: 'Staff Members', icon: FiUsers, path: '/dashboard/staff' },
//     { name: 'Sales Reports', icon: FiBarChart2, path: '/dashboard/reports' },
//     { name: 'Settings', icon: FiSettings, path: '/dashboard/settings' },
//     { name: 'Logout', icon: FiLogOut, path: '/logout' },
//   ];

//   return (
//     <aside className="max-lg:hidden relative w-64 bg-gray-900 text-white py-4 space-y-2">
//       <div className='sticky top-4'>
//         <div className="text-2xl font-bold mb-6 p-4 flex items-center">
//           <div className="w-10 h-10 flex items-center justify-center mr-2">
//             <span className="font-bold">
//               <Image
//                 src="/public/logo.png"
//                 alt=""
//                 width={100}
//                 height={100}
//                 className="rounded-full"
//               />
//             </span>
//           </div>
//           <span>Panze</span>
//           <span className="text-gray-400 ml-1 text-sm">Studio</span>
//         </div>

//         <nav className="space-y-1">
//           {navItems.map((item, idx) => (
//             <Link
//               key={idx}
//               href={item.path}
//               className={`flex items-center space-x-3 px-4 py-3 transition-all hover:bg-gray-800 ${item.name === 'Dashboard' ? 'bg-gray-900' : ''}`}
//             >
//               <item.icon className="text-lg text-gray-300" />
//               <span className="text-gray-200">{item.name}</span>
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </aside>
//   );
// }


'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  FiHome, FiUsers, FiPackage, FiShoppingCart, FiTruck,
  FiDollarSign, FiCreditCard, FiPieChart, FiShoppingBag,
  FiBarChart2, FiGlobe, FiSettings, FiClock, FiLogOut
} from 'react-icons/fi';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
    { name: 'Attendance', icon: FiClock, path: '/dashboard/attendance' },
    { name: 'Check In', icon: FiClock, path: '/dashboard/checkIn' },
    { name: 'Check Out', icon: FiClock, path: '/dashboard/checkOut' },
    { name: 'Sales', icon: FiShoppingCart, path: '/dashboard/sales' },
    { name: 'Purchases', icon: FiShoppingBag, path: '/dashboard/purchases' },
    { name: 'Expenses', icon: FiPieChart, path: '/dashboard/expenses' },
    { name: 'Staff Members', icon: FiUsers, path: '/dashboard/employee' },
    { name: 'Sales Reports', icon: FiBarChart2, path: '/dashboard/reports' },
    { name: 'Settings', icon: FiSettings, path: '/dashboard/settings' },
    { name: 'Logout', icon: FiLogOut, path: '/logout' },
  ];

  return (
    <aside className="max-lg:hidden relative w-64 bg-gray-900 text-white py-4 space-y-2">
      <div className='sticky top-4'>
        {/* LOGO SECTION */}
        <div className="flex items-center px-4 mb-8">
          <div className="w-12 h-12 relative mr-3">
            <Image
              src="/public/th.png" // ✅ Correct path (NO 'public' prefix)
              alt="Logo"
              fill
              className="object-contain rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold">EAST IS WEST</span>
            <span className="text-sm text-gray-400"></span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-1">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className={`flex items-center space-x-3 px-4 py-3 transition-all hover:bg-gray-800 ${item.name === 'Dashboard' ? 'bg-gray-900' : ''}`}
            >
              <item.icon className="text-lg text-gray-300" />
              <span className="text-gray-200">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
