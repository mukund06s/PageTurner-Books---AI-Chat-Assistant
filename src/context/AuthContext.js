// ============================================
// Auth Context - Admin Authentication
// ============================================
// Restores: Login/logout, remember me, token
// management, login event logging, session
// and localStorage persistence
// ============================================

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

// Valid credentials (same as original)
const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [loading, setLoading] = useState(true);

  // Check existing auth on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser') || sessionStorage.getItem('adminUser');
    if (token) {
      setIsAuthenticated(true);
      setAdminUser(user || 'Admin');
    }
    setLoading(false);
  }, []);

  // Login function
  const login = useCallback((username, password, rememberMe) => {
    return new Promise((resolve, reject) => {
      // Simulate API delay for realistic UX
      setTimeout(() => {
        if (username === VALID_CREDENTIALS.username &&
            password === VALID_CREDENTIALS.password) {

          // Generate token
          const token = 'admin_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

          // Store based on remember me preference
          if (rememberMe) {
            localStorage.setItem('adminToken', token);
            localStorage.setItem('adminUser', username);
            localStorage.setItem('rememberedUser', username);
          } else {
            sessionStorage.setItem('adminToken', token);
            sessionStorage.setItem('adminUser', username);
            localStorage.removeItem('rememberedUser');
          }

          // Log successful login
          logLoginEvent(username, true);

          setIsAuthenticated(true);
          setAdminUser(username);
          resolve({ success: true });
        } else {
          // Log failed login
          logLoginEvent(username, false);
          reject(new Error('Invalid username or password. Please try again.'));
        }
      }, 800);
    });
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    setAdminUser('');
  }, []);

  // Get remembered username
  const getRememberedUser = useCallback(() => {
    return localStorage.getItem('rememberedUser') || '';
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      adminUser,
      loading,
      login,
      logout,
      getRememberedUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Log login events for security audit (restored from auth.js)
function logLoginEvent(username, success) {
  try {
    const logs = JSON.parse(localStorage.getItem('loginLogs') || '[]');
    logs.push({
      username,
      success,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent.substring(0, 100)
    });
    while (logs.length > 100) logs.shift();
    localStorage.setItem('loginLogs', JSON.stringify(logs));
  } catch (e) {
    console.error('Failed to log login event:', e);
  }
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}