// pages/api/tasks/createTask.js
import connectDB from '../../../utils/connectDB';
import Task from '../../../models/Task';

export default async function handler(req, res) {
  console.log('Received method:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { projectId, description, deadline, assignedTo, status, comments } = req.body;

  try {
    //create a new task with 'status' set to 'to-do'
    //console.log()
    console.log("comments");
    console.log(comments);
    const task = await Task.create({ projectId, description, deadline, assignedTo, status, comments});
    console.log(task);

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

