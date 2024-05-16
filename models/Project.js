// models/Project.js
const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  admin: { type: String, required: true },
  members: [{ type: String }],

});

let Project;

try {
  Project = mongoose.model('Project');
} catch (error) {
  Project = mongoose.model('Project', projectSchema);
}

module.exports = Project;
