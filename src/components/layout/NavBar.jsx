// ------------------------------ FOR TEST ------------------------------
import React from 'react';
import { Link } from 'react-router';
import LogoutButton from '../auth/LogoutButton';

function NavBar({ user, setUser }) {

  return (
    <nav className="bg-blue-600 text-white">
      <div>
        <Link to="/">🏢 GoLeave</Link>
        <LogoutButton setUser={setUser} />
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