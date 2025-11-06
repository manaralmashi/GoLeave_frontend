import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { authRequest, getUserFromToken } from '../../lib/auth'
import {
    EyeIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowPathIcon,
    TrashIcon
} from '@heroicons/react/24/outline'

function LeaveRequestList() {
    const [leaveRequests, setLeaveRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [currentUserRole, setCurrentUserRole] = useState('')
    const [currentEmployeeId, setCurrentEmployeeId] = useState('')
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        request: null
    })

    async function getCurrentUserData() {
        try {
            const user = getUserFromToken()
            if (!user || !user.user_id) return null

            console.log('🔐 Current user ID:', user.user_id)

            try {
                const employeesResponse = await authRequest({
                    method: 'GET',
                    url: 'http://127.0.0.1:8000/api/employees/'
                })

                console.log('👥 All employees:', employeesResponse.data)

                const currentEmployee = employeesResponse.data.find(emp =>
                    emp.user && emp.user.id === parseInt(user.user_id)
                )

                if (currentEmployee) {
                    console.log('✅ Found employee data:', currentEmployee)

                    const userRole = currentEmployee.role // 'admin' أو 'employee'

                    setCurrentUserRole(userRole)
                    setCurrentEmployeeId(currentEmployee.id)

                    return {
                        role: userRole,
                        id: currentEmployee.id,
                        employeeData: currentEmployee
                    }
                }

                console.log('⚠️ User has no employee data, assuming employee role')
                setCurrentUserRole('employee')
                setCurrentEmployeeId(user.user_id)
                return { role: 'employee', id: user.user_id }

            } catch (employeesErr) {
                console.error('Error fetching employees:', employeesErr)
                // default 'role= employee'
                setCurrentUserRole('employee')
                setCurrentEmployeeId(user.user_id)
                return { role: 'employee', id: user.user_id }
            }

        } catch (err) {
            console.error('Error in getCurrentUserData:', err)
            const user = getUserFromToken()
            setCurrentUserRole('employee')
            setCurrentEmployeeId(user?.user_id || '')
            return { role: 'employee', id: user?.user_id || '' }
        }
    }

    async function loadLeaveRequests() {
        try {
            const currentEmployee = await getCurrentUserData()

            if (!currentEmployee) {
                setError('User data not found')
                setLoading(false)
                return
            }

            console.log('👤 Current user role:', currentEmployee.role)
            console.log('👤 Current employee ID:', currentEmployee.id)

            // get all leave requests
            const response = await authRequest({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/leave-requests/'
            })

            console.log('📋 All leave requests:', response.data)

            const filteredRequests = currentEmployee.role === 'admin'
                ? response.data
                : response.data.filter(request =>
                    request.employee && request.employee.toString() === currentEmployee.id.toString()
                )

            console.log('🎯 Filtered requests:', filteredRequests)
            setLeaveRequests(filteredRequests)

        } catch (err) {
            console.error('Error fetching leave requests:', err)
            setError('Failed to load leave requests: ' + (err.response?.data?.detail || err.message))
        } finally {
            setLoading(false)
        }
    }

    async function handleStatusUpdate(requestId, newStatus) {
        try {
            // check balance before approve
            // if (newStatus === 'approve') {
            //     const request = leaveRequests.find(r => r.id === requestId);
            //     if (request) {
            //         const totalDays = request.total_days;

            //         // get balance for current employee
            //         try {
            //             const balanceResponse = await authRequest({
            //                 method: 'GET',
            //                 url: `http://127.0.0.1:8000/api/employees/${request.employee}/leave-balance/`
            //             });

            //             const remainingDays = balanceResponse.data.remaining_days;

            //             if (totalDays > remainingDays) {
            //                 alert(`Cannot approve: Employee has only ${remainingDays} days remaining, but requested ${totalDays} days`);
            //                 return;
            //             }

            //         } catch (balanceErr) {
            //             console.error('Error checking leave balance:', balanceErr);
            //             // warning and continue
            //             if (!confirm(`Warning: Could not verify leave balance. Approve ${totalDays} days request?`)) {
            //                 return;
            //             }
            //         }
            //     }
            // }

            let endpoint = '';

            switch (newStatus) {
                case 'approve':
                    endpoint = `${requestId}/approve/`;
                    break;
                case 'reject':
                    endpoint = `${requestId}/reject/`;
                    break;
                case 'pending':
                    endpoint = `${requestId}/pending/`;
                    break;
                default:
                    return;
            }

            await authRequest({
                method: 'PATCH',
                url: `http://127.0.0.1:8000/api/leave-requests/${endpoint}`,
                data: { note: 'Status updated via dashboard' }
            });

            loadLeaveRequests();

        } catch (err) {
            console.error('Error updating status:', err);

            if (err.response?.status === 500) {
                alert('Server error: Cannot approve request. This may be due to insufficient leave balance.');
            } else {
                alert('Failed to update request status: ' + (err.response?.data?.error || err.message));
            }
        }
    }

    async function handleDeleteRequest() {
        if (!deleteModal.request) return

        try {
            await authRequest({
                method: 'DELETE',
                url: `http://127.0.0.1:8000/api/leave-requests/${deleteModal.request.id}/delete/`
            })

            // close modal
            setDeleteModal({ isOpen: false, request: null })
            loadLeaveRequests()

        } catch (err) {
            console.error('Error deleting leave request:', err)
            alert('Failed to delete leave request: ' + (err.response?.data?.error || err.message))
        }
    }

    function canDeleteRequest(request) {
        // admin -> can delete any req
        if (currentUserRole === 'admin') return true

        // employee -> can delete Only her req
        return request.employee && request.employee.toString() === currentEmployeeId.toString()
    }

    function canUpdateStatus(request) {
        // admin -> can update the status of any req
        return currentUserRole === 'admin' && request.status === 'pending'
    }

    function getStatusBadge(status) {
        if (!status) {
            return (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200 flex items-center gap-1 w-fit">
                    <ArrowPathIcon className="w-3 h-3" />
                    Pending
                </span>
            )
        }

        const statusStyles = {
            pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
            approved: 'bg-green-100 text-green-800 border border-green-200',
            rejected: 'bg-red-100 text-red-800 border border-red-200'
        }

        const statusIcons = {
            pending: <ArrowPathIcon className="w-3 h-3" />,
            approved: <CheckCircleIcon className="w-3 h-3" />,
            rejected: <XCircleIcon className="w-3 h-3" />
        }

        const statusText = {
            pending: 'Pending',
            approved: 'Approved',
            rejected: 'Rejected'
        }

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'} flex items-center gap-1 w-fit`}>
                {statusIcons[status]}
                {statusText[status] || status}
            </span>
        )
    }

    function getEmployeeName(request) {
        if (request.employee_details) {
            return `${request.employee_details.user?.first_name} ${request.employee_details.user?.last_name}`
        }
        return 'Unknown Employee'
    }

    function getLeaveTypeDisplay(request) {
        if (request.leave_type_details && request.leave_type_details.type) {
            return request.leave_type_details.type
        }
        return 'Unknown Type'
    }

    // Delete Confirmation Modal
    function DeleteConfirmationModal() {
        if (!deleteModal.isOpen) return null

        return (
            <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                    <div className="p-6">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>

                        <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">
                            Delete Leave Request
                        </h3>

                        <p className="mt-2 text-sm text-gray-500 text-center">
                            Are you sure you want to delete this leave request? This action cannot be undone.
                        </p>

                        {deleteModal.request && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium">
                                    {getEmployeeName(deleteModal.request)} - {getLeaveTypeDisplay(deleteModal.request)}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {new Date(deleteModal.request.start_date).toLocaleDateString()} to {new Date(deleteModal.request.end_date).toLocaleDateString()}
                                </p>
                            </div>
                        )}

                        <div className="mt-6 flex justify-center space-x-3">
                            <button
                                onClick={() => setDeleteModal({ isOpen: false, request: null })}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteRequest}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        console.log('🚀 Initializing LeaveRequestList...')
        loadLeaveRequests()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div>Loading leave requests...</div>
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

    return (
        <div className="p-6">
            <DeleteConfirmationModal />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Leave Requests</h1>
                    <p className="text-gray-600">
                        {currentUserRole === 'admin' ? 'All Employee Requests' : 'My Leave Requests'}
                        {currentUserRole === 'admin' && ` (${leaveRequests.length} requests)`}
                    </p>
                </div>
                {currentUserRole === 'employee' && (
                    <Link
                        to="/leave-requests/new"
                        className="bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        New Leave Request
                    </Link>
                )}
            </div>

            {/* Statistics */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-8">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold text-blue-600">{leaveRequests.length}</div>
                    <div className="text-sm text-gray-600">Total Requests</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                        {leaveRequests.filter(r => !r.status || r.status === 'pending').length}
                    </div>
                    <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold text-green-600">
                        {leaveRequests.filter(r => r.status === 'approved').length}
                    </div>
                    <div className="text-sm text-gray-600">Approved</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold text-red-600">
                        {leaveRequests.filter(r => r.status === 'rejected').length}
                    </div>
                    <div className="text-sm text-gray-600">Rejected</div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                {currentUserRole === 'admin' && (
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Employee
                                    </th>
                                )}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Leave Type
                                </th>
                                {/* {currentUserRole === 'admin' && (
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Balance
                                    </th>
                                )} */}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Period
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Days
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Reason
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {leaveRequests.map((request) => (
                                <tr key={request.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        #{request.id}
                                    </td>
                                    {currentUserRole === 'admin' && (
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {getEmployeeName(request)}
                                            </div>
                                        </td>
                                    )}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {getLeaveTypeDisplay(request)}
                                        </div>
                                        {request.is_outside_country && (
                                            <div className="text-xs text-blue-600">🌍 Outside Country</div>
                                        )}
                                    </td>
                                    {/* {currentUserRole === 'admin' && (
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {request.employee_details?.remaining_leave_days || 'N/A'} days
                                            </div>
                                            {request.total_days > (request.employee_details?.remaining_leave_days || 0) && (
                                                <div className="text-xs text-red-600">⚠️ Insufficient balance</div>
                                            )}
                                        </td>
                                    )} */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {new Date(request.start_date).toLocaleDateString()}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            to {new Date(request.end_date).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {request.total_days} days
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 max-w-xs truncate" title={request.reason}>
                                            {request.reason}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(request.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(request.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            {/* View Details Button */}
                                            <Link
                                                to={`/leave-requests/${request.id}`}
                                                className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                                title="View Details"
                                            >
                                                <EyeIcon className="w-5 h-5" />
                                            </Link>

                                            {/* Status Update Buttons (Admin only for pending requests) */}
                                            {canUpdateStatus(request) && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(request.id, 'approve')}
                                                        className="text-green-600 hover:text-green-900 transition-colors duration-200"
                                                        title="Approve Request"
                                                    >
                                                        <CheckCircleIcon className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(request.id, 'reject')}
                                                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                                        title="Reject Request"
                                                    >
                                                        <XCircleIcon className="w-5 h-5" />
                                                    </button>
                                                </>
                                            )}

                                            {/* Reset to Pending Button (Admin only for non-pending requests) */}
                                            {currentUserRole === 'admin' && request.status !== 'pending' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(request.id, 'pending')}
                                                    className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200"
                                                    title="Reset to Pending"
                                                >
                                                    <ArrowPathIcon className="w-5 h-5" />
                                                </button>
                                            )}

                                            {/* Delete Button */}
                                            {canDeleteRequest(request) && (
                                                <button
                                                    onClick={() => setDeleteModal({ isOpen: true, request })}
                                                    className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                                    title="Delete Request"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {leaveRequests.length === 0 && (
                    <div className="text-center py-8">
                        <div className="text-gray-500">No leave requests found</div>
                        <Link
                            to="/leave-requests/new"
                            className="inline-block mt-2 text-blue-600 hover:text-blue-800"
                        >
                            Create your first leave request
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LeaveRequestList