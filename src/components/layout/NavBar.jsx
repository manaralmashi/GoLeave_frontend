// ------------------------------ FOR TEST ------------------------------
import React from 'react';
import { Link } from 'react-router';
import { clearTokens } from '../../lib/auth';

function NavBar({ user, setUser }) {

  const handleLogout = () => {
    clearTokens();
    setUser(null);
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div>
        <Link to="/">🏢 GoLeave</Link>
        <button onClick={handleLogout}>❌Logout❌</button>
        <div>
          {user ? (
            <>
              <span>Hello, {user.username}</span>
            </>
          ) : (
            <>
                <Link to="/login" className="bg-green-500">Login</Link>
                <Link to="/signup" className="bg-pink-300">Sign Up</Link>
                <Link to="/" className="bg-purple-500">Home</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar