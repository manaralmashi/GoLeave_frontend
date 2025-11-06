// import React from 'react'
// import { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router'
// import { authRequest, getUserFromToken } from '../../lib/auth'

// function LeaveRequestForm() {
//     const navigate = useNavigate()
//     const { id } = useParams()
    
//     const [formData, setFormData] = useState({
//         start_date: '',
//         end_date: '',
//         reason: '',
//         leave_type: '',
//         is_outside_country: false
//     })
//     const [leaveTypes, setLeaveTypes] = useState([])
//     const [currentEmployee, setCurrentEmployee] = useState(null)
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState('')
//     const [totalDays, setTotalDays] = useState(0)

//     async function getCurrentUserData() {
//         try {
//             const user = getUserFromToken()
//             if (!user || !user.user_id) return null

//             const employeesResponse = await authRequest({
//                 method: 'GET',
//                 url: 'http://127.0.0.1:8000/api/employees/'
//             })
            
//             const currentEmployee = employeesResponse.data.find(
//                 emp => emp.user.id === parseInt(user.user_id)
//             )
            
//             setCurrentEmployee(currentEmployee)
//             return currentEmployee
//         } catch (err) {
//             console.error('Error fetching user data:', err)
//             return null
//         }
//     }

//     async function loadLeaveTypes() {
//         try {
//             const response = await authRequest({
//                 method: 'GET',
//                 url: 'http://127.0.0.1:8000/api/leave-types/'
//             })
//             setLeaveTypes(response.data)
//         } catch (err) {
//             console.error('Error fetching leave types:', err)
//         }
//     }

//     // إذا كان تعديل، جلب بيانات الطلب
//     async function getLeaveRequest() {
//         if (!id) return
        
//         try {
//             const response = await authRequest({
//                 method: 'GET',
//                 url: `http://127.0.0.1:8000/api/leave-requests/${id}/`
//             })
//             const request = response.data
//             setFormData({
//                 start_date: request.start_date,
//                 end_date: request.end_date,
//                 reason: request.reason,
//                 leave_type: request.leave_type?.id || request.leave_type,
//                 is_outside_country: request.is_outside_country
//             })
//             setTotalDays(request.total_days || 0)
//         } catch (err) {
//             console.error('Error fetching leave request:', err)
//             setError('Failed to load leave request')
//         }
//     }

//     useEffect(() => {
//         async function initialize() {
//             await getCurrentUserData()
//             await loadLeaveTypes()
//             if (id) {
//                 await getLeaveRequest()
//             }
//         }
//         initialize()
//     }, [id])

//     function handleChange(event) {
//         const { name, value, type, checked } = event.target
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }))

//         // حساب عدد الأيام تلقائياً
//         if ((name === 'start_date' || name === 'end_date') && formData.start_date && formData.end_date) {
//             const start = new Date(name === 'start_date' ? value : formData.start_date)
//             const end = new Date(name === 'end_date' ? value : formData.end_date)
//             const diffTime = Math.abs(end - start)
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
//             setTotalDays(diffDays)
//         }
//     }

//     async function handleSubmit(event) {
//         event.preventDefault()
//         setLoading(true)
//         setError('')

//         try {
//             let response = {}
            
//             if (id) {
//                 // تعديل طلب موجود
//                 response = await authRequest({
//                     method: 'PUT',
//                     url: `http://127.0.0.1:8000/api/leave-requests/${id}/`,
//                     data: formData
//                 })
//             } else {
//                 // إنشاء طلب جديد
//                 response = await authRequest({
//                     method: 'POST',
//                     url: 'http://127.0.0.1:8000/api/leave-requests/',
//                     data: formData
//                 })
//             }

//             console.log('Leave request saved:', response.data)
//             navigate('/leave-requests')
            
