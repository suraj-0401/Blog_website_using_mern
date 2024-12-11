import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import RelatedBlog from './RelatedBlog';

function BlogDetail() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]); // State to hold comments
  const { blogs } = useAuth();
  const { id } = useParams(); // Get the blog ID from route parameters
  const blog = blogs.find((blog) => blog._id === id);

  // Fetch comments when the component mounts or when the blog ID changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/comment/blogs/${id}/getComment`);
        setComments(response.data); // Assuming the response data is the array of comments
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [id]);

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-semibold">Blog not found</p>
      </div>
    );
  }

  const addComment = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const response = await axios.post(`http://localhost:3000/api/comment/blogs/${id}/addComment`, {
        content: comment,
      });
      console.log('Comment added:', response.data);
      setComments((prevComments) => [...prevComments, response.data]); // Add the new comment to the state
      setComment(''); // Clear the comment input after submission
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const shareUrl = encodeURIComponent(window.location.href);
  return (
    <div className="blog-detail-container p-8 bg-gray-50 md:flex md:items-start space-x-8 transition-all duration-300 mt-32">
      {/* Left Side: Image */}
      <div className="md:w-1/2 mb-6 md:mb-0">
        <img
          src={blog.blogImage.url}
          alt={blog.title}
          className="w-full h-full object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Right Side: Blog Content */}
      <div className="md:w-1/2">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 leading-tight">{blog.title}</h1>
        <div className="flex items-center mb-4">
          <img
            src={blog.adminImage || 'https://via.placeholder.com/150'}
            alt={blog.adminName}
            className="w-16 h-16 sm:w-24 sm:h-24 md:w-20 md:h-20 lg:w-32 lg:h-20 xl:w-20 xl:h-32 2xl:w-32 2xl:h-32 rounded-full object-cover shadow-lg border-2 border-indigo-500 transform hover:rotate-6 transition-transform"
          />
          <div className="ml-4">
            <p className="text-lg font-semibold text-gray-700">{blog.adminName}</p>
            <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">{blog.content}</p>

        {/* Social Share Buttons */}
        <button
          onClick={() => {
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
              '_blank',
              'noopener,noreferrer'
            );
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
        >
          Share on Facebook
        </button>

        {/* Twitter Share Button */}
        <button
          onClick={() => {
            window.open(
              `https://twitter.com/intent/tweet?url=${shareUrl}&text=Check this out!`,
              '_blank',
              'noopener,noreferrer'
            );
          }}
          className="px-4 py-2 bg-blue-300 text-white rounded-full hover:bg-blue-400 transition-all"
        >
          Share on Twitter
        </button>

        {/* Comments Section */}
        <form onSubmit={addComment} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Comments
          </label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition duration-300"
          >
            Submit
          </button>
        </form>

        {/* Display Comments */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Comments</h2>
          {comments.length === 0 ? (
            <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            <ul className="space-y-2">
              {comments.map((comment, index) => (
                <li key={index} className="border-b py-2">
                  <p className="text-gray-700">{comment.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <RelatedBlog/>
    </div>
  );
}

export default BlogDetail;
