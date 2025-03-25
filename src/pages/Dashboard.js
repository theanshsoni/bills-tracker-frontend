import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Properties');
  const [properties, setProperties] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch user details using the /profile endpoint
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log("User Profile Response:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error?.response?.data || error.message);
        navigate('/'); // Redirect to login if unauthorized
      }
    };

    fetchUserProfile();
    fetchProperties();
  }, [navigate, activeTab]);

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/properties`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("Properties Response:", response.data);
      if (response.status === 200 && Array.isArray(response.data)) {
        setProperties(response.data);
      } else {
        console.error("Unexpected API response:", response.data);
        setProperties([]);
      }
    } catch (error) {
      console.error('Error fetching properties:', error?.response?.data || error.message);
      setProperties([]);
    }
  };

  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (property.userId?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const renderTable = () => (
    <div className="table-container">
      <input
        type="text"
        className="search-box"
        placeholder="Search by property or user name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Property Name</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <tr key={property._id}>
                <td>{property.name}</td>
                <td>{property.userId?.name || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No properties found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="dashboard">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="left">
          <img src="/favicon.ico" alt="Logo" className="logo" />
          <span className="logo-text">Dashboard</span>
        </div>

        <div className="center">
          <button onClick={() => setActiveTab('Properties')}>Properties</button>
          <button onClick={() => setActiveTab('Bills')}>Bills</button>
          <button onClick={() => setActiveTab('Payments')}>Payments</button>
          {isAdmin && <button onClick={() => setActiveTab('Users')}>Users</button>}
        </div>

        <div className="right">
          <span>{user?.name || 'Guest'}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Tab Content */}
      <div className="content">
        {activeTab === 'Properties' && renderTable()}
        {activeTab === 'Bills' && <p>Bills content goes here...</p>}
        {activeTab === 'Payments' && <p>Payments content goes here...</p>}
        {activeTab === 'Users' && isAdmin && <p>Users management goes here...</p>}
      </div>
    </div>
  );
};

export default Dashboard;
