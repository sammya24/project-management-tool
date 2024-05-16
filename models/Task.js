// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date },
  assignedTo: { type: String },
  status: { type: String}, 
  comments: [{ text: String }],
});

let Task;

try {
  Task = mongoose.model('Task');
} catch (error) {

  Task = mongoose.model('Task', taskSchema);
}

module.exports = Task;
