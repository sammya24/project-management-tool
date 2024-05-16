// pages/api/projects/addComment.js
import connectDB from '../../../utils/connectDB';
import Task from '../../../models/Task';

connectDB();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { taskId } = req.query;
  const { comment } = req.body;

  try {
    //fetch task by taskId
    
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    task.comments = task.comments || [];
    
    //add the comment to the task
    task.comments.push({ text: comment });

    //save the updated task with the new comment
    await task.save();

    //return the updated task with comments
    res.status(200).json(task);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
