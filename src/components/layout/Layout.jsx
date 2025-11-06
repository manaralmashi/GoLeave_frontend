import React from 'react'
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';

function Layout({ children, user, setUser }) {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header user={user} setUse={setUser}/>
                <MainContent>
                    {children}
                </MainContent>
            </div>
        </div>
    )
}

export default Layout