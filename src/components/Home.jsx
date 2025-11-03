// import React from 'react';
// import { Link } from 'react-router';

// export default function Home() {
//   return (
//     <div className="bg-gray-50">
//         <div>
//           <h1 className="text-4xl font-bold text-yellow-500 font-manrope">GoLeave</h1>
//           <p>This is my app</p>
//           <div>
//             <Link to="/login" className="bg-blue-500 text-white">Login</Link>
//           </div>
//         </div>
//     </div>
//   );
// }

import React from 'react'
import Card from '../components/common/Card';

function Home() {
    const stats = [
        { title: 'Total Employees', value: '124', color: 'blue' },
        { title: 'Active Departments', value: '8', color: 'green' },
        { title: 'Pending Leave Requests', value: '12', color: 'yellow' },
        { title: 'This Month Birthdays', value: '5', color: 'purple' },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome to your HR Dashboard</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="p-6">
                        <div className="flex items-center">
                            <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                                <div className={`w-6 h-6 bg-${stat.color}-500 rounded`}></div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Employees</h3>
                    {/* Add employee list component */}
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Leave Requests</h3>
                    {/* Add leave requests component */}
                </Card>
            </div>
        </div>
    )
}

export default Home