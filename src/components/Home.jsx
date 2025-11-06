// import React from 'react'
// import Card from '../components/common/Card';

// function Home({ user }) {
//     const stats = [
//         { title: 'Total Employees', value: '124', color: 'blue' },
//         { title: 'Active Departments', value: '8', color: 'green' },
//         { title: 'Pending Leave Requests', value: '12', color: 'yellow' },
//         { title: 'This Month Birthdays', value: '5', color: 'purple' },
//     ];

//     return (
//         <>
//             <div className="space-y-6">
//                 {/* Page Header */}
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//                     <p className="text-gray-600">Welcome {user.first_name} {user.last_name} { }</p>
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                     {stats.map((stat, index) => (
//                         <Card key={index} className="p-6">
//                             <div className="flex items-center">
//                                 <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
//                                     <div className={`w-6 h-6 bg-${stat.color}-500 rounded`}></div>
//                                 </div>
//                                 <div className="ml-4">
//                                     <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                                     <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                                 </div>
//                             </div>
//                         </Card>
//                     ))}
//                 </div>

//                 {/* Recent Activity */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     <Card className="p-6">
//                         <h3 className="text-lg font-semibold mb-4">Recent Employees</h3>
//                         {/* Add employee list component */}
//                     </Card>

//                     <Card className="p-6">
//                         <h3 className="text-lg font-semibold mb-4">Leave Requests</h3>
//                         {/* Add leave requests component */}
//                     </Card>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Home



// // ---> I will add calender later !!
// // {/* Calender copied from `https://www.creative-tim.com/twcomponents/component/free-tailwind-css-calendar-component` */}
// // <div class="flex items-center justify-center py-8 px-4">
// //     {/* <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ ---> */}

// //     <div class="max-w-sm w-full shadow-lg">
// //         <div class="md:p-8 p-5 bg-white rounded-t">
// //             <div class="px-4 flex items-center justify-between">
// //                 <span tabindex="0" class="focus:outline-none  text-base font-bold text-gray-800">October 2020</span>
// //                 <div class="flex items-center">
// //                     <button aria-label="calendar backward" class="focus:text-gray-400 hover:text-gray-400 text-gray-800">
// //                         <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
// //                             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
// //                             <polyline points="15 6 9 12 15 18" />
// //                         </svg>
// //                     </button>
// //                     <button aria-label="calendar forward" class="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800">
// //                         <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler  icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
// //                             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
// //                             <polyline points="9 6 15 12 9 18" />
// //                         </svg>
// //                     </button>

// //                 </div>
// //             </div>
// //             <div class="flex items-center justify-between pt-12 overflow-x-auto">
// //                 <table class="w-full">
// //                     <thead>
// //                         <tr>
// //                             <th>
// //                                 <div class="w-full flex justify-center">
// //                                     <p class="text-base font-medium text-center text-gray-800">Mo</p>
// //                                 </div>
// //                             </th>
// //                             <th>
// //                                 <div class="w-full flex justify-center">
// //                                     <p class="text-base font-medium text-center text-gray-800">Tu</p>
// //                                 </div>
// //                             </th>
// //                             <th>
// //                                 <div class="w-full flex justify-center">
// //                                     <p class="text-base font-medium text-center text-gray-800">We</p>
// //                                 </div>
// //                             </th>
// //                             <th>
// //                                 <div class="w-full flex justify-center">
// //                                     <p class="text-base font-medium text-center text-gray-800">Th</p>
// //                                 </div>
// //                             </th>
// //                             <th>
// //                                 <div class="w-full flex justify-center">
// //                                     <p class="text-base font-medium text-center text-gray-800">Fr</p>
// //                                 </div>
// //                             </th>
// //                             <th>
// //                                 <div class="w-full flex justify-center">
// //                                     <p class="text-base font-medium text-center text-gray-800">Sa</p>
// //                                 </div>
// //                             </th>
// //                             <th>
// //                                 <div class="w-full flex justify-center">
// //                                     <p class="text-base font-medium text-center text-gray-800">Su</p>
// //                                 </div>
// //                             </th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         <tr>
// //                             <td class="pt-6">
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
// //                             </td>
// //                             <td class="pt-6">
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
// //                             </td>
// //                             <td class="pt-6">
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">1</p>
// //                                 </div>
// //                             </td>
// //                             <td class="pt-6">
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">2</p>
// //                                 </div>
// //                             </td>
// //                             <td class="pt-6">
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500">3</p>
// //                                 </div>
// //                             </td>
// //                             <td class="pt-6">
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500">4</p>
// //                                 </div>
// //                             </td>
// //                         </tr>
// //                         <tr>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">5</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">6</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">7</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="w-full h-full">
// //                                     <div class="flex items-center justify-center w-full rounded-full cursor-pointer">
// //                                         <a role="link" tabindex="0" class="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full">8</a>
// //                                     </div>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">9</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500">10</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500">11</p>
// //                                 </div>
// //                             </td>
// //                         </tr>
// //                         <tr>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">12</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">13</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">14</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">15</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">16</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500">17</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500">18</p>
// //                                 </div>
// //                             </td>
// //                         </tr>
// //                         <tr>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">19</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">20</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">21</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">22</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">23</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500">24</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500">25</p>
// //                                 </div>
// //                             </td>
// //                         </tr>
// //                         <tr>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">26</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">27</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">28</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">29</p>
// //                                 </div>
// //                             </td>
// //                             <td>
// //                                 <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
// //                                     <p class="text-base text-gray-500 font-medium">30</p>
// //                                 </div>
// //                             </td>
// //                         </tr>
// //                     </tbody>
// //                 </table>
// //             </div>
// //         </div>
// //     </div>
// // </div>

// The dashboard design was inspired by this video: `https://youtu.be/xsqwRN8w_MU?si=XoVaVQHTP0ddwUBq`

import React, { useState, useEffect } from 'react';
import { authRequest, getUserFromToken } from '../lib/auth';
import { 
    UsersIcon, 
    ClockIcon, 
    CheckCircleIcon, 
    CalendarDaysIcon,
    HeartIcon,
    AcademicCapIcon,
    ExclamationTriangleIcon,
    ArrowTrendingUpIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';

function Home({ user }) {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUserRole, setCurrentUserRole] = useState('');

    // dashboard stats loading function
    async function loadDashboardStats() {
        try {
            const tokenUser = getUserFromToken();
            
            // Load dashboard stats
            const dashboardResponse = await authRequest({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/dashboard/stats/'
            });

            // Load leave balance for employees
            let leaveBalanceData = {};
            if (tokenUser?.role === 'employee') {
                try {
                    const balanceResponse = await authRequest({
                        method: 'GET', 
                        url: `http://127.0.0.1:8000/api/leave-balances/${tokenUser.employee_id}/`
                    });
                    leaveBalanceData = balanceResponse.data;
                } catch (balanceErr) {
                    console.log('No leave balance data found');
                }
            }

            setStats({
                ...dashboardResponse.data,
                leave_balance: leaveBalanceData
            });
        } catch (err) {
            console.error('Error loading dashboard stats:', err);
        } finally {
            setLoading(false);
        }
    }
    
    // EmployeeStats component
    function EmployeeStats({ stats }) {
        const leaveBalance = stats?.leave_balance || {};
        
        const employeeStats = [
            {
                title: 'Annual Leave',
                value: leaveBalance.ANNUAL?.remaining_days || 0,
                total: leaveBalance.ANNUAL?.max_days_allowed || 30,
                used: leaveBalance.ANNUAL?.used_days || 0,
                color: 'blue',
                icon: CalendarDaysIcon,
                type: 'days',
                warning: leaveBalance.ANNUAL?.warning_status
            },
            {
                title: 'Sick Leave',
                value: leaveBalance.SICK?.remaining_days || 0, 
                total: leaveBalance.SICK?.max_days_allowed || 30,
                used: leaveBalance.SICK?.used_days || 0,
                color: 'green',
                icon: HeartIcon,
                type: 'days',
                warning: leaveBalance.SICK?.warning_status
            },
            {
                title: 'Emergency Leave',
                value: leaveBalance.EMERGENCY?.remaining_days || 0,
                total: leaveBalance.EMERGENCY?.max_days_allowed || 3,
                used: leaveBalance.EMERGENCY?.used_days || 0,
                color: 'orange',
                icon: ExclamationTriangleIcon,
                type: 'days',
                warning: leaveBalance.EMERGENCY?.warning_status
            },
            {
                title: 'Pending Requests',
                value: stats?.pending_requests || 0,
                color: 'yellow',
                icon: ClockIcon,
                type: 'count'
            }
        ];

        return (
            <>
                {employeeStats.map((stat, index) => (
                    <EmployeeStatCard key={index} stat={stat} />
                ))}
            </>
        );
    }

    // EmployeeStatCard with warning
    function EmployeeStatCard({ stat }) {
        const Icon = stat.icon;
        const percentage = stat.total > 0 ? (stat.value / stat.total) * 100 : 0;
        
        const colorClasses = {
            blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-100' },
            green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-100' },
            orange: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-100' },
            yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-100' }
        };

        const colors = colorClasses[stat.color];

        // Warning color based on status
        const getWarningColor = (warning) => {
            switch(warning) {
                case 'danger': return 'bg-red-500';
                case 'warning': return 'bg-yellow-500';
                default: return 'bg-gray-300';
            }
        };

        return (
            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${colors.light}`}>
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    
                    {/* Warning dot */}
                    {stat.warning && stat.warning !== 'safe' && (
                        <div className={`w-3 h-3 rounded-full ${getWarningColor(stat.warning)}`}></div>
                    )}
                </div>
                
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                
                {stat.type === 'days' && (
                    <>
                        <span className="text-2xl font-bold text-gray-900">
                            {stat.value}<span className="text-sm text-gray-500">/{stat.total}</span>
                        </span>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                                className={`h-2 rounded-full ${colors.bg} transition-all duration-500`}
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                            ></div>
                        </div>
                        {stat.used !== undefined && (
                            <p className="text-xs text-gray-500 mt-1">Used: {stat.used} days</p>
                        )}
                    </>
                )}
                
                {stat.type === 'count' && (
                    <>
                        <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                        <p className="text-xs text-gray-500">Requests awaiting approval</p>
                    </>
                )}
            </div>
        );
    }

    useEffect(() => {
        const tokenUser = getUserFromToken();
        setCurrentUserRole(tokenUser?.role || 'employee');
        loadDashboardStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const isAdmin = currentUserRole === 'admin';

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Good {getTimeOfDay()}, {user.first_name} 👋
                            </h1>
                            <p className="text-gray-600 mt-2">
                                {isAdmin 
                                    ? 'Here\'s what\'s happening in your organization today'
                                    : 'Here\'s your leave request summary and balance'
                                }
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Today is</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {new Date().toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {isAdmin ? <AdminStats stats={stats} /> : <EmployeeStats stats={stats} />}
                </div>

                {/* Recent Activity & Additional Components */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {isAdmin ? <AdminComponents stats={stats} /> : <EmployeeComponents stats={stats} />}
                </div>

            </div>
        </div>
    );
}

function AdminStats({ stats }) {
    const adminStats = [
        {
            title: 'Total Employees',
            value: stats?.total_employees || 0,
            color: 'blue',
            icon: UsersIcon,
            description: 'Active team members'
        },
        {
            title: 'Pending Requests',
            value: stats?.pending_requests || 0,
            color: 'yellow',
            icon: ClockIcon,
            description: 'Awaiting approval'
        },
        {
            title: 'Approved This Month',
            value: stats?.approved_this_month || 0,
            color: 'green',
            icon: CheckCircleIcon,
            description: 'Monthly approvals'
        },
        {
            title: 'Approval Rate',
            value: '78%',
            color: 'purple',
            icon: ArrowTrendingUpIcon,
            description: 'This month'
        }
    ];

    return (
        <>
            {adminStats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
            ))}
        </>
    );
}

function EmployeeStats({ stats }) {
    const employeeStats = [
        {
            title: 'Annual Leave',
            value: stats?.leave_balance?.annual_remaining || 0,
            total: stats?.leave_balance?.annual_allocation || 21,
            color: 'blue',
            icon: CalendarDaysIcon,
            type: 'days'
        },
        {
            title: 'Sick Leave',
            value: stats?.leave_balance?.sick_remaining || 0,
            total: stats?.leave_balance?.sick_allocation || 10,
            color: 'green',
            icon: HeartIcon,
            type: 'days'
        },
        {
            title: 'Study Leave',
            value: stats?.leave_balance?.study_remaining || 0,
            total: stats?.leave_balance?.study_allocation || 5,
            color: 'purple',
            icon: AcademicCapIcon,
            type: 'days'
        },
        {
            title: 'Pending Requests',
            value: stats?.pending_requests || 0,
            color: 'yellow',
            icon: ClockIcon,
            type: 'count'
        }
    ];

    return (
        <>
            {employeeStats.map((stat, index) => (
                <EmployeeStatCard key={index} stat={stat} />
            ))}
        </>
    );
}

function AdminComponents({ stats }) {
    return (
        <>
            {/* Recent Leave Requests */}
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Recent Leave Requests</h3>
                    <span className="text-sm text-blue-600 font-medium">View All</span>
                </div>
                <div className="space-y-4">
                    {stats?.recent_requests?.map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-bold text-sm">
                                        {request.employee_details?.user?.first_name?.[0]}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {request.employee_details?.user?.first_name} {request.employee_details?.user?.last_name}
                                    </p>
                                    <p className="text-sm text-gray-500">{request.leave_type_details?.type}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{request.total_days} days</p>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {request.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
                <div className="space-y-3">
                    <button className="w-full flex items-center space-x-3 p-3 text-left bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                        <UsersIcon className="w-6 h-6 text-blue-600" />
                        <span className="font-medium text-blue-700">Manage Employees</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                        <DocumentTextIcon className="w-6 h-6 text-green-600" />
                        <span className="font-medium text-green-700">Approve Requests</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                        <CalendarDaysIcon className="w-6 h-6 text-purple-600" />
                        <span className="font-medium text-purple-700">View Calendar</span>
                    </button>
                </div>
            </div>
        </>
    );
}

function EmployeeComponents({ stats }) {
    return (
        <>
            {/* My Recent Requests */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">My Recent Requests</h3>
                <div className="space-y-4">
                    <div className="text-center py-8">
                        <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">No recent leave requests</p>
                        <button className="mt-2 text-blue-600 hover:text-blue-700 font-medium">
                            Create New Request
                        </button>
                    </div>
                </div>
            </div>

            {/* Leave Balance Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Balance Summary</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Available Days</span>
                        <span className="font-bold text-lg text-blue-600">
                            {((stats?.leave_balance?.annual_remaining || 0) + 
                              (stats?.leave_balance?.sick_remaining || 0) + 
                              (stats?.leave_balance?.study_remaining || 0))} days
                        </span>
                    </div>
                    <div className="bg-yellow-50 border-yellow-200 rounded-xl p-4">
                        <div className="flex items-center space-x-2">
                            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-800">
                                {stats?.pending_requests || 0} pending requests
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Request */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Need Time Off?</h3>
                <p className="text-blue-100 mb-4">Quickly submit a new leave request</p>
                <button className="w-full bg-white text-blue-600 py-3 px-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                    Request Leave
                </button>
            </div>
        </>
    );
}

function StatCard({ stat }) {
    const Icon = stat.icon;
    const colorClasses = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        purple: 'bg-purple-500'
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    {stat.description && (
                        <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${colorClasses[stat.color]} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
            </div>
        </div>
    );
}

function EmployeeStatCard({ stat }) {
    const Icon = stat.icon;
    const percentage = (stat.value / stat.total) * 100;
    
    const colorClasses = {
        blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-100' },
        green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-100' },
        purple: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-100' },
        yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-100' }
    };

    const colors = colorClasses[stat.color];

    return (
        <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${colors.light}`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                {stat.type === 'days' && (
                    <span className="text-2xl font-bold text-gray-900">
                        {stat.value}<span className="text-sm text-gray-500">/{stat.total}</span>
                    </span>
                )}
                {stat.type === 'count' && (
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                )}
            </div>
            
            <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
            
            {stat.type === 'days' && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        className={`h-2 rounded-full ${colors.bg} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            )}
            
            {stat.type === 'count' && (
                <p className="text-xs text-gray-500">Requests awaiting approval</p>
            )}
        </div>
    );
}

function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    return 'Evening';
}

export default Home;