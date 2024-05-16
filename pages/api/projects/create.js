import connectDB from '../../../utils/connectDB';
import Project from '../../../models/Project';

connectDB();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const { name, description, startDate, admin, members} = req.body;

try {
  //create a new project
  
  const project = await Project.create({ name, description, startDate, admin, members});
  res.status(201).json(project);
} catch (error) {
  console.error('Project creation error:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}

}
