import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { authRequest } from '../../lib/auth'

function LeaveRequestDetail() {
    const { leaveRequestsId } = useParams()
    const navigate = useNavigate()
    const [request, setRequest] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [currentUserRole, setCurrentUserRole] = useState('')

    async function getCurrentUserRole() {
        try {
            const userResponse = await authRequest({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/employees/'
            })
            const user = JSON.parse(atob(localStorage.getItem('access_token').split('.')[1]))
            const currentEmployee = userResponse.data.find(emp => emp.user.id === parseInt(user.user_id))
            setCurrentUserRole(currentEmployee?.role || '')
            return currentEmployee?.role
        } catch (err) {
            console.error('Error fetching user role:', err)
            return ''
        }
    }

    async function getLeaveRequestDetail() {
        try {
            const response = await authRequest({
                method: 'GET',
                url: `http://127.0.0.1:8000/api/leave-requests/${leaveRequestsId}/`
            })
            console.log('Leave request detail:', response.data)
            setRequest(response.data)
        } catch (err) {
            console.error('Error fetching leave request:', err)
            setError('Failed to load leave request details')
        } finally {
            setLoading(false)
        }
    }

    async function handleStatusUpdate(newStatus) {
        try {
            let endpoint = ''
            switch(newStatus) {
                case 'approved':
                    endpoint = `approve/${leaveRequestsId}/`
                    break
                case 'rejected':
                    endpoint = `reject/${leaveRequestsId}/`
                    break
                case 'pending':
                    endpoint = `pending/${leaveRequestsId}/`
                    break
                default:
                    return
            }

            await authRequest({
                method: 'PATCH',
                url: `http://127.0.0.1:8000/api/leave-requests/${endpoint}`,
                data: { note: 'Status updated from detail page' }
            })

            getLeaveRequestDetail()
            
        } catch (err) {
            console.error('Error updating status:', err)
            alert('Failed to update request status')
        }
    }

    function getStatusBadge(status) {
        const statusStyles = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            approved: 'bg-green-100 text-green-800 border-green-200',
            rejected: 'bg-red-100 text-red-800 border-red-200'
        }
        
        const statusText = {
            pending: '⏳ Pending',
            approved: '✅ Approved', 
            rejected: '❌ Rejected'
        }
        
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
                {statusText[status] || status}
            </span>
        )
    }

    useEffect(() => {
        async function initialize() {
            await getCurrentUserRole()
            await getLeaveRequestDetail()
        }
        initialize()
    }, [leaveRequestsId])

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div>Loading leave request details...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-6">
                {error}
            </div>
        )
    }

    if (!request) {
        return (
            <div className="text-center py-8">
                <h2>Leave request not found</h2>
                <Link to="/leave-requests" className="text-blue-600 hover:text-blue-800">
                    Back to Leave Requests
                </Link>
            </div>
        )
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <button 
                    onClick={() => navigate('/leave-requests')}
                    className="text-blue-600 hover:text-blue-800"
                >
                    ← Back to Leave Requests
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 border-b">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold">Leave Request Details</h1>
                            <div className="flex items-center space-x-4 mt-2">
                                {getStatusBadge(request.status)}
                                {/* {request.is_warning_displayed && (
                                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium border border-orange-200">
                                        ⚠️ Has Warnings
                                    </span>
                                )} */}
                                {request.is_outside_country && (
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                                        🌍 Outside Country
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        {currentUserRole === 'admin' && (
                            <div className="flex space-x-2">
                                {request.status === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => handleStatusUpdate('approved')}
                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate('rejected')}
                                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                {request.status !== 'pending' && (
                                    <button
                                        onClick={() => handleStatusUpdate('pending')}
                                        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                                    >
                                        Reset to Pending
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column - Basic Info */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold mb-4">Request Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Employee</label>
                                        <p className="font-medium">
                                            {request.employee_details?.user?.first_name} {request.employee_details?.user?.last_name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {request.employee_details?.job_title} - {request.employee_details?.department}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Leave Type</label>
                                        <p className="font-medium">
                                            {request.leave_type_details?.type || request.leave_type_details}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Period</label>
                                        <p className="font-medium">
                                            {new Date(request.start_date).toLocaleDateString()} to {new Date(request.end_date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Total Days</label>
                                        <p className="font-medium text-blue-600">{request.total_days} days</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Details */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold mb-4">Request Details</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Reason</label>
                                        <p className="mt-1 p-3 bg-gray-50 rounded-lg whitespace-pre-wrap">
                                            {request.reason}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Created Date</label>
                                        <p className="font-medium">
                                            {new Date(request.created_at).toLocaleString()}
                                        </p>
                                    </div>

                                    {/* {request.warning_message && (
                                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                            <label className="text-sm font-medium text-orange-800">Warning</label>
                                            <p className="mt-1 text-orange-700">{request.warning_message}</p>
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 pt-6 border-t border-gray-200 flex space-x-4">
                        <Link
                            to={`/leave-requests/${request.id}/edit`}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Edit Request
                        </Link>
                        <button
                            onClick={() => navigate('/leave-requests')}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Back to List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaveRequestDetail