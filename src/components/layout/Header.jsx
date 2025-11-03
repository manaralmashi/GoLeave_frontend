// import React from 'react'
// import LogoutButton from '../auth/LogoutButton'

// function Header({ navSideBar, user }) {
//     return (
//         <header className="bg-white shadow-sm z-10">
//             <div className="flex items-center justify-between p-4">
//                 <div className="flex items-center space-x-4">
//                     <h2 className="text-lg font-semibold text-gray-800">
//                         {
//                             navSideBar.find(item => item.href === location.pathname)?.name || 'Dashboard'
//                         }
//                     </h2>
//                 </div>

//                 <div className="flex items-center space-x-4">
//                     <button className="p-2 text-gray-400 hover:text-gray-600">
//                         🔔
//                     </button>
//                     <div className="relative">
//                         <button className="flex items-center space-x-2 text-sm text-gray-700">
//                             <span>{user?.first_name} {user?.last_name}</span>
//                             <span>▼</span>
//                         </button>
//                         {/* Dropdown menu later */}
//                     </div>
//                     <LogoutButton setUser={setUser} />
//                 </div>
//             </div>
//         </header>
//     )
// }

// export default Header

import React from 'react'
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import LogoutButton from '../auth/LogoutButton';

function Header() {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Search Bar */}
                {/* <div className="flex-1 max-w-2xl">
                    <div className="relative">
                        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div> */}

                {/* Right Section */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <BellIcon className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center space-x-3">
                        <img
                            className="w-8 h-8 rounded-full"
                            src="https://via.placeholder.com/32"
                            alt="User"
                        />
                        <span className="text-sm font-medium text-gray-700">Admin User</span>
                    </div>

                    {/* Logout Button */}
                    <LogoutButton />
                </div>
            </div>
        </header>
    )
}

export default Header