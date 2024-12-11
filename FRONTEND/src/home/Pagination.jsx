import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Pagination() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items to display per page
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/api/blogs/getAllBlog', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setData(response.data);
    };
    fetchData();
  }, [token]);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-5 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-12 ">
        Latest Blog
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentItems.map(element => (
 <Link
 to={`/blogs/${element._id}`}
 key={element._id}
 className="p-4 bg-white border border-gray-400 rounded-lg shadow-lg mx-2 flex flex-col items-center transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-indigo-500"
>
 {/* Blog Image Section */}
 <div className="relative overflow-hidden rounded-t-lg w-full h-56 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
   <img
     src={element.blogImage.url}
     alt={element.title}
     className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
   />
   <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm shadow-md hover:bg-blue-400 transition-colors duration-300">
     {element.category}
   </div>
 </div>

 {/* Blog Details */}
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
        ))}
      </div>
      <nav className="mt-4">
        <ul className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className="page-item">
              <button
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 border rounded-md transition duration-300 ease-in-out 
                            ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}
                            hover:bg-blue-500 hover:text-white`}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
