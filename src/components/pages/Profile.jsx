import React from 'react'
import { useEffect, useState } from 'react'
import { authRequest, getUserFromToken, getCurrentEmployeeData } from '../../lib/auth'
import {
    UserIcon,
    IdentificationIcon,
    BriefcaseIcon,
    CalendarIcon,
    ChartBarIcon,
    ClockIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon
} from '@heroicons/react/24/outline'

function Profile() {
    const [userData, setUserData] = useState(null)
    const [employeeData, setEmployeeData] = useState(null)
    const [leaveBalance, setLeaveBalance] = useState(null)
    const [leaveStats, setLeaveStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // get user & employee data
    async function loadProfileData() {
        try {
            const tokenUser = getUserFromToken()
            if (!tokenUser) {
                setError('User not found')
                setLoading(false)
                return
            }

            // get user data
            try {
                const userResponse = await authRequest({
                    method: 'GET',
                    url: `http://127.0.0.1:8000/api/users/${tokenUser.user_id}/`
                })
                setUserData(userResponse.data)
            } catch (userErr) {
                console.error('Error loading user data:', userErr)
                setUserData({
                    id: tokenUser.user_id,
                    username: tokenUser.username,
                    email: tokenUser.email,
                    first_name: tokenUser.first_name,
                    last_name: tokenUser.last_name,
                    date_joined: tokenUser.date_joined,
                    is_active: true
                })
            }

            // get employee data
            try {
                const employee = await getCurrentEmployeeData()
                if (employee) {
                    setEmployeeData(employee)
                    await loadLeaveBalance(employee.id)
                    await loadLeaveStats(employee.id)
                } else {
                    console.log('No employee data found - user might be admin only')
                }
            } catch (employeeErr) {
                console.log('User does not have employee data (likely admin)')
            }

        } catch (err) {
            console.error('Error loading profile data:', err)
            setError('Failed to load profile data')
        } finally {
            setLoading(false)
        }
    }

    // get leave balances data (for employee)
    async function loadLeaveBalance(employeeId) {
        try {
            const response = await authRequest({
                method: 'GET',
                url: `http://127.0.0.1:8000/api/leave-balances/${employeeId}/`
            })
            setLeaveBalance(response.data)
        } catch (err) {
            console.error('Error loading leave balance:', err)
        }
    }

    // get statistic data (for employee)
    async function loadLeaveStats(employeeId) {
        try {
            const response = await authRequest({
                method: 'GET',
                url: `http://127.0.0.1:8000/api/leave-requests/`
            })
            
            const employeeRequests = response.data.filter(
                request => request.employee === employeeId
            )
            
            const stats = {
                total: employeeRequests.length,
                approved: employeeRequests.filter(r => r.status === 'approved').length,
                pending: employeeRequests.filter(r => r.status === 'pending').length,
                rejected: employeeRequests.filter(r => r.status === 'rejected').length
            }
            
            setLeaveStats(stats)
        } catch (err) {
            console.error('Error loading leave stats:', err)
        }
    }

    useEffect(() => {
        loadProfileData()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded max-w-md">
                    <p className="font-semibold">Error</p>
                    <p>{error}</p>
                </div>
            </div>
        )
    }

    if (!userData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <UserIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700">No Profile Found</h2>
                    <p className="text-gray-500 mt-2">Unable to load user profile</p>
                </div>
            </div>
        )
    }

    const hasEmployeeData = !!employeeData
    const displayName = `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.username

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                                {(userData.first_name?.[0] || userData.username?.[0] || 'U').toUpperCase()}
                            </div>
                        </div>
                        
                        {/* Basic Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {displayName}
                            </h1>
                            <p className="text-xl text-blue-600 font-semibold mt-2">
                                {hasEmployeeData ? employeeData.job_title : 'Administrator'}
                            </p>
                            <p className="text-gray-600 mt-1">
                                {hasEmployeeData ? `${employeeData.department} Department` : 'System Administration'}
                            </p>
                            
                            <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                                <div className="flex items-center text-sm text-gray-500">
                                    <IdentificationIcon className="w-4 h-4 mr-2" />
                                    <span>User ID: {userData.id}</span>
                                </div>
                                {hasEmployeeData && (
                                    <div className="flex items-center text-sm text-gray-500">
                                        <IdentificationIcon className="w-4 h-4 mr-2" />
                                        <span>Employee ID: {employeeData.id}</span>
                                    </div>
                                )}
                                <div className="flex items-center text-sm text-gray-500">
                                    <BriefcaseIcon className="w-4 h-4 mr-2" />
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        hasEmployeeData && employeeData.role === 'admin' 
                                            ? 'bg-purple-100 text-purple-800' 
                                            : hasEmployeeData
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {hasEmployeeData ? (employeeData.role?.toUpperCase() || 'USER') : 'ADMIN'}
                                    </span>
                                </div>
                                {hasEmployeeData && employeeData.hire_date && (
                                    <div className="flex items-center text-sm text-gray-500">
                                        <CalendarIcon className="w-4 h-4 mr-2" />
                                        <span>Joined {new Date(employeeData.hire_date).toLocaleDateString()}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column - Personal Info */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Contact Information */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                <UserIcon className="w-5 h-5 mr-2 text-blue-600" />
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoCard 
                                    icon={EnvelopeIcon}
                                    label="Email"
                                    value={userData.email}
                                />
                                <InfoCard 
                                    icon={UserIcon}
                                    label="Username"
                                    value={userData.username}
                                />
                                {userData.first_name && (
                                    <InfoCard 
                                        icon={UserIcon}
                                        label="First Name"
                                        value={userData.first_name}
                                    />
                                )}
                                {userData.last_name && (
                                    <InfoCard 
                                        icon={UserIcon}
                                        label="Last Name"
                                        value={userData.last_name}
                                    />
                                )}
                                <InfoCard 
                                    icon={CalendarIcon}
                                    label="Member Since"
                                    value={new Date(userData.date_joined).toLocaleDateString()}
                                />
                                <InfoCard 
                                    icon={ClockIcon}
                                    label="Account Status"
                                    value={
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            userData.is_active 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {userData.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    }
                                />
                            </div>
                        </div>

                        {/* Employment Details */}
                        {hasEmployeeData && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                    <BriefcaseIcon className="w-5 h-5 mr-2 text-green-600" />
                                    Employment Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InfoCard 
                                        icon={BriefcaseIcon}
                                        label="Job Title"
                                        value={employeeData.job_title}
                                    />
                                    <InfoCard 
                                        icon={MapPinIcon}
                                        label="Department"
                                        value={employeeData.department}
                                    />
                                    <InfoCard 
                                        icon={IdentificationIcon}
                                        label="Employee ID"
                                        value={employeeData.id}
                                    />
                                    {employeeData.hire_date && (
                                        <InfoCard 
                                            icon={CalendarIcon}
                                            label="Hire Date"
                                            value={new Date(employeeData.hire_date).toLocaleDateString()}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Stats */}
                    <div className="space-y-8">
                        
                        {/* Leave Balance - for emplyee */}
                        {hasEmployeeData && leaveBalance && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                    <ChartBarIcon className="w-5 h-5 mr-2 text-orange-600" />
                                    Leave Balance
                                </h2>
                                <div className="space-y-4">
                                    <StatCard 
                                        label="Remaining Days"
                                        value={leaveBalance.remaining_days || 0}
                                        color="text-green-600"
                                        icon={CalendarIcon}
                                    />
                                    <StatCard 
                                        label="Total Used"
                                        value={leaveBalance.total_days_taken || 0}
                                        color="text-blue-600"
                                        icon={ClockIcon}
                                    />
                                    <StatCard 
                                        label="Annual Allocation"
                                        value={leaveBalance.annual_allocation || 0}
                                        color="text-purple-600"
                                        icon={ChartBarIcon}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Leave Statistics - for employee */}
                        {hasEmployeeData && leaveStats && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                    <ChartBarIcon className="w-5 h-5 mr-2 text-indigo-600" />
                                    Leave Statistics
                                </h2>
                                <div className="space-y-4">
                                    <StatCard 
                                        label="Total Requests"
                                        value={leaveStats.total}
                                        color="text-gray-600"
                                    />
                                    <StatCard 
                                        label="Approved"
                                        value={leaveStats.approved}
                                        color="text-green-600"
                                    />
                                    <StatCard 
                                        label="Pending"
                                        value={leaveStats.pending}
                                        color="text-yellow-600"
                                    />
                                    <StatCard 
                                        label="Rejected"
                                        value={leaveStats.rejected}
                                        color="text-red-600"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Quick Stats */}
                        <div className={`rounded-2xl shadow-lg p-6 text-white bg-gradient-to-br from-blue-500 to-purple-600`}>
                            <h3 className="text-lg font-semibold mb-4">Profile Summary</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="opacity-90">User Type</span>
                                    <span className="font-semibold">
                                        {hasEmployeeData ? 'Employee' : 'Administrator'}
                                    </span>
                                </div>
                                {hasEmployeeData && employeeData.hire_date && (
                                    <div className="flex justify-between items-center">
                                        <span className="opacity-90">Employee Since</span>
                                        <span className="font-semibold">
                                            {new Date(employeeData.hire_date).getFullYear()}
                                        </span>
                                    </div>
                                )}
                                {hasEmployeeData && (
                                    <div className="flex justify-between items-center">
                                        <span className="opacity-90">Department</span>
                                        <span className="font-semibold">{employeeData.department}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <span className="opacity-90">Role</span>
                                    <span className="font-semibold capitalize">
                                        {hasEmployeeData ? (employeeData.role || 'employee') : 'admin'}
                                    </span>
                                </div>
                                {hasEmployeeData && leaveBalance && (
                                    <div className="flex justify-between items-center">
                                        <span className="opacity-90">Available Leave</span>
                                        <span className="font-semibold">
                                            {leaveBalance.remaining_days || 0} days
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// component for display info
function InfoCard({ icon: Icon, label, value }) {
    return (
        <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
                <Icon className="w-5 h-5 text-gray-400 mt-0.5" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="text-base text-gray-900 mt-1">{value}</p>
            </div>
        </div>
    )
}

// component for display statistic
function StatCard({ label, value, color, icon: Icon }) {
    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
                {Icon && <Icon className={`w-4 h-4 ${color}`} />}
                <span className="text-sm font-medium text-gray-600">{label}</span>
            </div>
            <span className={`text-lg font-bold ${color}`}>{value}</span>
        </div>
    )
}

export default Profile