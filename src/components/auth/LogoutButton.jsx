import React from 'react'
import { clearTokens } from '../../lib/auth'
import { useNavigate } from 'react-router'

function LogoutButton({setUser}) {
    console.log("LogoutButton has been clicked!");
    
    const navigate = useNavigate()

    function handleLogOut(){
        clearTokens()
        setUser(null)
        navigate('/login')
    }

  return (
    <button className='px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg' onClick={handleLogOut}>Logout</button>
  )
}

export default LogoutButton