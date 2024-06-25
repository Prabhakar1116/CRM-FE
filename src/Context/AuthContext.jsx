import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create a context for authentication
export const AuthContext = createContext(); // Export AuthContext here

// The provider component that wraps the app and makes auth data available to any child component that needs it
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This function will be used to register a new user
  const register = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', data); // Update with your backend URL
      const userData = response.data;
      
      // Set user data to state and localStorage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  // This function will be used to log in the user
  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', credentials); // Update with your backend URL
      const userData = response.data;
      
      // Set user data to state and localStorage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  // This function will be used to log out the user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // This function is called on component mount to check if the user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Provide user, login and logout functions to the context consumers
  const value = {
    user,
    login,
    logout,
  };

  // Return a provider component that passes down auth data and functions
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
