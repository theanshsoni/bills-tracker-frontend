// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to 'user'
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const userData = {
      username,
      name,
      email,
      password,
      role: role || 'user',
      profilePicture: profilePicture || undefined,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, userData);

      alert('Registration successful! Please log in.');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-300 mb-2">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 mb-2">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-300 mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a strong password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>

        {/* Redirect to Login */}
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{' '}
          <a href="/" className="text-blue-400 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;