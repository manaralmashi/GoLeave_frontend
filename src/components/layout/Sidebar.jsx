import React from 'react'
import { useState } from 'react';
import {
    HomeIcon,
    UsersIcon,
    BuildingOfficeIcon,
    ClipboardDocumentListIcon,
    CalendarDaysIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';

function Sidebar() {

    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const menuItems = [
        { name: 'Dashboard', href: '/', icon: HomeIcon },
        { name: 'Employees', href: '/employees', icon: UsersIcon },
        { name: 'Departments', href: '/departments', icon: BuildingOfficeIcon },
        { name: 'Leave Types', href: '/leave-types', icon: ClipboardDocumentListIcon },
        { name: 'Leave Requests', href: '/leave-requests', icon: CalendarDaysIcon },
        { name: 'Profile', href: '/profile', icon: UserCircleIcon },
    ];

    return (
        <div className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
            }`}>
            {/* Logo */}
            <div className="flex items-center justify-between p-4 border-b">
                {!isCollapsed && (
                    <h1 className="text-xl font-bold text-blue-600">HR Dashboard</h1>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                >
                    <div className="w-6">
                        <div className="h-0.5 w-6 bg-gray-600 mb-1"></div>
                        <div className="h-0.5 w-4 bg-gray-600 mb-1"></div>
                        <div className="h-0.5 w-6 bg-gray-600"></div>
                    </div>
                </button>
            </div>

            {/* Navigation */}
            <nav className="mt-6">
                {menuItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                        <item.icon className="h-6 w-6" />
                        {!isCollapsed && (
                            <span className="ml-3 font-medium">{item.name}</span>
                        )}
                    </a>
                ))}
            </nav>
        </div>
    )
}

export default Sidebar