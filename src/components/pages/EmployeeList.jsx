// import React from 'react'
// import { useEffect, useState } from 'react'
// import { Link } from 'react-router'
// import { authRequest } from '../../lib/auth'
// import axios from 'axios'

// function EmployeeList() {

//     const [employees, setEmployees] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState('')

//     async function getAllEmployees() {
//         try {
//             const response = await authRequest({
//                 method: 'GET',
//                 url: 'http://127.0.0.1:8000/api/employees/'
//             })
//             console.log('✅ Employees data:', response.data)
//             setEmployees(response.data)
//         } catch (err) {
//             console.error('❌ Error fetching employees:', err)
//             setError('faild fetching employees!')
//         } finally {
//             setLoading(false)
//         }
//     }
//     // async function getAllEmployees() {
//     //     try {
//     //         const token = localStorage.getItem('access_token')
//     //         console.log('🔐 Token:', token) // تحقق من وجود token
            
//     //         const response = await axios.get('http://127.0.0.1:8000/api/employees/', {
//     //             headers: {
//     //                 'Authorization': `Bearer ${token}`
//     //             }
//     //         })
//     //         console.log('✅ Employees data:', response.data)
//     //         setEmployees(response.data)
//     //     } catch (err) {
//     //         console.error('❌ Error fetching employees:', err.response?.data || err.message)
//     //         setError('Failed to load employees - Check if you have admin permissions')
//     //     } finally {
//     //         setLoading(false)
//     //     }
//     // }
//     useEffect(() => {
//         getAllEmployees()
//     }, [])

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center p-8">
//                 <div>loading...</div>
//             </div>
//         )
//     }

//     if (error) {
//         return (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//                 {error}
//             </div>
//         )
//     }

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-6">All Employees</h1>
            
//             {employees.length ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {employees.map((employee) => (
//                         <Link 
//                             key={employee.id} 
//                             to={`/employees/${employee.id}`}
//                             className="block bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
//                         >
//                             <div className="flex items-center space-x-3">
//                                 <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
//                                     {employee.user?.first_name?.[0] || 'E'}
//                                 </div>
//                                 <div>
//                                     <h3 className="font-semibold text-gray-800">
//                                         {employee.user?.first_name} {employee.user?.last_name}
//                                     </h3>
//                                     <p className="text-sm text-gray-600">{employee.job_title}</p>
//                                     <p className="text-xs text-gray-500">{employee.department}</p>
//                                     <p className="text-xs text-blue-600">{employee.role}</p>
//                                 </div>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="text-center py-8">
//                     <h2 className="text-xl text-gray-500">No Employees</h2>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default EmployeeList


import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { authRequest, getUserFromToken } from '../../lib/auth'
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

