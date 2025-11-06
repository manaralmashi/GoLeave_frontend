import {useState, useEffect} from 'react';
import axios from 'axios'

import { BrowserRouter as Router, Routes, Route } from 'react-router'

import Home from './components/Home';
import Layout from './components/layout/Layout';
import EmployeeList from './components/pages/EmployeeList';
import EmployeeDetail from './components/pages/EmployeeDetail';
import EmployeeForm from './components/pages/EmployeeForm';
import LeaveRequestList from './components/pages/LeaveRequestList';
import LeaveRequestForm from './components/pages/LeaveRequestForm';
import LeaveRequestDetail from './components/pages/LeaveRequestDetail';
import Profile from './components/pages/Profile';

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
        console.log('👤 User role from token:', user)
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
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout user={user} setUser={setUser}>
              <Home user={user}/>
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/employees" element={
          <ProtectedRoute>
            <Layout user={user} setUser={setUser}>
              <EmployeeList />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/employees/new" element={
          <ProtectedRoute>
            <Layout user={user} setUser={setUser}>
              <EmployeeForm />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path='/employees/:employeeId' element={
          <ProtectedRoute>
            <Layout user={user} setUser={setUser}>
              <EmployeeDetail />
            </Layout>
          </ProtectedRoute>
        }/>

        <Route path='/employees/:employeeId/edit' element={
          <ProtectedRoute>
            <Layout user={user} setUser={setUser}>
              <EmployeeForm />
            </Layout>
          </ProtectedRoute>
        }/>

        <Route path="/leave-requests" element={
          <ProtectedRoute>
            <Layout user={user} setUser={setUser}>
              <LeaveRequestList />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/leave-requests/new" element={
          <ProtectedRoute>
            <Layout user={user} setUser={setUser}>
              <LeaveRequestForm />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/leave-requests/:leaveRequestsId/edit" element={
          <ProtectedRoute>
            <Layout user={user} setUser={setUser}>
              <LeaveRequestForm />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/leave-requests/:leaveRequestsId" element={
          <ProtectedRoute>
            <Layout user={user} setUser={setUser}>
              <LeaveRequestDetail />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Layout user={user} setUser={setUser}>
              <Profile />
            </Layout>
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  )
}

export default App