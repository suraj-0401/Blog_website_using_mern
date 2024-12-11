import React from 'react';

function PageNotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      {/* Icon or Illustration */}
      <div className="text-8xl text-blue-600 font-bold mb-4">
        404
      </div>

      {/* Error Message */}
      <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-2">
        Oops! Page Not Found
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-center px-4 md:px-0 mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>

      {/* Go Back Button */}
      <button 
        className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm md:text-base hover:bg-blue-700 transition duration-300"
        onClick={() => window.location.href = '/'}
      >
        Go to Homepage
      </button>
    </div>
  );
}

export default PageNotFound;
