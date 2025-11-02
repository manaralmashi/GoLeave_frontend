import {useState, useEffect} from 'react';
import axios from 'axios'

import { BrowserRouter as Router, Routes, Route } from 'react-router'

import NavBar from './components/layout/NavBar';
import Home from './components/Home';
import Layout from './components/layout/Layout';

import Login from './components/auth/Login'
import SignUp from './components/auth/Signup';
import ProtectedRoute from './components/Auth/ProtectedRoute'
import { getUserFromToken, getUserDetail } from './lib/auth'

function App() {

  const [user, setUser] = useState(getUserFromToken());
  const [loading, setLoading] = useState(true);

  // ------- ONLY FOORR TESSTT CONNECTION --------
  useEffect(() => {
    async function testBackendConnection() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/');
        console.log('✅ Backend connection:', response.data);

        // Get all user detail from API
        const tokenUser = getUserFromToken();
        if (tokenUser) {
          const userDetail = await getUserDetail();
          console.log('👤 User detail:', userDetail);
          setUser(userDetail || tokenUser); // use all user detail
        }

      } catch (error) {
        console.error('❌ Backend connection failed:', error);
      }
    }

    // get user detail (user detail)
    const userDetail = getUserFromToken();
    console.log('🔍 User detail from token:', userDetail);
    setUser(userDetail);
    setLoading(false);
    
    
    testBackendConnection();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* All our routable components go here */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/*" element={
          <ProtectedRoute>
            <Layout user={user} setUser={setUser}>
              <Routes>
                {/* <Route path="/" element={<Dashboard user={user} />} /> */} {/* ------> NOT FINISHED IT YET! */}
                <Route path="/leave-requests" element={<div>test leave requests</div>} />
                <Route path="/leave-balance" element={<div>test leave balance</div>} />
                <Route path="/employees" element={<div>test employees</div>} />
                <Route path="/profile" element={<div>test profile</div>} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />
      </Routes >
    </Router>
  )
}

export default App