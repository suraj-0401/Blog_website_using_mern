import React, { useState } from 'react';
import './Login.css'; // Import external CSS file for styles
import { Link, useNavigate } from 'react-router-dom'; // Correct import
import axios from 'axios';
import toast from 'react-hot-toast';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const photoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('photo', photo);

    try {
      const { data } = await axios.post('http://localhost:3000/api/users/register', formData);
      console.log(data);
      toast.success("User Registered successfully");

      // Navigate to login page on successful signup
      navigate('/login');

      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setPhoto(null);
      setPhotoPreview("");
    } catch (error) {
      console.log(error);
      toast.error('Failed to register user. Please try again.');
    }
  };

  return (
    <div className="h-screen flex">
      <div className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center">
        <div className="bg-black opacity-20 inset-0 z-0"></div>
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl font-sans">Simple App</h1>
          <p className="text-white mt-1">The simplest app to use</p>
          <div className="flex justify-center lg:justify-start mt-6">
            <Link to="#" className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">Get Started</Link>
          </div>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <form className="bg-white rounded-md shadow-lg p-4" onSubmit={handleSignup}>
            <h1 className="text-gray-800 text-xl font-bold mb-2">Hello Again!</h1>
            <p className="text-sm text-gray-600 mb-6">Welcome Back</p>

            <div className="flex items-center border mb-4 py-1 px-2 rounded-lg">
              <select name="role" className="w-full outline-none border-none" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Your Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex items-center border mb-4 py-1 px-2 rounded-lg">
              <input id="name" className="w-full outline-none border-none" type="text" name="name" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="flex items-center border mb-4 py-1 px-2 rounded-lg">
              <input id="email" className="w-full outline-none border-none" type="email" name="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="flex items-center border mb-4 py-1 px-2 rounded-lg">
              <input id="phone" className="w-full outline-none border-none" type="tel" name="phone" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="flex items-center border mb-6 py-1 px-2 rounded-lg">
              <input className="w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="flex items-center border mb-6 py-1 px-2 rounded-lg">
              <input id="photo" className="w-full outline-none border-none" type="file" name="photo" onChange={photoHandler} />
            </div>

            {photoPreview && (
              <div className="mb-4">
                <img src={photoPreview} alt="Preview" className="w-16 h-16 object-cover rounded-full" />
              </div>
            )}
            <button type="submit" className="block w-full bg-indigo-600 py-1 rounded-lg hover:bg-indigo-700 transition text-white font-semibold">Signup</button>

            <div className="flex justify-between mt-4">
              <Link to="/login" className="text-sm hover:text-blue-500">Already have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
