// pages/api/auth/check.js
export default async function handler(req, res) {
    res.status(200).json({ authenticated: true });
  }
  