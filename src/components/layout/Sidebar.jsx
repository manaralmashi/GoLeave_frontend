import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import {
    HomeIcon,
    UsersIcon,
    BuildingOfficeIcon,
    ClipboardDocumentListIcon,
    CalendarDaysIcon,
    UserCircleIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import { getUserFromToken } from '../../lib/auth';

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [currentUserRole, setCurrentUserRole] = useState('');
    const location = useLocation();

    useEffect(() => {
        const user = getUserFromToken();
        if (user) {
            setCurrentUserRole(user.role || 'employee');
        }
    }, []);

    const isAdmin = currentUserRole === 'admin';
    
    const menuItems = [
        { 
            name: 'Dashboard', 
            href: '/', 
            icon: HomeIcon,
            roles: ['admin', 'employee'] // Allow Any
        },
        { 
            name: 'Employees', 
            href: '/employees', 
            icon: UsersIcon,
            roles: ['admin', 'employee'] // Only Admin
        },
        { 
            name: 'Leave Requests', 
            href: '/leave-requests', 
            icon: CalendarDaysIcon,
            roles: ['admin', 'employee'] // Allow Any
        },
        { 
            name: 'Profile', 
            href: '/profile', 
            icon: UserCircleIcon,
            roles: ['admin', 'employee'] // Allow Any
        },
    ];

    // Filter items by roles.
    const filteredMenuItems = menuItems.filter(item => 
        item.roles.includes(currentUserRole)
    );

    // isActive or not?
    const isActive = (href) => {
        if (href === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(href);
    };

    return (
        <div className={`
            bg-gradient-to-b from-white to-gray-50/80 
            shadow-xl border-r border-gray-200/60
            transition-all duration-100 ease-in-out
            flex flex-col
            ${isCollapsed ? 'w-20' : 'w-64'}
        `}>
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/60">
                {!isCollapsed && (
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">GL</span>
                        </div>
                        <div>
                            <h1 className="gasoek-one-regular text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                GoLeave
                            </h1>
                            <p className="text-xs text-gray-500 -mt-1">
                                {isAdmin ? 'Admin Panel' : 'Employee Portal'}
                            </p>
                        </div>
                    </div>
                )}
                
                {/* Toggle Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`
                        p-2 rounded-xl transition-all duration-200
                        ${isCollapsed 
                            ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }
                    `}
                >
                    {isCollapsed ? (
                        <ChevronRightIcon className="w-4 h-4" />
                    ) : (
                        <ChevronLeftIcon className="w-4 h-4" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 mt-6 px-3 space-y-1">
                {filteredMenuItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <a
                            key={item.name}
                            href={item.href}
                            className={`
                                group flex items-center px-3 py-3 rounded-xl
                                transition-all duration-200 ease-out
                                ${active 
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-200' 
                                    : 'hover:bg-blue-50/80 hover:shadow-md'
                                }
                                ${isCollapsed ? 'justify-center' : ''}
                            `}
                        >
                            <div className={`
                                relative transition-transform duration-200
                                ${active ? 'text-white scale-110' : 'text-gray-600 group-hover:text-blue-600'}
                                ${isCollapsed ? '' : 'mr-3'}
                            `}>
                                <item.icon className="w-6 h-6" />
                                
                                {/* Active Indicator Dot */}
                                {active && !isCollapsed && (
                                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
                                )}
                            </div>
                            
                            {!isCollapsed && (
                                <div className="flex-1 min-w-0">
                                    <span className={`
                                        font-medium transition-colors duration-200
                                        ${active ? 'text-white' : 'text-gray-700 group-hover:text-blue-600'}
                                    `}>
                                        {item.name}
                                    </span>
                                </div>
                            )}
                            
                            {/* Hover Arrow Effect */}
                            {!isCollapsed && (
                                <div className={`
                                    transition-all duration-200
                                    ${active 
                                        ? 'opacity-100 translate-x-0' 
                                        : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                                    }
                                `}>
                                    <div className={`
                                        w-1 h-6 rounded-full
                                        ${active ? 'bg-white/80' : 'bg-blue-400'}
                                    `}></div>
                                </div>
                            )}
                        </a>
                    );
                })}
            </nav>

            {/* Footer */}
            {!isCollapsed && (
                <div className="p-4 border-t border-gray-200/60">
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl p-3">
                        <p className="text-xs text-gray-600 text-center">
                            &copy; 2025 GoLeave. All rights reserved.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;