//         } catch (err) {
//             console.error('Error saving leave request:', err)
//             setError(err.response?.data?.error || 'Failed to save leave request')
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className="p-6">
//             <div className="mb-6">
//                 <button 
//                     onClick={() => navigate('/leave-requests')}
//                     className="text-blue-600 hover:text-blue-800"
//                 >
//                     ← Back to Leave Requests
//                 </button>
//             </div>

//             <h1 className="text-2xl font-bold mb-6">
//                 {id ? 'Edit Leave Request' : 'New Leave Request'}
//             </h1>

//             {error && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                     {error}
//                 </div>
//             )}

//             <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 max-w-2xl">
//                 <div className="space-y-6">
//                     {/* Employee Info (readonly) */}
//                     {currentEmployee && (
//                         <div className="p-4 bg-gray-50 rounded-lg">
//                             <h3 className="font-semibold mb-2">Employee Information</h3>
//                             <p>{currentEmployee.user.first_name} {currentEmployee.user.last_name}</p>
//                             <p className="text-sm text-gray-600">{currentEmployee.job_title} - {currentEmployee.department}</p>
//                         </div>
//                     )}

//                     {/* Leave Type */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Leave Type *
//                         </label>
//                         <select
//                             name="leave_type"
//                             value={formData.leave_type}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="">Select Leave Type</option>
//                             {leaveTypes.map(type => (
//                                 <option key={type.id} value={type.id}>
//                                     {type.type_display || type.type} 
//                                     {type.max_days_allowed && ` (Max: ${type.max_days_allowed} days)`}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Date Range */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Start Date *
//                             </label>
//                             <input
//                                 type="date"
//                                 name="start_date"
//                                 value={formData.start_date}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 End Date *
//                             </label>
//                             <input
//                                 type="date"
//                                 name="end_date"
//                                 value={formData.end_date}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>
//                     </div>

//                     {/* Total Days (auto-calculated) */}
//                     {totalDays > 0 && (
//                         <div className="p-3 bg-blue-50 rounded-lg">
//                             <p className="text-sm font-medium text-blue-800">
//                                 Total Days: <span className="font-bold">{totalDays}</span>
//                             </p>
//                         </div>
//                     )}

//                     {/* Outside Country */}
//                     <div className="flex items-center">
//                         <input
//                             type="checkbox"
//                             name="is_outside_country"
//                             checked={formData.is_outside_country}
//                             onChange={handleChange}
//                             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                         />
//                         <label className="ml-2 block text-sm text-gray-700">
//                             Traveling outside the country
//                         </label>
//                     </div>

//                     {/* Reason */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Reason *
//                         </label>
//                         <textarea
//                             name="reason"
//                             value={formData.reason}
//                             onChange={handleChange}
//                             required
//                             rows="4"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Please provide details for your leave request..."
//                         />
//                     </div>
//                 </div>

//                 <div className="mt-8 flex space-x-4">
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
//                     >
//                         {loading ? 'Saving...' : (id ? 'Update Request' : 'Submit Request')}
//                     </button>
                    
//                     <button
//                         type="button"
//                         onClick={() => navigate('/leave-requests')}
//                         className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default LeaveRequestForm

































// import React from 'react'
// import { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router'
// import { authRequest, getUserFromToken } from '../../lib/auth'

// function LeaveRequestForm() {
//     const navigate = useNavigate()
//     const { leaveRequestsId } = useParams()
    
//     // const [formData, setFormData] = useState({
//     //     start_date: '',
//     //     end_date: '',
//     //     reason: '',
//     //     leave_type: '',
//     //     employee: null,
//     //     is_outside_country: false,
//     // })
//     const [leaveTypes, setLeaveTypes] = useState([])
//     const [currentEmployee, setCurrentEmployee] = useState(null)
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState('')
//     const [totalDays, setTotalDays] = useState(0)

//     // ------------- 1 --------------------
//     async function getCurrentUserData() {
//         try {
//             const user = getUserFromToken()
//             if (!user || !user.user_id) return null

