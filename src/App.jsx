import {useState, useEffect} from 'react';
import axios from 'axios'

import { BrowserRouter as Router, Routes, Route } from 'react-router'

import NavBar from './components/layout/NavBar';
import Home from './components/Home';

import Login from './components/auth/Login'
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
          const user_detail = await getUserDetail();
          console.log('👤 User detail:', user_detail);
          setUser(user_detail || tokenUser); // use all user detail
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
      {/* Nav bar takes the user and the set user to show either login or logout buttons */}
      <NavBar user={user} setUser={setUser}/>

      <Routes>
        {/* All our routable components go here */}
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login setUser={setUser}/>}/>

      </Routes>
    </Router>
  )
}

export default App