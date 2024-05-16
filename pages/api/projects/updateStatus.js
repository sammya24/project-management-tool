// pages/api/tasks/updateStatus.js
import connectDB from '../../../utils/connectDB';
import Task from '../../../models/Task';

connectDB();

export default async function handler(req, res) {
  console.log('Received method:', req.method);
    console.log("WHY");
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { status } = req.body;

  try {
    
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.query.taskId }, 
      { $set: { status } },
      { new: true } 
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