//             // 🔥 استخدم طريقة أكثر أماناً لجلب بيانات المستخدم
//             const leaveRequestsResponse = await authRequest({
//                 method: 'GET',
//                 url: 'http://127.0.0.1:8000/api/leave-requests/'
//             })
//             console.log('leaveRequestsResponse.data: ', leaveRequestsResponse.data);
            
//             const currentEmployeeData = leaveRequestsResponse.data
//                 .map(request => request.employee_details)
//                 .find(emp => emp?.user?.id === parseInt(user.user_id))
            
//             if (currentEmployeeData) {
//                 setCurrentEmployee(currentEmployeeData)
//                 return currentEmployeeData
//             }
//             return null

//         } catch (err) {
//             console.error('Error fetching user data:', err)
//             return null
//         }
//     }

//     const [formData, setFormData] = useState({
//         start_date: '',
//         end_date: '',
//         reason: '',
//         leave_type: '',
//         employee: currentEmployee,
//         is_outside_country: false,
//     })
//     // ------------- 2 --------------------
//     // async function getCurrentUserData() {
//     //     try {
//     //         const user = getUserFromToken()
//     //         if (!user || !user.user_id) {
//     //             console.log('❌ No user found in token')
//     //             return null
//     //         }

//     //         console.log('🔐 Current user ID:', user.user_id)

//     //         // 🔥 جلب بيانات الموظفين مباشرة من API Employees
//     //         try {
//     //             const employeesResponse = await authRequest({
//     //                 method: 'GET',
//     //                 url: 'http://127.0.0.1:8000/api/employees/'
//     //             })
                
//     //             console.log('👥 All employees:', employeesResponse.data)
                
//     //             // 🔥 البحث عن الموظف الحالي باستخدام user_id
//     //             const currentEmployeeData = employeesResponse.data.find(emp => 
//     //                 emp.user && emp.user.id === parseInt(user.user_id)
//     //             )
                
//     //             if (currentEmployeeData) {
//     //                 console.log('✅ Found employee data:', currentEmployeeData)
//     //                 setCurrentEmployee(currentEmployeeData)
//     //                 return currentEmployeeData
//     //             } else {
//     //                 console.log('❌ Employee not found for user_id:', user.user_id)
//     //                 console.log('Available employees:', employeesResponse.data.map(emp => ({
//     //                     id: emp.id,
//     //                     user_id: emp.user?.id,
//     //                     name: `${emp.user?.first_name} ${emp.user?.last_name}`
//     //                 })))
//     //                 return null
//     //             }
                
//     //         } catch (employeesErr) {
//     //             console.error('Error fetching employees:', employeesErr)
//     //             return null
//     //         }
            
//     //     } catch (err) {
//     //         console.error('Error in getCurrentUserData:', err)
//     //         return null
//     //     }
//     // }
    
//     async function loadLeaveTypes() {
//         try {
//             const response = await authRequest({
//                 method: 'GET',
//                 url: 'http://127.0.0.1:8000/api/leave-types/'
//             })
//             setLeaveTypes(response.data)
//         } catch (err) {
//             console.error('Error fetching leave types:', err)
//         }
//     }

//     async function getLeaveRequest() {
//         if (!leaveRequestsId) return
        
//         try {
//             const response = await authRequest({
//                 method: 'GET',
//                 url: `http://127.0.0.1:8000/api/leave-requests/${leaveRequestsId}/`
//             })
//             const request = response.data
//             setFormData({
//                 start_date: request.start_date,
//                 end_date: request.end_date,
//                 reason: request.reason,
//                 leave_type: request.leave_type?.id || request.leave_type,
//                 employee: currentEmployee,
//                 is_outside_country: request.is_outside_country
//             })
//             setTotalDays(request.total_days || 0)
//         } catch (err) {
//             console.error('Error fetching leave request:', err)
//             setError('Failed to load leave request')
//         }
//     }

