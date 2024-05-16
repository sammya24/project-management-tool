// pages/login.js
import React, { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import Dashboard from '../components/Dashboard';
import { useRouter } from 'next/router';

const Login = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        const data = await response.json();

        if (data.isAuthenticated) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
   
    setLoggedIn(true);

    router.push('/dashboard'); //redirect to the dashboard after login
  };

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <div>
          <h1>Login</h1>
          <LoginForm onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default Login;
