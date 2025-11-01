import React from 'react'
import { clearTokens } from '../../lib/auth'
import { useNavigate } from 'react-router'

function LogoutButton({setUser}) {
    const navigate = useNavigate()

    function handleLogOut(){
        clearTokens()
        setUser(null)
        navigate('/login')
    }

  return (
    <button class='text-red-400' onClick={handleLogOut}>❌Logout❌</button>
  )
}

export default LogoutButton