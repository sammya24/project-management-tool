// pages/dashboard.js
import React, { useEffect, useState } from 'react';
import DashboardComponent from '../components/Dashboard';
import { useRouter } from 'next/router';
import axios from 'axios';

const DashboardPage = () => {
  const router = useRouter();
  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.replace('/landingpage');
    } else {
      const userEmail = localStorage.getItem('user');

      axios.get(`/api/projects?userEmail=${userEmail}`)
        .then(response => setUserProjects(response.data))
        .catch(error => console.error('Error fetching user projects:', error));
    }
  }, []); 

  return <DashboardComponent userProjects={userProjects} />;
};

export default DashboardPage;
