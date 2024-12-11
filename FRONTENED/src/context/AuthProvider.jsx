import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create the AuthContext
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null); // Changed to null for better initial state management
  const [userData, setUserData] = useState(null); // State for user data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user data from local storage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData)); // Parse and set user data if it exists and is valid JSON
      } catch (parseError) {
        console.error("Error parsing stored user data:", parseError);
        setUserData(null); // Reset userData if parsing fails
      }
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token'); // or wherever you store the token
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const { data } = await axios.get("http://localhost:3000/api/users/getMyProfile", { headers });
        setProfile(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token'); // or wherever you store the token
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const { data } = await axios.get("http://localhost:3000/api/blogs/getAllBlog", { headers });
        setBlogs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ blogs, profile, userData, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
// Custom hook to use blogs, profile, and user data from context
export const useAuth = () => {
  const { blogs, profile, userData, error, loading } = useContext(AuthContext);
  return { blogs, profile, userData, error, loading };
};
