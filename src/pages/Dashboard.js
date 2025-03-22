// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        handleLogout(); // Logout on error
      }
    };

    if (token) {
      fetchData();
    } else {
      navigate('/login');
    }
  }, [navigate, token]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      {userData ? (
        <>
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
            Welcome, {userData.name}! 🎉
          </h1>
          <p className="text-gray-600 mb-4 text-center max-w-md">
            You are logged in as <span className="font-semibold">{userData.email}</span>
          </p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105"
          >
            Logout
          </button>
        </>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