//     async function initialize() {
//         await getCurrentUserData()
//         await loadLeaveTypes()
//         if (leaveRequestsId) {
//             await getLeaveRequest()
//         }
//     }

//     useEffect(() => {
//         initialize()
//     }, [leaveRequestsId])

//     function handleChange(event) {
//         const { name, value, type, checked } = event.target
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }))

//         // 🔥 تحسين حساب الأيام
//         if (name === 'start_date' || name === 'end_date') {
//             const startDate = name === 'start_date' ? value : formData.start_date
//             const endDate = name === 'end_date' ? value : formData.end_date
            
//             if (startDate && endDate) {
//                 const start = new Date(startDate)
//                 const end = new Date(endDate)
//                 if (start <= end) {
//                     const diffTime = Math.abs(end - start)
//                     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
//                     setTotalDays(diffDays)
//                 } else {
//                     setTotalDays(0)
//                 }
//             }
//         }
//     }
    
//     async function handleSubmit(event) {
//         event.preventDefault()
//         setLoading(true)
//         setError('')

//         if (!formData.leave_type || !formData.start_date || !formData.end_date || !formData.reason) {
//             setError('All fields marked with * are required')
//             setLoading(false)
//             return
//         }

//         if (new Date(formData.start_date) > new Date(formData.end_date)) {
//             setError('End date must be after start date')
//             setLoading(false)
//             return
//         }

//         if (totalDays <= 0) {
//             setError('Please select valid dates')
//             setLoading(false)
//             return
//         }
        
//         try {
//             // 🔥 إعداد البيانات مع employee ID فقط
//             const requestData = {
//                 start_date: formData.start_date,
//                 end_date: formData.end_date,
//                 reason: formData.reason,
//                 leave_type: formData.leave_type,
//                 is_outside_country: formData.is_outside_country,
//                 employee: currentEmployee?.id  // 🔥 إرسال الـ ID فقط
//             };

//             console.log('📤 Sending data:', requestData)
            
//             let response = {}
            
//             if (leaveRequestsId) {
//                 response = await authRequest({
//                     method: 'PUT',
//                     url: `http://127.0.0.1:8000/api/leave-requests/${leaveRequestsId}/edit/`,
//                     data: requestData
//                 })
//             } else {
//                 response = await authRequest({
//                     method: 'POST',
//                     url: 'http://127.0.0.1:8000/api/leave-requests/',
//                     data: requestData
//                 })
//             }

//             console.log('✅ Leave request saved:', response.data)
//             navigate('/leave-requests')
            
//         } catch (err) {
//             console.error('❌ Error saving leave request:', err)
//             console.error('❌ Error details:', err.response?.data)
//             setError(err.response?.data?.error || 'Failed to save leave request')
//         } finally {
//             setLoading(false)
//         }
//     }
    
//     // async function handleSubmit(event) {
//     //     event.preventDefault()
//     //     setLoading(true)
//     //     setError('')

//     //     if (!formData.leave_type || !formData.start_date || !formData.end_date || !formData.reason) {
//     //         setError('All fields marked with * are required')
//     //         setLoading(false)
//     //         return
//     //     }

//     //     if (new Date(formData.start_date) > new Date(formData.end_date)) {
//     //         setError('End date must be after start date')
//     //         setLoading(false)
//     //         return
//     //     }

//     //     if (totalDays <= 0) {
//     //         setError('Please select valid dates')
//     //         setLoading(false)
//     //         return
//     //     }
        
//     //     try {
//     //         let response = {}
            
//     //         if (leaveRequestsId) {
//     //             response = await authRequest({
//     //                 method: 'PUT',
//     //                 url: `http://127.0.0.1:8000/api/leave-requests/${leaveRequestsId}/edit/`,
//     //                 data: formData
//     //             })
//     //         } else {
//     //             response = await authRequest({
//     //                 method: 'POST',
//     //                 url: 'http://127.0.0.1:8000/api/leave-requests/',
//     //                 data: formData
//     //             })
//     //         }

