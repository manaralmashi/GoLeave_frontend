// // src/components/layout/Layout.jsx
// import React, { useState } from 'react';
// import { Link, useLocation, Outlet } from 'react-router';
// import Header from './Header';

// export default function Layout({ user, setUser }) {
//     const [sidebarOpen, setSidebarOpen] = useState(true);
//     const location = useLocation();


//     const navSideBar = [
//         { name: 'Dashboard', href: '/', icon: '🏠' },
//         { name: 'Leave requests', href: '/leave-requests', icon: '📋' },
//         { name: 'Leave balance', href: '/leave-balance', icon: '💰' },
//         { name: 'Employees', href: '/employees', icon: '👥' },
//         { name: 'Profile', href: '/profile', icon: '⚙️' },
//     ];

//     const isActive = (path) => location.pathname === path;

//     return (
//         <div className="flex h-screen bg-gray-100">
//             {/* Sidebar */}
//             <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300`}>
//                 <div className="flex flex-col h-full">
//                     {/* Logo */}
//                     <div className="flex items-center justify-between p-4 border-b">
//                         {sidebarOpen && (
//                             <h1 className="text-xl font-bold text-blue-600">🏢 GoLeave</h1>
//                         )}
//                         <button
//                             onClick={() => setSidebarOpen(!sidebarOpen)}
//                             className="p-2 rounded-lg hover:bg-gray-100"
//                         >
//                             {sidebarOpen ? '◀' : '▶'}
//                         </button>
//                     </div>

//                     {/* NavSideBar */}
//                     <nav className="flex-1 p-4">
//                         <ul className="space-y-2">
//                             {navSideBar.map((item) => (
//                                 <li key={item.name}>
//                                     <Link
//                                         to={item.href}
//                                         className={`flex items-center p-3 rounded-lg transition-colors ${isActive(item.href)
//                                                 ? 'bg-blue-100 text-blue-600'
//                                                 : 'text-gray-600 hover:bg-gray-100'
//                                             }`}
//                                     >
//                                         <span className="text-lg">{item.icon}</span>
//                                         {sidebarOpen && (
//                                             <span className="mr-3">{item.name}</span>
//                                         )}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </nav>

//                     {/* User Profile */}
//                     <div className="p-4 border-t">
//                         <div className="flex items-center space-x-3">
//                             <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
//                                 {user?.first_name?.[0] || 'U'}
//                             </div>
//                             {sidebarOpen && (
//                                 <div className="flex-1 min-w-0">
//                                     <p className="text-sm font-medium text-gray-900">
//                                         {user?.first_name} {user?.last_name}
//                                     </p>
//                                     <p className="text-sm text-gray-500 truncate">
//                                         {user?.job_title || 'employee'}
//                                     </p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 flex flex-col overflow-hidden">
//                 {/* Header */}
//                 <Header navSideBar={navSideBar} user={user} />

//                 {/* Page Content */}
//                 <main className="flex-1 overflow-auto p-6">
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//     );
// }

import React from 'react'
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';

function Layout({ children }) {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <MainContent>
                    {children}
                </MainContent>
            </div>
        </div>
    )
}

export default Layout