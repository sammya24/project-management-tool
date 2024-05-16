// pages/projects/[projectId].js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ProjectDetails = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const [projectDetails, setProjectDetails] = useState(null);
  const [taskForm, setTaskForm] = useState({
    description: '',
    deadline: '',
    assignedTo: '',
  });
  const [invitationForm, setInvitationForm] = useState({
    userEmail: '',
    allUsers: [], //added state to store all users from the database
  });
  const [usersInProject, setUsersInProject] = useState([]);
  const [tasks, setTasks] = useState([]);

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(`/api/projects/${projectId}`);
      setProjectDetails(response.data);
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`/api/users`); 
      setInvitationForm((prevForm) => ({ ...prevForm, allUsers: response.data }));
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  };

  const fetchUsersInProject = async () => {
    try {
      const response = await axios.get(`/api/projects/users?projectId=${projectId}`);
      setUsersInProject(response.data);
    } catch (error) {
      console.error('Error fetching users in project:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/api/projects/tasks?projectId=${projectId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskFormChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleInvitationFormChange = (e) => {
    setInvitationForm({ ...invitationForm, [e.target.name]: e.target.value });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      if (!projectId) {
        console.error('Project ID is undefined');
        return;
      }
    
      const payload = { projectId, ...taskForm, status: 'to-do', comments:[{text: "hi"}] };
      console.log("DA PAYLOAD OS ARRIVING ");
      console.log(payload);
    await axios.post(`/api/projects/createTask`, payload);
    
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleInviteUser = async (e) => {
    e.preventDefault();

    try {
      if (!projectId) {
        console.error('Project ID is undefined');
        return;
      }

      const payload = { projectId, userEmail: invitationForm.userEmail };

      //send the invitation to the backend
      await axios.post(`/api/projects/inviteUser`, payload);

      //update the project members in the frontend
      setUsersInProject((prevUsers) => [...prevUsers, invitationForm.userEmail]);
    } catch (error) {
      console.error('Error inviting user:', error);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProjectDetails();
      fetchAllUsers();
      fetchUsersInProject();
      fetchTasks();

      const tasksIntervalId = setInterval(() => {
        fetchTasks();
      }, 5000);

    const usersIntervalId = setInterval(() => {
      fetchUsersInProject();
      fetchAllUsers(); 
    }, 5000);


      return () => {
        clearInterval(tasksIntervalId);
        clearInterval(usersIntervalId);
      };
    }
  }, [projectId]);

  if (!projectDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Project Details</h2>
      <p>Name: {projectDetails.name}</p>
      <p>Description: {projectDetails.description}</p>

      <h3>Invite User</h3>
      <form onSubmit={handleInviteUser}>
     
        <label>
          Select User:
          <select
            name="userEmail"
            value={invitationForm.userEmail}
            onChange={handleInvitationFormChange}
            required
          >
            <option value="" disabled>Select User</option>
            {invitationForm.allUsers.map((user) => (
              <option key={user._id} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Invite</button>
      </form>



      <h3>Users in Project</h3>
      <ul>
        {usersInProject.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>

      <h3>Add Task</h3>
      <form onSubmit={handleAddTask}>
      <label>
          Description:
          <input
            type="text"
            name="description"
            value={taskForm.description}
            onChange={handleTaskFormChange}
            required
          />
        </label>
        <label>
          Deadline:
          <input
            type="date"
            name="deadline"
            value={taskForm.deadline}
            onChange={handleTaskFormChange}
          />
        </label>
        <label>
          Assigned To:
          <select
            name="assignedTo"
            value={taskForm.assignedTo}
            onChange={handleTaskFormChange}
          >
            <option value="">Select User</option>
            {usersInProject.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Task</button>
       
      </form>

      <h3>Tasks</h3>
<ul>
  {tasks.map((task) => (
    <li key={task._id}>
      
      <Link href={`/tasks/${task._id}`}>
        {task.description} - Deadline: {new Date(task.deadline).toLocaleDateString()} - Status: {task.status}
      </Link>
    </li>
  ))}
</ul>


      
    </div>
  );
};

export default ProjectDetails;


