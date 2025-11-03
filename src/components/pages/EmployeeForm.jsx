import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authRequest } from '../../lib/auth'

function EmployeeForm() {
    const navigate = useNavigate()
    const { employeeId } = useParams()
    
    const [formData, setFormData] = useState({
        // User fields
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        // Employee fields
        job_title: '',
        department: '',
        role: 'employee',
        hire_date: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Get employee data for editing
    async function getEmployee() {
        try {
            const response = await authRequest({
                method: 'GET',
                url: `http://127.0.0.1:8000/api/employees/${employeeId}/`
            })
            const employee = response.data
            setFormData({
                username: employee.user?.username || '',
                email: employee.user?.email || '',
                first_name: employee.user?.first_name || '',
                last_name: employee.user?.last_name || '',
                password: '', // Don't pre-fill password
                job_title: employee.job_title || '',
                department: employee.department || '',
                role: employee.role || 'employee',
                hire_date: employee.hire_date || ''
            })
        } catch (err) {
            console.error('Error fetching employee:', err)
            setError('Failed to load employee data')
        }
    }

    useEffect(() => {
        if (employeeId) {
            getEmployee()
        }
    }, [employeeId])

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        setError('')

        try {
            let response = {}
            
            if (employeeId) {
                // Update existing employee
                response = await authRequest({
                    method: 'PUT',
                    url: `http://127.0.0.1:8000/api/employees/${employeeId}/`,
                    data: formData
                })
            } else {
                // Create new employee
                response = await authRequest({
                    method: 'POST',
                    url: 'http://127.0.0.1:8000/api/employees/',
                    data: formData
                })
            }

            console.log('Employee saved:', response.data)
            
            if (response.status === 201 || response.status === 200) {
                navigate(`/employees/${response.data.id}`)
            }
        } catch (err) {
            console.error('Error saving employee:', err)
            setError(err.response?.data?.error || 'Failed to save employee')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <button 
                    onClick={() => navigate('/employees')}
                    className="text-blue-600 hover:text-blue-800"
                >
                    ← Back to Employees
                </button>
            </div>

            <h1 className="text-2xl font-bold mb-6">
                {employeeId ? 'Edit Employee' : 'Add New Employee'}
            </h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* User Information */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">User Information</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Username *
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password {employeeId ? '(leave blank to keep current)' : '*'}
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required={!employeeId}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Employee Information */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Employee Information</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Job Title *
                                </label>
                                <input
                                    type="text"
                                    name="job_title"
                                    value={formData.job_title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Department *
                                </label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Department</option>
                                    <option value="HR">Human Resources</option>
                                    <option value="MKT">Marketing</option>
                                    <option value="R&D">Research & Development</option>
                                    <option value="SALES">Sales</option>
                                    <option value="FIN">Finance</option>
                                    <option value="IT">Information Technology</option>
                                    <option value="ADMIN">Administration</option>
                                    <option value="CS">Customer Service</option>
                                    <option value="ACC">Accounting</option>
                                    <option value="QA">Quality Assurance</option>
                                    <option value="MNT">Maintenance</option>
                                    <option value="BIZ">Business</option>
                                    <option value="DES">Designing</option>
                                    <option value="LEAD">Leadership</option>
                                    <option value="LEGAL">Legal</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Role *
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="employee">Employee</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hire Date *
                                </label>
                                <input
                                    type="date"
                                    name="hire_date"
                                    value={formData.hire_date}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex space-x-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {loading ? 'Saving...' : (employeeId ? 'Update Employee' : 'Create Employee')}
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => navigate('/employees')}
                        className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EmployeeForm