function EmployeeList() {
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [currentUserRole, setCurrentUserRole] = useState('')
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false, 
        employee: null 
    })

    async function getCurrentUserEmployeeData() {
        try {
            const user = getUserFromToken()
            if (!user || !user.user_id) {
                setError('User not found')
                setLoading(false)
                return null
            }

            const response = await authRequest({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/employees/'
            })
            
            // search current user employee Data
            const currentEmployee = response.data.find(
                emp => emp.user.id === parseInt(user.user_id)
            )
            
            console.log('👤 Current employee data:', currentEmployee)
            return currentEmployee
            
        } catch (err) {
            console.error('Error fetching employee data:', err)
            return null
        }
    }

    // check Permissions (admin role is allowed..)
    async function checkPermissionsAndLoad() {
        try {
            // TODO:
            // 1. get current user employee Data
            const currentEmployee = await getCurrentUserEmployeeData()
            
            if (!currentEmployee) {
                setError('Employee data not found')
                setLoading(false)
                return
            }

            // 2. validate Permissions
            if (currentEmployee.role !== 'admin') {
                setError('Access denied: Admin permissions required. Your role: ' + currentEmployee.role)
                setLoading(false)
                return
            }

            setCurrentUserRole(currentEmployee.role)
            
            // 3. List all employees (if `user role = admin`)
            await getAllEmployees()
            
        } catch (err) {
            console.error('Error in permission check:', err)
            setError('Failed to verify permissions')
            setLoading(false)
        }
    }

    async function getAllEmployees() {
        try {
            const response = await authRequest({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/employees/'
            })
            console.log('✅ Employees data:', response.data)
            setEmployees(response.data)
        } catch (err) {
            console.error('❌ Error fetching employees:', err.response?.data || err.message)
            setError('Failed to load employees: ' + (err.response?.data?.detail || 'Unknown error'))
        } finally {
            setLoading(false)
        }
    }

    async function handleDeleteEmployee() {
        if (!deleteModal.employee) return
        
        try {
            await authRequest({
                method: 'DELETE',
                url: `http://127.0.0.1:8000/api/employees/${deleteModal.employee.id}/`
            })

            // إغلاق المودال وإعادة تحميل البيانات
            setDeleteModal({ isOpen: false, employee: null })
            getAllEmployees()
            
        } catch (err) {
            console.error('Error deleting employee:', err)
            alert('Failed to delete employee: ' + (err.response?.data?.error || err.message))
        }
    }

    function canDeleteEmployee(employee) {
        // الادمن يستطيع حذف أي موظف ما عدا نفسه
        const currentUser = getUserFromToken()
        return currentUserRole === 'admin' && employee.user.id !== parseInt(currentUser.user_id)
    }

    function canUpdateEmployee(employee) {
        // الادمن يستطيع تحديث أي موظف
        return currentUserRole === 'admin'
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
                            Delete Employee
                        </h3>
                        
                        <p className="mt-2 text-sm text-gray-500 text-center">
                            Are you sure you want to delete this employee? This action cannot be undone.
                        </p>

                        {deleteModal.employee && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium">
                                    {deleteModal.employee.user.first_name} {deleteModal.employee.user.last_name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {deleteModal.employee.job_title} - {deleteModal.employee.department}
                                </p>
                                <p className="text-xs text-blue-600">{deleteModal.employee.role}</p>
                            </div>
                        )}

                        <div className="mt-6 flex justify-center space-x-3">
                            <button
                                onClick={() => setDeleteModal({ isOpen: false, employee: null })}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteEmployee}
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
        checkPermissionsAndLoad()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div>Checking admin permissions...</div>
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
                    <h1 className="text-2xl font-bold">All Employees</h1>
                    <p className="text-gray-600">Logged in as: {currentUserRole}</p>
                </div>
                <Link 
                    to="/employees/new"
                    className="bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add New Employee
                </Link>
            </div>
            
            {employees.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {employees.map((employee) => (
                        <div 
                            key={employee.id} 
                            className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {employee.user.first_name?.[0] || employee.user.username?.[0] || 'E'}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">
                                        {employee.user.first_name} {employee.user.last_name}
                                    </h3>
                                    <p className="text-sm text-gray-600">{employee.job_title}</p>
                                    <p className="text-xs text-gray-500">{employee.department}</p>
                                    <p className="text-xs text-blue-600">{employee.role}</p>
                                </div>
                            </div>
                            
                            {/* Actions Icons */}
                            <div className="flex justify-around space-x-2 pt-3 border-t border-gray-100">
                                {/* View Button */}
                                <Link
                                    to={`/employees/${employee.id}`}
                                    className="text-blue-600 hover:text-blue-900 hover:bg-blue-200 transition-colors duration-200 p-1 rounded-full"
                                    title="View Details"
                                >
                                    <EyeIcon className="w-5 h-5" />
                                </Link>
                                
                                {/* Update Button */}
                                {canUpdateEmployee(employee) && (
                                    <Link
                                        to={`/employees/${employee.id}/edit`}
                                        className="text-green-600 hover:text-green-900 hover:bg-green-200 transition-colors duration-200 p-1 rounded-full"
                                        title="Edit Employee"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </Link>
                                )}
                                
                                {/* Delete Button */}
                                {canDeleteEmployee(employee) && (
                                    <button
                                        onClick={() => setDeleteModal({ isOpen: true, employee })}
                                        className="text-red-600 hover:text-red-900 hover:bg-red-200 transition-colors duration-200 p-1 rounded-full"
                                        title="Delete Employee"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <h2 className="text-xl text-gray-500">No Employees Found</h2>
                </div>
            )}
        </div>
    )
}

export default EmployeeList