import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Hero() {
  const { blogs } = useAuth();
  
  return (
    <div className="hero-container p-8 bg-gray-100 mt-20">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
        Feactured Blogs
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 4).map((element) => {
            console.log(element.adminImage); // Check the admin image data
            return (
              <Link
                to={`/blogs/${element._id}`}
                key={element._id}
                className="p-4 bg-white border border-gray-400 rounded-lg shadow-lg mx-2 flex flex-col items-center transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-indigo-500"
              >
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
                <div className="p-5 bg-gray-50 rounded-b-lg h-36 w-full flex flex-col justify-between transition-colors duration-300 hover:bg-gray-100">
                  <h2 className="text-lg font-bold mb-2 text-gray-800 truncate">
                    {element.title}
                  </h2>
                  <div className="flex items-center">
                    <img
                      src={element.adminImage || "https://via.placeholder.com/150"} // Fallback in case of missing image
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
            );
          })
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-600">No blogs available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;
