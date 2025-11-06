import React from 'react'
import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import LogoutButton from '../auth/LogoutButton';
import { Link } from 'react-router';
import { UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

function Header({ user, setUser }) {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200/60">
            <div className="flex items-center justify-between px-6 py-3">
                {/* Page Title - i will try to make it dynamicly later */}
                <div className="flex items-center space-x-3">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                    <h1 className="text-lg font-semibold text-gray-800">
                        Welcome back, {user.first_name} 👋
                    </h1>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4">

                    {/* User Profile Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200">
                            <div className="relative">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {user.first_name?.[0]}{user.last_name?.[0]}
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            
                            <div className="text-left">
                                <p className="text-sm font-semibold text-gray-800">
                                    {user.first_name} {user.last_name}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">
                                    {user.role || 'employee'}
                                </p>
                            </div>
                            
                            <ChevronDownIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </button>

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <div className="p-4 border-b border-gray-200/60">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        {user.first_name?.[0]}{user.last_name?.[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-800 truncate">
                                            {user.first_name} {user.last_name}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                        <p className="text-xs text-blue-600 font-medium capitalize mt-1">
                                            {user.role || 'employee'} • {user.department || 'No Department'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-2">
                                <Link 
                                    to="/profile" 
                                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                >
                                    <UserIcon className="w-5 h-5" />
                                    <span className="font-medium">My Profile</span>
                                </Link>
                            </div>
                            
                            <div className="p-2 border-t border-gray-200/60">
                                <LogoutButton setUser={setUser} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header