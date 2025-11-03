import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { authRequest } from '../../lib/auth'

function EmployeeList() {

    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    async function getAllEmployees() {
        try {
            const response = await authRequest({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/employees/'
            })
            console.log('✅ Employees data:', response.data)
            setEmployees(response.data)
        } catch (err) {
            console.error('❌ Error fetching employees:', err)
            setError('faild fetching employees!')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllEmployees()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div>loading...</div>
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

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">All Employees</h1>
            
            {employees.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {employees.map((employee) => (
                        <Link 
                            key={employee.id} 
                            to={`/employees/${employee.id}`}
                            className="block bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {employee.user?.first_name?.[0] || 'E'}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {employee.user?.first_name} {employee.user?.last_name}
                                    </h3>
                                    <p className="text-sm text-gray-600">{employee.job_title}</p>
                                    <p className="text-xs text-gray-500">{employee.department}</p>
                                    <p className="text-xs text-blue-600">{employee.role}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <h2 className="text-xl text-gray-500">No Employees</h2>
                </div>
            )}
        </div>
    )
}

export default EmployeeList