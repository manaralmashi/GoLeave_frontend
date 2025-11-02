import React from 'react'
import LogoutButton from '../auth/LogoutButton'

function Header({ navSideBar, user }) {
    return (
        <header className="bg-white shadow-sm z-10">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {
                            navSideBar.find(item => item.href === location.pathname)?.name || 'Dashboard'
                        }
                    </h2>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                        🔔
                    </button>
                    <div className="relative">
                        <button className="flex items-center space-x-2 text-sm text-gray-700">
                            <span>{user?.first_name} {user?.last_name}</span>
                            <span>▼</span>
                        </button>
                        {/* Dropdown menu later */}
                    </div>
                    <LogoutButton setUser={setUser} />
                </div>
            </div>
        </header>
    )
}

export default Header