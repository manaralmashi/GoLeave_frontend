import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { authRequest } from '../../lib/auth'

function EmployeeDetail() {
    const [employee, setEmployee] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { employeeId } = useParams()

    async function getEmployeeDetail() {
        try {
            const response = await authRequest({
                method: 'GET',
                url: `http://127.0.0.1:8000/api/employees/${employeeId}/`
            })
            console.log('Employee detail:', response.data)
            setEmployee(response.data)
        } catch (err) {
            console.error('Error fetching employee:', err)
            setError('Failed to load employee details')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getEmployeeDetail()
    }, [employeeId])

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div>Loading employee details...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        )
    }

    if (!employee) {
        return (
            <div className="text-center py-8">
                <h2>Employee not found</h2>
            </div>
        )
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <Link to="/employees" className="text-blue-600 hover:text-blue-800">
                    ← Back to Employees
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {employee.user?.first_name?.[0] || 'E'}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">
                            {employee.user?.first_name} {employee.user?.last_name}
                        </h1>
                        <p className="text-gray-600">{employee.job_title}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* User Information */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">User Information</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm text-gray-500">Username</label>
                                <p className="font-medium">{employee.user?.username}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Email</label>
                                <p className="font-medium">{employee.user?.email}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">First Name</label>
                                <p className="font-medium">{employee.user?.first_name}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Last Name</label>
                                <p className="font-medium">{employee.user?.last_name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Employee Information */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Employee Information</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm text-gray-500">Job Title</label>
                                <p className="font-medium">{employee.job_title}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Department</label>
                                <p className="font-medium">{employee.department}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Role</label>
                                <p className="font-medium">{employee.role}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Hire Date</label>
                                <p className="font-medium">
                                    {employee.hire_date ? new Date(employee.hire_date).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex space-x-4">
                    <Link 
                        to={`/employees/${employee.id}/edit`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Edit Employee
                    </Link>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" disabled>
                        View Leave History (latteerr)
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetail