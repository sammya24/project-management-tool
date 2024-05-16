// pages/api/projects/comments.js
import connectDB from '../../../utils/connectDB';
import Task from '../../../models/Task';

connectDB();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { taskId } = req.query;


  try {

    const task = await Task.findById(taskId);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      task.comments = task.comments || [];
  
      res.status(200).json({ comments: task.comments });
   
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