//     //         console.log('Leave request saved:', response.data)
//     //         navigate('/leave-requests')
            
//     //     } catch (err) {
//     //         console.error('Error saving leave request:', err)
//     //         setError(err.response?.data?.error || 'Failed to save leave request')
//     //     } finally {
//     //         setLoading(false)
//     //     }
//     // }

//     // async function handleSubmit(event) {
//     //     event.preventDefault()
//     //     setLoading(true)
//     //     setError('')

//     //     // 🔥 جلب بيانات الموظف مباشرة هنا
//     //     const currentEmployeeData = await getCurrentUserData()

//     //     if (!currentEmployeeData) {
//     //         setError('Employee data not loaded. Please wait or refresh the page.')
//     //         setLoading(false)
//     //         return
//     //     }
        
//     //     if (new Date(formData.start_date) > new Date(formData.end_date)) {
//     //         setError('End date must be after start date')
//     //         setLoading(false)
//     //         return
//     //     }

//     //     try {
//     //         const requestData = {
//     //             start_date: formData.start_date,
//     //             end_date: formData.end_date,
//     //             reason: formData.reason,
//     //             leave_type: formData.leave_type,
//     //             is_outside_country: formData.is_outside_country,
//     //             // employee: currentEmployeeData.id
//     //         };

//     //         if (!leaveRequestsId) {
//     //             requestData.employee = currentEmployeeData.id;
//     //         }

//     //         console.log('📤 Sending data:', requestData)
            
//     //         let response = {}
            
//     //         if (leaveRequestsId) {
//     //             response = await authRequest({
//     //                 method: 'PUT',
//     //                 url: `http://127.0.0.1:8000/api/leave-requests/${leaveRequestsId}/edit/`,
//     //                 data: requestData
//     //             })
//     //         } else {
//     //             response = await authRequest({
//     //                 method: 'POST',
//     //                 url: 'http://127.0.0.1:8000/api/leave-requests/',
//     //                 data: requestData
//     //             })
//     //         }

//     //         console.log('✅ Success:', response.data)
//     //         navigate('/leave-requests')
            
//     //     } catch (err) {
//     //         console.error('❌ Full error object:', err)
//     //         console.error('❌ Error response data:', err.response?.data)
//     //         console.error('❌ Error response status:', err.response?.status)
//     //         console.error('❌ Error response headers:', err.response?.headers)
            
//     //         // 🔥 هذا هو المهم - إظهار البيانات التي يرجعها الـ Backend
//     //         if (err.response?.data) {
//     //             const errorData = err.response.data;
//     //             console.log('🔍 Backend error details:', JSON.stringify(errorData, null, 2))
                
//     //             // معالجة أنواع مختلفة من الأخطاء
//     //             if (typeof errorData === 'string') {
//     //                 setError(errorData);
//     //             } else if (typeof errorData === 'object') {
//     //                 // جمع جميع رسائل الخطأ
//     //                 const errorMessages = [];
                    
//     //                 for (const [field, messages] of Object.entries(errorData)) {
//     //                     if (Array.isArray(messages)) {
//     //                         errorMessages.push(`${field}: ${messages.join(', ')}`);
//     //                     } else if (typeof messages === 'string') {
//     //                         errorMessages.push(`${field}: ${messages}`);
//     //                     } else {
//     //                         errorMessages.push(`${field}: ${JSON.stringify(messages)}`);
//     //                     }
//     //                 }
                    
//     //                 if (errorMessages.length > 0) {
//     //                     setError(errorMessages.join(' | '));
//     //                 } else {
//     //                     setError('Validation error occurred');
//     //                 }
//     //             } else {
//     //                 setError('An error occurred: ' + JSON.stringify(errorData));
//     //             }
//     //         } else {
//     //             setError('Network error or server unavailable');
//     //         }
//     //     } finally {
//     //         setLoading(false)
//     //     }
//     // }

