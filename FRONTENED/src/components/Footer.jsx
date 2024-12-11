import React from 'react';
import { Link } from 'react-router-dom';
function Footer() {
  return (
      <footer className="bg-gradient-to-r from-blue-800 to-blue-800 text-white py-16 px-10">      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* About Section */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-200 leading-relaxed">
              Welcome to our blogging platform! We cover technology, travel, lifestyle, and much more. Stay updated with our latest posts and engaging content.
            </p>
           
          </div>

          {/* Recent Posts */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
            <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
            <ul className="text-gray-200 space-y-3">
              <li><a href="#" className="hover:text-white transition duration-300 ease-in-out">How to Boost Productivity</a></li>
              <li><a href="#" className="hover:text-white transition duration-300 ease-in-out">Top 10 Travel Destinations</a></li>
              <li><a href="#" className="hover:text-white transition duration-300 ease-in-out">Tips for a Healthy Lifestyle</a></li>
              <li><a href="#" className="hover:text-white transition duration-300 ease-in-out">The Future of AI</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <ul className="text-gray-200 space-y-3">
              <li><a href="#" className="hover:text-white transition duration-300 ease-in-out">Technology</a></li>
              <li><a href="#" className="hover:text-white transition duration-300 ease-in-out">Lifestyle</a></li>
              <li><a href="#" className="hover:text-white transition duration-300 ease-in-out">Travel</a></li>
              <li><a href="#" className="hover:text-white transition duration-300 ease-in-out">Health</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-200 leading-relaxed mb-4">
              Get the latest posts and updates delivered straight to your inbox.
            </p>
            <form className="flex flex-col">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 mb-3 focus:ring-2 focus:ring-pink-500"
              />
              <button className="w-full bg-pink-600 py-3 rounded-lg text-white hover:bg-pink-700 transition-colors duration-300">
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
            <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4 text-white">
              <a href="#" className="hover:scale-110 transform transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M22.46 6c-.77 1.36-1.75 2.57-2.91 3.53.01.11.01.22.01.33 0 3.39-2.58 7.29-7.29 7.29-1.45 0-2.8-.42-3.94-1.16.2.02.4.03.6.03 1.21 0 2.32-.41 3.21-1.11-1.14-.02-2.1-.77-2.43-1.8.16.03.33.05.5.05.25 0 .5-.03.74-.07-1.18-.24-2.07-1.28-2.07-2.54v-.03c.35.2.75.33 1.18.35-.7-.47-1.17-1.27-1.17-2.17 0-.48.13-.94.36-1.33 1.3 1.6 3.23 2.66 5.41 2.77-.04-.19-.07-.39-.07-.6 0-1.44 1.17-2.61 2.61-2.61.75 0 1.42.32 1.89.83.59-.11 1.14-.33 1.64-.63-.2.6-.6 1.1-1.13 1.42.53-.07 1.03-.2 1.49-.41-.35.52-.8 1-1.3 1.37z"/></svg>
              </a>
              <a href="#" className="hover:scale-110 transform transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 7.94 9.84v-6.95H7.47v-2.89h2.47v-2.2c0-2.45 1.44-3.79 3.66-3.79 1.06 0 2.17.19 2.17.19v2.37h-1.22c-1.2 0-1.57.75-1.57 1.51v1.92h2.68l-.43 2.89h-2.25v6.95C18.56 20.87 22 16.84 22 12z"/></svg>
              </a>
              <a href="#" className="hover:scale-110 transform transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.79 0 0 .78 0 1.75v20.5C0 23.22.79 24 1.77 24h10.99v-9.33H9.69v-3.64h3.07V8.41c0-3.05 1.86-4.71 4.57-4.71 1.3 0 2.41.1 2.74.15v3.17l-1.88.01c-1.48 0-1.77.7-1.77 1.73v2.27h3.55l-.46 3.64h-3.09V24h6.07c.98 0 1.77-.78 1.77-1.75V1.75C24 .78 23.21 0 22.23 0z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 pt-6 text-center">
          <p className="text-gray-100 text-sm">&copy; 2024 Blogging Website. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
