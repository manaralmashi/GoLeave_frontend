// import React, { useState } from 'react'
// import axios from 'axios'
// import { useNavigate, Link } from 'react-router'

// export default function SignUp() {
//     const [formData, setFormData] = useState({
//         // User model fields
//         username: '',
//         password: '',
//         email: '',
//         first_name: '',
//         last_name: '',
//         // Employee model fields
//         job_title: '',
//         department: '',
//         role: 'employee',
//         hire_date: ''
//     });

//     const navigate = useNavigate()

//     const handleChange = (event) => {
//         setFormData({ ...formData, [event.target.name]: event.target.value })
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault()
//         try {
//             const response = await axios.post('http://127.0.0.1:8000/api/signup/', formData)
//             console.log('✅ Signup successful:', response.data);
//             navigate('/login')

//         } catch (err) {
//             console.error('❌ Signup error:', err);
//             alert('Signup failed')
//         }
//     }

//     return (
//         <div>
//             {/* Sign Up Form */}
//             <form onSubmit={handleSubmit}>
//                 <h2>Sign Up</h2>
                
//                 {/* 1. User Information */}
//                 <div>
//                     <label>First Name</label>
//                     <input name='first_name' placeholder='your first name..' value={formData.first_name} onChange={handleChange} required type='text' />
//                 </div>
//                 <div>
//                     <label>Last Name</label>
//                     <input name='last_name' placeholder='your last name..' value={formData.last_name} onChange={handleChange} required type='text' />
//                 </div>
//                 <div>
//                     <label>Username</label>
//                     <input name='username' placeholder='your Username..' value={formData.username} onChange={handleChange} required type='text' />
//                 </div>
//                 <div>
//                     <label>Email</label>
//                     <input name='email' placeholder='your email..' value={formData.email} onChange={handleChange} required type='email' />
//                 </div>
//                 <div>
//                     <label>Password</label>
//                     <input name='password' placeholder='your password..' value={formData.password} onChange={handleChange} required type='password' />
//                 </div>
//                 {/* 2. Employee Information */}
//                 <div>
//                     <label>Job Title</label>
//                     <input name='job_title' placeholder='your job title..' value={formData.job_title} onChange={handleChange} required type='text' />
//                 </div>
//                 <div>
//                     <label>Department</label>
//                     <select name='department' value={formData.department} onChange={handleChange} required>
//                         <option value=''>Select Department</option>
//                         <option value='HR'>Human Resources</option>
//                         <option value='MKT'>Marketing</option>
//                         <option value='R&D'>Research & Development</option>
//                         <option value='SALES'>Sales</option>
//                         <option value='FIN'>Finance</option>
//                         <option value='IT'>Information Technology</option>
//                         <option value='ADMIN'>Administration</option>
//                         <option value='CS'>Customer Service</option>
//                         <option value='ACC'>Accounting</option>
//                         <option value='QA'>Quality Assurance</option>
//                         <option value='MNT'>Maintenance</option>
//                         <option value='BIZ'>Business</option>
//                         <option value='DES'>Designing</option>
//                         <option value='LEAD'>Leadership</option>
//                         <option value='LEGAL'>Legal</option>
//                         <option value='OTHER'>Other</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label>Role</label>
//                     <select name='role' value={formData.role} onChange={handleChange} required>
//                         <option value='employee'>Employee</option>
//                         <option value='admin'>Admin</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label>Hire Date</label>
//                     <input name='hire_date' value={formData.hire_date} onChange={handleChange} required type='date' />
//                 </div>

//                 {/* <button type='submit' disabled={loading}>{loading ? 'loading...' : 'Sign Up'}</button> */}
//                 <button type='submit'>Sign Up</button>
//             </form>

//             {/* Login if u have an account */}
//             <div>
//                 <Link to='/login' className='bg-blue-500 text-white'>Do you have account? Login</Link>
//             </div>
//         </div>
//     )
// }

import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: '',
        job_title: '',
        department: '',
        role: 'employee',
        hire_date: ''
    });
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        if (error) setError('')
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        setError('')
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/signup/', formData)
            console.log('✅ Signup successful:', response.data);
            navigate('/login')
        } catch (err) {
            console.error('❌ Signup error:', err);
            setError(err.response?.data?.message || 'Signup failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // const departments = [
    //     'HR', 'MKT', 'R&D', 'SALES', 'FIN', 'IT', 'ADMIN', 
    //     'CS', 'ACC', 'QA', 'MNT', 'BIZ', 'DES', 'LEAD', 'LEGAL', 'OTHER'
    // ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-center">
                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">GL</span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Sign Up</h1>
                        <p className="text-green-100">Create your GoLeave account</p>
                    </div>

                    {/* Card Body */}
                    <div className="p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Personal Information */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name *
                                        </label>
                                        <input 
                                            name='first_name' 
                                            placeholder='ex: Manar' 
                                            value={formData.first_name} 
                                            onChange={handleChange} 
                                            required 
                                            type='text'
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name *
                                        </label>
                                        <input 
                                            name='last_name' 
                                            placeholder='ex: Al Mashi' 
                                            value={formData.last_name} 
                                            onChange={handleChange} 
                                            required 
                                            type='text'
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input 
                                            name='email' 
                                            placeholder='ex: manar@company.com' 
                                            value={formData.email} 
                                            onChange={handleChange} 
                                            required 
                                            type='email'
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Account & Employment Information */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Account & Employment</h3>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Username *
                                        </label>
                                        <input 
                                            name='username' 
                                            placeholder='ex: manaralmashi' 
                                            value={formData.username} 
                                            onChange={handleChange} 
                                            required 
                                            type='text'
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Password *
                                        </label>
                                        <div className="relative">
                                            <input 
                                                name='password' 
                                                type={showPassword ? "text" : "password"}
                                                placeholder='••••••••' 
                                                value={formData.password} 
                                                onChange={handleChange} 
                                                required 
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none pr-12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                {showPassword ? (
                                                    <EyeSlashIcon className="w-5 h-5" />
                                                ) : (
                                                    <EyeIcon className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Job Title *
                                        </label>
                                        <input 
                                            name='job_title' 
                                            placeholder='ex: Software Engineer' 
                                            value={formData.job_title} 
                                            onChange={handleChange} 
                                            required 
                                            type='text'
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Department *
                                        </label>
                                        <select 
                                            name='department' 
                                            value={formData.department} 
                                            onChange={handleChange} 
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
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
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Role *
                                            </label>
                                            <select 
                                                name='role' 
                                                value={formData.role} 
                                                onChange={handleChange} 
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
                                            >
                                                <option value='employee'>Employee</option>
                                                <option value='admin'>Admin</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Hire Date *
                                            </label>
                                            <input 
                                                name='hire_date' 
                                                value={formData.hire_date} 
                                                onChange={handleChange} 
                                                required 
                                                type='date'
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type='submit' 
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Creating Account...</span>
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link 
                                    to='/login' 
                                    className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-gray-500 text-sm">
                        © 2024 GoLeave. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}