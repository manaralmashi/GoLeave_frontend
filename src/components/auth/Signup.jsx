// src/SignUp.js
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router'

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });
    const navigate = useNavigate()

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/signup/', formData)
            console.log('✅ Signup successful:', response.data);
            navigate('/login')

        } catch (err) {
            console.error('❌ Signup error:', err);
            alert('Signup failed')
        }
    }

    return (
        <div>
            {/* Sign Up Form */}
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>

                <div>
                    <label>First Name</label>
                    <input name='first_name' placeholder='your first name..' value={formData.first_name} onChange={handleChange} required type='text' />
                </div>
                <div>
                    <label>Last Name</label>
                    <input name='last_name' placeholder='your last name..' value={formData.last_name} onChange={handleChange} required type='text' />
                </div>
                <div>
                    <label>Username</label>
                    <input name='username' placeholder='your Username..' value={formData.username} onChange={handleChange} required type='text' />
                </div>
                <div>
                    <label>Email</label>
                    <input name='email' placeholder='your email..' value={formData.email} onChange={handleChange} required type='email' />
                </div>
                <div>
                    <label>Password</label>
                    <input name='password' placeholder='your password..' value={formData.password} onChange={handleChange} required type='password' />
                </div>

                {/* <button type='submit' disabled={loading}>{loading ? 'loading...' : 'Sign Up'}</button> */}
                <button type='submit'>Sign Up</button>
            </form>

            {/* Login if u have an account */}
            <div>
                <Link to="/login" className="bg-blue-500 text-white">Do you have account? Login</Link>
            </div>
        </div>
    )
}