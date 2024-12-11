import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Blog() {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ffffff");

  const token=localStorage.getItem('token');
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/blogs/getAllBlog', {
          headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`,

          },
          withCredentials: true,
        });
        
        const blogsArray = Array.isArray(response.data) ? response.data : [];
        
        setData(blogsArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterData = (value) => {
    setInput(value);
    const filteredData = data.filter(item =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setResult(filteredData);
  };

  return (
    <div className="hero-container p-8 bg-gray-100 mt-20">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
        Blogs
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-full max-w-md transition duration-200 ease-in-out hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            value={input}
            onChange={(e) => handleFilterData(e.target.value)}
            type="text"
            placeholder="Search blogs by title..."
            className="flex-grow bg-transparent focus:outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center mt-32">
          <ClipLoader color={color} loading={loading} cssOverride={override} size={150} />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {result.length > 0 ? (
            result.map((element) => (
              <Link 
                to={`/blogs/${element._id}`} 
                key={element._id} 
                className="p-4 bg-white border border-gray-400 rounded-lg shadow-lg mx-2 flex flex-col items-center transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-indigo-500"
              >
                <div className="w-full h-48 bg-gray-200 relative">
                  <img 
                    src={element.blogImage.url} 
                    alt={element.title} 
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300" 
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm shadow-md hover:bg-blue-400 transition-colors duration-300">
                    {element.category}
                  </div>
                </div>
                <div className="p-5 bg-gray-50 rounded-b-lg h-36 w-full flex flex-col justify-between transition-colors duration-300 hover:bg-gray-100">
                  <h2 className="text-lg font-bold mb-2 text-gray-800 truncate">
                    {element.title}
                  </h2>
                  <div className="flex items-center">
                    <img
                      src={element.adminImage || "https://via.placeholder.com/150"}
                      alt={element.adminName}
                      className="w-12 h-12 rounded-full object-cover mr-3 border-4 border-indigo-500 transition-transform duration-300 hover:rotate-6 hover:scale-110"
                    />
                    <div className="ml-2">
                      <p className="text-sm font-medium text-gray-700">{element.adminName}</p>
                      <p className="text-xs text-gray-500">Published Recently</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-600">No blogs available</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Blog;
