// pages/api/projects/details.js
import connectDB from '../../../utils/connectDB';
import Task from '../../../models/Task';

connectDB();

export default async function handler(req, res) {
  console.log('Received method:', req.method);
  console.log("MONEU FR DS");

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { taskId } = req.query;

  try {
    //fetch task details by taskId
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
