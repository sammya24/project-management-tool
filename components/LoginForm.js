// components/LoginForm.js
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';


const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', formData);
      const token = response.data.token;
      

      //save the token to local storage
      localStorage.setItem('authToken', token);

      let user = formData.email;
      localStorage.setItem('user', user);
      //localStorage.setItem('user', )
      
      toast.success('Login successful!');

      if (onLogin) {
        onLogin(); //trigger the login callback
      }
    } catch (error) {
      console.error('Login failed:', error.response.data);
      toast.error('Login failed. Please check your email/password.');
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} required />

      <button type="submit">Login</button>
    </form>

    <p>
    Need to create an account? <Link href="/signup">Sign up</Link>
      </p>

    </div>
  );
};

export default LoginForm;
