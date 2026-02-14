import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../services/authService';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Use ref to track if component is mounted
  const isMounted = useRef(true);
  
  // Use ref to prevent multiple initializations
  const initialized = useRef(false);

  // Define logout with useCallback to prevent recreation
  const logout = useCallback((shouldNavigate = true) => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.info('Logged out successfully');
    if (shouldNavigate) {
      navigate('/login');
    }
  }, [navigate]);

  // Check if user is authenticated on initial load
  useEffect(() => {
    // Set mounted flag
    isMounted.current = true;
    
    const initAuth = async () => {
      // Prevent multiple initializations
      if (initialized.current) return;
      
      console.log('Initializing auth with token:', token ? 'exists' : 'none');
      
      if (token) {
        try {
          // FIX: Don't pass token as parameter - it's handled by interceptor
          const userData = await authService.getCurrentUser();
          console.log('User data fetched:', userData);
          
          if (isMounted.current) {
            setUser(userData);
            initialized.current = true;
          }
        } catch (error) {
          console.error('Failed to fetch user:', error);
          if (isMounted.current) {
            // Clear invalid token but don't navigate yet
            localStorage.removeItem('token');
            setToken(null);
            // Don't call logout() here to avoid navigation during init
          }
        }
      }
      
      if (isMounted.current) {
        setLoading(false);
      }
    };

    initAuth();

    // Cleanup
    return () => {
      isMounted.current = false;
    };
  }, [token]); // Only depend on token

  // Register function
  const register = async (userData) => {
    try {
      console.log('Registering user...');
      const response = await authService.register(userData);
      console.log('Register response:', response);
      
      const { token: newToken, user: newUser } = response;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(newUser);
      
      toast.success('Registration successful!');
      navigate('/dashboard');
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data || 'Registration failed');
      return { success: false, error: error.response?.data };
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      console.log('Logging in...');
      const response = await authService.login(credentials);
      console.log('Login response:', response);
      
      const { token: newToken, user: newUser } = response;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(newUser);
      
      toast.success('Login successful!');
      navigate('/dashboard');
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data || 'Invalid credentials');
      return { success: false, error: error.response?.data };
    }
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!token && !!user  // Both must exist
  };

  // Don't render children until loading is complete
  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};