//     return (
//         <div className="p-6">
//             <div className="mb-6">
//                 <button 
//                     onClick={() => navigate('/leave-requests')}
//                     className="text-blue-600 hover:text-blue-800"
//                 >
//                     ← Back to Leave Requests
//                 </button>
//             </div>

//             <h1 className="text-2xl font-bold mb-6">
//                 {leaveRequestsId ? 'Edit Leave Request' : 'New Leave Request'}
//             </h1>

//             {error && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                     {error}
//                 </div>
//             )}
//             {/* --------------------------------------------- */}
//             {!currentEmployee && !loading && (
//                 <div className="p-4 bg-red-50 rounded-lg">
//                     <p className="text-red-700">
//                         ❌ Cannot load employee data. Please contact administrator.
//                     </p>
//                     <button 
//                         onClick={initialize}
//                         className="mt-2 text-blue-600 hover:text-blue-800"
//                     >
//                         Retry
//                     </button>
//                 </div>
//             )}

//             {!currentEmployee && loading && (
//                 <div className="p-4 bg-blue-50 rounded-lg">
//                     <p className="text-blue-700">Loading employee data...</p>
//                 </div>
//             )}
//             {/* --------------------------------------------- */}
            
//             <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 max-w-2xl">
//                 <div className="space-y-6">
//                     {/* Employee Info (readonly) */}
//                     {currentEmployee && (
//                         <div className="p-4 bg-gray-50 rounded-lg">
//                             <h3 className="font-semibold mb-2">Employee Information</h3>
//                             <p>{currentEmployee.user.first_name} {currentEmployee.user.last_name}</p>
//                             <p className="text-sm text-gray-600">{currentEmployee.job_title} - {currentEmployee.department}</p>
//                         </div>
//                     )}

//                     {/* Leave Type */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Leave Type *
//                         </label>
//                         <select
//                             name="leave_type"
//                             value={formData.leave_type}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="">Select Leave Type</option>
//                             {leaveTypes.map(type => (
//                                 <option key={type.id} value={type.id}>
//                                     {type.type_display || type.type} 
//                                     {type.max_days_allowed && ` (Max: ${type.max_days_allowed} days)`}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Date Range */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Start Date *
//                             </label>
//                             <input
//                                 type="date"
//                                 name="start_date"
//                                 value={formData.start_date}
//                                 onChange={handleChange}
//                                 required
//                                 min={new Date().toISOString().split('T')[0]} // 🔥 لا يمكن اختيار تاريخ ماضي
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 End Date *
//                             </label>
//                             <input
//                                 type="date"
//                                 name="end_date"
//                                 value={formData.end_date}
//                                 onChange={handleChange}
//                                 required
//                                 min={formData.start_date || new Date().toISOString().split('T')[0]}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>
//                     </div>

//                     {/* Total Days */}
//                     <div className="p-3 bg-blue-50 rounded-lg">
//                         <p className="text-sm font-medium text-blue-800">
//                             Total Days: <span className="font-bold">{totalDays > 0 ? totalDays : '0'}</span>
//                         </p>
//                         {totalDays <= 0 && formData.start_date && formData.end_date && (
//                             <p className="text-sm text-red-600 mt-1">⚠️ End date must be after start date</p>
//                         )}
//                     </div>

//                     {/* Outside Country */}
//                     <div className="flex items-center">
//                         <input
//                             type="checkbox"
//                             name="is_outside_country"
//                             checked={formData.is_outside_country}
//                             onChange={handleChange}
//                             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                         />
//                         <label className="ml-2 block text-sm text-gray-700">
//                             Traveling outside the country
//                         </label>
//                     </div>

//                     {/* Reason */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Reason *
//                         </label>
//                         <textarea
//                             name="reason"
//                             value={formData.reason}
//                             onChange={handleChange}
//                             required
//                             rows="4"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Please provide details for your leave request..."
//                         />
//                     </div>
//                 </div>

