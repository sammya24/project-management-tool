// components/SignupForm.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked');

    try {
      await axios.post('/api/auth/signup', formData);
      console.log("Signup successful");
      toast.success("You signed up successfuly!");
      
    } catch (error) {
      console.error(error);
      toast.error("Signup was unsuccessful. Try a different email.");
      console.log("Signup unsuccesful");
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="email" onChange={handleChange} required />
      </label>
      <label>
        Password:
        <input type="password" name="password" onChange={handleChange} required />
      </label>
      <button type="submit">Sign Up</button>
    </form>
    <p>
    Already have an account? <Link href="/login">Log In</Link>
      </p>
    </div>
  );
};

export default SignupForm;
