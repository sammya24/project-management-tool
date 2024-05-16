// pages/api/projects/inviteUser.js
import connectDB from '../../../utils/connectDB';
import Project from '../../../models/Project';

connectDB();

export default async function handler(req, res) {
  console.log('Received method:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { projectId, userEmail } = req.body;

  try {
    //fetch the project by ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    //check if the user is already a member
    if (project.members.includes(userEmail)) {
      return res.status(400).json({ error: 'User is already a member of the project' });
    }

    //add the user to the project members
    project.members.push(userEmail);

    //save the updated project
    await project.save();

    res.status(200).json({ message: 'User invited successfully' });
  } catch (error) {
    console.error('Error inviting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
