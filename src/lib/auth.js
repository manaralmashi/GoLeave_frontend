import axios from "axios"
// Remember to do npm install jwt-decode
import { jwtDecode } from "jwt-decode"

// Save tokens in localStorage
export const saveTokens = (access, refresh) => {
    localStorage.setItem("access_token", access)
    localStorage.setItem("refresh_token", refresh)
}

// Load tokens
export const getTokens = () => ({
    access: localStorage.getItem("access_token"),
    refresh: localStorage.getItem("refresh_token")
})

// Remove tokens
export const clearTokens = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
}

// Decode access token
export const getUserFromToken = () => {
    const token = localStorage.getItem("access_token")
    return token ? jwtDecode(token) : null
}

// Authenticated request with auto-refresh
export const authRequest = async (config) => {
    let { access, refresh } = getTokens()
    if (!access) throw new Error("No access token")

    console.log('🔐 Token content:', jwtDecode(access))

    const tokenExp = jwtDecode(access).exp * 1000
    const now = Date.now()

    // If token expired, refresh
    if (now >= tokenExp) {
        if (!refresh) throw new Error("No refresh token")
        try {
            const refreshRes = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh })
            access = refreshRes.data.access
            saveTokens(access, refresh)
        } catch (err) {
            clearTokens()
            throw err
        }
    }

    config.headers = { ...config.headers, Authorization: `Bearer ${access}` }
    return axios(config)
}

// Get all user details from API
export const getUserDetail = async () => {
    try {
        const user = getUserFromToken();
        if (!user || !user.user_id)
            return null

        // Get user details from API
        const response = await authRequest({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/users/${user.user_id}/`
        });
        // const response = await axios.get(`http://127.0.0.1:8000/api/users/${user.user_id}/`) ----> ERROR :(
        return response.data;

    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null
    }
};

// Get current employee ID from API
export const getCurrentEmployeeId = async () => {
    try {
        const user = getUserFromToken();
        if (!user || !user.user_id) {
            console.log('❌ No user found in token');
            return null;
        }

        console.log('🔐 Current user ID:', user.user_id);


        const leaveRequestsResponse = await authRequest({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/leave-requests/'
        });


        const currentEmployee = leaveRequestsResponse.data
            .map(request => request.employee_details)
            .find(emp => emp && emp.user && emp.user.id === parseInt(user.user_id));

        if (currentEmployee) {
            console.log('✅ Found employee ID:', currentEmployee.id);
            return currentEmployee.id;
        } else {
            console.log('❌ Employee not found for user');
            return null;
        }

    } catch (error) {
        console.error('Error fetching employee ID:', error);
        return null;
    }
};

// Get full employee data
export const getCurrentEmployeeData = async () => {
    try {
        const user = getUserFromToken();
        if (!user || !user.user_id) return null;

        const leaveRequestsResponse = await authRequest({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/leave-requests/'
        });

        const currentEmployee = leaveRequestsResponse.data
            .map(request => request.employee_details)
            .find(emp => emp && emp.user && emp.user.id === parseInt(user.user_id));

        return currentEmployee || null;

    } catch (error) {
        console.error('Error fetching employee data:', error);
        return null;
    }
};