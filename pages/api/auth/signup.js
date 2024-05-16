// pages/api/auth/signup.js
import connectDB from '../../../utils/connectDB';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

connectDB();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    //see if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
  
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a new user with the hashed password
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