//                 <div className="mt-8 flex space-x-4">
//                     <button
//                         type="submit"
//                         disabled={loading || totalDays <= 0}
//                         className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
//                     >
//                         {loading ? 'Saving...' : (leaveRequestsId ? 'Update Request' : 'Submit Request')}
//                     </button>
                    
//                     <button
//                         type="button"
//                         onClick={() => navigate('/leave-requests')}
//                         className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default LeaveRequestForm



























import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authRequest, getCurrentEmployeeId, getCurrentEmployeeData } from '../../lib/auth'

function LeaveRequestForm() {
    const navigate = useNavigate()
    const { leaveRequestsId } = useParams()
    
    const [leaveTypes, setLeaveTypes] = useState([])
    const [currentEmployeeId, setCurrentEmployeeId] = useState(null)
    const [currentEmployee, setCurrentEmployee] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [totalDays, setTotalDays] = useState(0)

    const [formData, setFormData] = useState({
        start_date: '',
        end_date: '',
        reason: '',
        leave_type: '',
        is_outside_country: false,
    })

    // get employee ID
    async function loadCurrentEmployee() {
        try {
            const employeeId = await getCurrentEmployeeId();
            const employeeData = await getCurrentEmployeeData();
            
            if (employeeId) {
                setCurrentEmployeeId(employeeId);
                setCurrentEmployee(employeeData);
                console.log('✅ Employee loaded - ID:', employeeId);
            } else {
                console.log('❌ No employee data found');
            }
        } catch (err) {
            console.error('Error loading employee:', err);
        }
    }

    async function loadLeaveTypes() {
        try {
            const response = await authRequest({
                method: 'GET',
                url: 'http://127.0.0.1:8000/api/leave-types/'
            })
            setLeaveTypes(response.data)
        } catch (err) {
            console.error('Error fetching leave types:', err)
        }
    }

    async function getLeaveRequest() {
        if (!leaveRequestsId) return
        
        try {
            const response = await authRequest({
                method: 'GET',
                url: `http://127.0.0.1:8000/api/leave-requests/${leaveRequestsId}/`
            })
            const request = response.data
            setFormData({
                start_date: request.start_date,
                end_date: request.end_date,
                reason: request.reason,
                leave_type: request.leave_type?.id || request.leave_type,
                is_outside_country: request.is_outside_country
            })
            setTotalDays(request.total_days || 0)
        } catch (err) {
            console.error('Error fetching leave request:', err)
            setError('Failed to load leave request')
        }
    }

    async function initialize() {
        setLoading(true)
        try {
            await loadCurrentEmployee()
            await loadLeaveTypes()
            if (leaveRequestsId) {
                await getLeaveRequest()
            }
        } catch (err) {
            console.error('Error initializing form:', err)
            setError('Failed to load form data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        initialize()
    }, [leaveRequestsId])

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))

        if (name === 'start_date' || name === 'end_date') {
            const startDate = name === 'start_date' ? value : formData.start_date
            const endDate = name === 'end_date' ? value : formData.end_date
            
            if (startDate && endDate) {
                const start = new Date(startDate)
                const end = new Date(endDate)
                if (start <= end) {
                    const diffTime = Math.abs(end - start)
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
                    setTotalDays(diffDays)
                } else {
                    setTotalDays(0)
                }
            }
        }
    }
    
    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        setError('')

        if (!currentEmployeeId && !leaveRequestsId) {
            setError('Cannot determine employee. Please refresh the page.')
            setLoading(false)
            return
        }

        if (!formData.leave_type || !formData.start_date || !formData.end_date || !formData.reason) {
            setError('All fields marked with * are required')
            setLoading(false)
            return
        }

        if (new Date(formData.start_date) > new Date(formData.end_date)) {
            setError('End date must be after start date')
            setLoading(false)
            return
        }

        if (totalDays <= 0) {
            setError('Please select valid dates')
            setLoading(false)
            return
        }
        
        try {
            const requestData = {
                start_date: formData.start_date,
                end_date: formData.end_date,
                reason: formData.reason,
                leave_type: formData.leave_type,
                employee: currentEmployeeId,
                is_outside_country: formData.is_outside_country,
            };

            console.log('📤 Sending data:', requestData)
            console.log('👤 Using employee ID:', currentEmployeeId)
            
            let response = {}
            
            if (leaveRequestsId) {
                response = await authRequest({
                    method: 'PUT',
                    url: `http://127.0.0.1:8000/api/leave-requests/${leaveRequestsId}/edit/`,
                    data: requestData
                })
            } else {
                response = await authRequest({
                    method: 'POST',
                    url: 'http://127.0.0.1:8000/api/leave-requests/',
                    data: requestData
                })
            }

            console.log('✅ Leave request saved:', response.data)
            navigate('/leave-requests')
            
        } catch (err) {
            console.error('❌ Error saving leave request:', err)
            console.error('❌ Error details:', err.response?.data)
            setError(err.response?.data?.error || 'Failed to save leave request')
        } finally {
            setLoading(false)
        }
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

            <h1 className="text-2xl font-bold mb-6">
                {leaveRequestsId ? 'Edit Leave Request' : 'New Leave Request'}
            </h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            {/* --------------------------------------------- */}
            {/* --------------- Foor Teeesst ---------------- */}
            {/* {!currentEmployee && !loading && (
                <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-red-700">
                        ❌ Cannot load employee data. Please contact administrator.
                    </p>
                    <button 
                        onClick={initialize}
                        className="mt-2 text-blue-600 hover:text-blue-800"
                    >
                        Retry
                    </button>
                </div>
            )}

            {!currentEmployee && loading && (
                <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-700">Loading employee data...</p>
                </div>
            )} */}
            {/* --------------------------------------------- */}
            
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 max-w-2xl">
                <div className="space-y-6">
                    {/* Employee Info (readonly) */}
                    {currentEmployee && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold mb-2">Employee Information</h3>
                            <p>{currentEmployee.user.first_name} {currentEmployee.user.last_name}</p>
                            <p className="text-sm text-gray-600">{currentEmployee.job_title} - {currentEmployee.department}</p>
                            <p className="text-xs text-gray-500">Employee ID: {currentEmployeeId}</p>
                        </div>
                    )}

                    {/* Leave Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Leave Type *
                        </label>
                        <select
                            name="leave_type"
                            value={formData.leave_type}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Leave Type</option>
                            {leaveTypes.map(type => (
                                <option key={type.id} value={type.id}>
                                    {type.type_display || type.type} 
                                    {type.max_days_allowed && ` (Max: ${type.max_days_allowed} days)`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date Range */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date *
                            </label>
                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                required
                                min={new Date().toISOString().split('T')[0]} // Learned toISOString() from: `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString`
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Date *
                            </label>
                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                                required
                                min={formData.start_date || new Date().toISOString().split('T')[0]}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Total Days */}
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">
                            Total Days: <span className="font-bold">{totalDays > 0 ? totalDays : '0'}</span>
                        </p>
                        {totalDays <= 0 && formData.start_date && formData.end_date && (
                            <p className="text-sm text-red-600 mt-1">⚠️ End date must be after start date</p>
                        )}
                    </div>

                    {/* Outside Country */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="is_outside_country"
                            checked={formData.is_outside_country}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                            Traveling outside the country
                        </label>
                    </div>

                    {/* Reason */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Reason *
                        </label>
                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Please provide details for your leave request..."
                        />
                    </div>
                </div>

                <div className="mt-8 flex space-x-4">
                    <button
                        type="submit"
                        disabled={loading || totalDays <= 0}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : (leaveRequestsId ? 'Update Request' : 'Submit Request')}
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => navigate('/leave-requests')}
                        className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LeaveRequestForm



