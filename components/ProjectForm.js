// components/ProjectForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = () => {
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    startDate: '', 
    admin: '',
    members: [],
  });

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      
      projectData.admin = localStorage.getItem('user');
      projectData.members.push(localStorage.getItem('user'));
  
      
      //send a POST request to API endpoint
      const response = await axios.post('/api/projects/create', projectData);
      console.log('Project submitted:', response.data);
      
      //reset form fields
      setProjectData({ name: '', description: '', startDate: '', admin: '', members: []});
    } catch (error) {
      console.error('Project submission error:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>Project Name:</label>
      <input type="text" name="name" value={projectData.name} onChange={handleChange} required />

      <label>Description:</label>
      <textarea name="description" value={projectData.description} onChange={handleChange} required />

      <label>Start Date:</label>
      <input
        type="date"
        name="startDate"
        value={projectData.startDate}
        onChange={handleChange}
        required
      />

      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectForm;
