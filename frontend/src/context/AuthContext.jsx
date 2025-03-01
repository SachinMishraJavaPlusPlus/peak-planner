import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../constant';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set up axios defaults
  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Check if user is logged in on mount
    const checkLoggedIn = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/auth/me`);
        if (res.data.success) {
          setCurrentUser(res.data.data);
        }
      } catch (err) {
        // User is not logged in, which is okay
        console.log('No user is logged in');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email, password) => {
    setError(null);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, { email, password });
      if (res.data.success) {
        setCurrentUser(await fetchUserData(res.data.token));
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to login. Please try again.');
      return false;
    }
  };

  // Register function
  const register = async (username, email, password) => {
    setError(null);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/auth/register`, { 
        username, 
        email, 
        password 
      });
      if (res.data.success) {
        setCurrentUser(await fetchUserData(res.data.token));
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register. Please try again.');
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/api/v1/auth/logout`);
      setCurrentUser(null);
      return true;
    } catch (err) {
      setError('Failed to logout. Please try again.');
      return false;
    }
  };

  // Fetch user data with token
  const fetchUserData = async (token) => {
    try {
      // Set auth header for this request
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const res = await axios.get(`${BACKEND_URL}/api/v1/auth/me`, config);
      return res.data.data;
    } catch (err) {
      setError('Failed to fetch user data');
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        login,
        register,
        logout,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);