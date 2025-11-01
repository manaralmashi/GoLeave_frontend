import React from 'react';
import { Link } from 'react-router';

export default function Home() {
  return (
    <div className="bg-gray-50">
        <div>
          <h1 className="text-4xl font-bold text-yellow-500 font-manrope">GoLeave</h1>
          <p>This is my app</p>
          <div>
            <Link to="/login" className="bg-blue-500 text-white">Login</Link>
          </div>
        </div>
    </div>
  );
}