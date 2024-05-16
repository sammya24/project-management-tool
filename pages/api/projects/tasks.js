// pages/api/projects/tasks.js
import connectDB from '../../../utils/connectDB';
import Task from '../../../models/Task';

connectDB();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { projectId } = req.query;

  try {
    //fetch tasks for the specified project
    const tasks = await Task.find({ projectId });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
