import React from 'react'

function MainContent({ children }) {
    return (
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </main>
    )
}

export default MainContent