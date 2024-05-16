// api/projects/index.js
import connectDB from '../../../utils/connectDB';
import Project from '../../../models/Project';

connectDB();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userEmail } = req.query; //extract user email from the query parameters

  try {
    //fetch projects where the user is a member
    const userProjects = await Project.find({ members: userEmail });
    res.status(200).json(userProjects);
  } catch (error) {
    console.error('Error fetching user projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
