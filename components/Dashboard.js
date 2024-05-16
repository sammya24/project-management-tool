// components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectForm from './ProjectForm';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Dashboard = () => {
  const router = useRouter();
  const [userProjects, setUserProjects] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const fetchUserProjects = async () => {
    try {
      const userEmail = localStorage.getItem('user');
      const response = await axios.get(`/api/projects?userEmail=${userEmail}`);
      setUserProjects(response.data);
    } catch (error) {
      console.error('Error fetching user projects:', error);
    }
  };

  useEffect(() => {
    //initial fetch
    fetchUserProjects();

    //fetch timer 5 secs
    const fetchInterval = setInterval(() => {
      fetchUserProjects();
    }, 5000);

    //clean up
    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  return (
    <div>
      <h2>Welcome to your dashboard!</h2>
      
      <button onClick={handleLogout}>Logout</button>

      <h3>Your Projects:</h3>
      <ul>
        {userProjects.map((project) => (
          <li key={project._id}>
            <Link href={`/${project._id}`} legacyBehavior>
              {project.name}
            </Link>
          </li>
        ))}
      </ul>

      <ProjectForm />
    </div>
  );
};

export default Dashboard;
