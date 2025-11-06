// import React, { useState } from "react"
// import axios from "axios"
// import { saveTokens, getUserFromToken, getUserDetail } from "../../lib/auth"
// import { useNavigate } from "react-router"
// import Card from "../common/Card"

// export default function Login({ setUser }) {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/api/login/", { username, password })
//       saveTokens(res.data.access, res.data.refresh)

//       const userDetail = await getUserDetail();
//       console.log('✅ Login successful, user detail:', userDetail);

//       setUser(userDetail)
//       navigate("/")
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   return (
//     <div className="flex items-end w-full">
//         <Card className='bg-gray-50 rounded-4xl w-1/3 m-auto' children=
//         {
//             <form onSubmit={handleSubmit} className="p-6">
//             <h2 className=" text-3xl">Login</h2>
//             <div>
//                 <label htmlFor="username">Username</label>
//                 <input className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-black placeholder:text-gray-500 focus:outline-none sm:text-sm/6" name="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
//             </div>
//             <div>
//                 <label htmlFor="password">Password</label>
//                 <input className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-black placeholder:text-gray-500 focus:outline-none sm:text-sm/6" name="password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//             </div>
//             <button type="submit">Login</button>
//             </form>
//         }
//         />
//     </div>
//   )
// }

import React, { useState } from "react"
import axios from "axios"
import { saveTokens, getUserFromToken, getUserDetail } from "../../lib/auth"
import { useNavigate, Link } from "react-router"
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function Login({ setUser }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", { username, password })
      saveTokens(res.data.access, res.data.refresh)

      const userDetail = await getUserDetail();
      console.log('✅ Login successful, user detail:', userDetail);

      setUser(userDetail)
      navigate("/")
    } catch (err) {
      console.error(err)
      setError("Invalid username or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    {/* <div class="background"> */}
        <div className="z-10 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/60 overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">GL</span>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Welcome to GoLeave!👋🏻</h1>
                        <p className="text-blue-100">Please sign-in to your account and start the adventure</p>
                    </div>

                    {/* Card Body */}
                    <div className="p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Username Field */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <input 
                                        id="username"
                                        name="username" 
                                        placeholder="Enter your username" 
                                        value={username} 
                                        onChange={e => setUsername(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input 
                                        id="password"
                                        name="password" 
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password" 
                                        value={password} 
                                        onChange={e => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeSlashIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link 
                                    to="/signup" 
                                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                                >
                                    Sign Up
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
        {/* <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span> */}
    {/* </div> */}
    </>
  )
}