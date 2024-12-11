import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function MyProfile() {
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/getMyProfile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4 pt-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 shadow-md"></div>
        <p className="text-blue-500 mt-4">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-4 pt-6 bg-red-100 text-red-600 text-center rounded-lg shadow-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-purple-50 via-white to-blue-50 rounded-lg shadow-2xl">
      <div className="flex items-center justify-center mb-6">
        <img
          src={profile.avatar}
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full border-4 border-blue-300 shadow-md hover:scale-105 transition duration-300 ease-in-out"
        />
      </div>
      <h3 className="text-xl font-bold text-center text-gray-800 mb-2">{profile.name}</h3>
      <p className="text-center text-sm font-medium text-gray-600 mb-4">
        {profile.admin ? 'Administrator' : 'Standard User'}
      </p>

      <div className="flex justify-center mt-6">
        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none hover:scale-105 transition duration-300 ease-in-out">
          Edit Profile
        </button>
      </div>
    </div>
  );
}