// pages/api/projects/users.js
import connectDB from '../../../utils/connectDB';
import Project from '../../../models/Project';

connectDB();

export default async function handler(req, res) {
  console.log('Received method:', req.method);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { projectId } = req.query;

  try {
    //find the project based on projectId
    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    //extract members from the project
    const members = project.members || [];
    console.log(members);

    res.status(200).json(members);
  } catch (error) {
    console.error('Error fetching users in project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
