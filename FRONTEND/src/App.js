import React from 'react';
import Navbar from '../src/components/Navbar';
import Home from '../src/components/Home';
import Footer from '../src/components/Footer';
import Blogs from '../src/pages/Blogs';
import Contact from '../src/pages/Contact';
import Creators from '../src/pages/Creators';
import Dashboard from '../src/pages/Dashboard';
import Login from '../src/pages/Login';
import Signup from '../src/pages/Signup';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';
import BlogDetail from './pages/BlogDetails';
import MyBlogs from './dashboard/MyBlogs';
import PageNotFound from './pages/PageNotFound';
import ChatApp from './chatapp/ChatApp';
import Search from './pages/Search';

function App() {
  const location = useLocation();
  const hideNavbarFooter = ['/login', '/signup', '/dashboard'].includes(location.pathname);

  // Retrieve isLoggedIn from localStorage and parse it
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Public routes */}
        <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to='/login' />} />
        <Route path='/home' element={isLoggedIn ? <Home /> : <Navigate to='/login' />} />
        <Route path='/chat' element={isLoggedIn ? <ChatApp /> : <Navigate to='/login' />} />
        <Route path='/blogs' element={isLoggedIn ? <Blogs /> : <Navigate to='/login' />} />
        <Route path='/contact' element={isLoggedIn ? <Contact /> : <Navigate to='/login' />}/>
        <Route path='/creators' element={isLoggedIn ? <Creators /> : <Navigate to='/login' />} />
        
        {/* Protected routes */}
        <Route path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Navigate to='/login' />} />
        <Route path='/search' element={isLoggedIn ? <Search /> : <Navigate to='/login' />} />
        <Route path='/blogs/:id' element={isLoggedIn ? <BlogDetail /> : <Navigate to='/login' />} />
        <Route path='/my-blogs/:id' element={isLoggedIn ? <MyBlogs /> : <Navigate to='/login' />} />

        {/* Fallback route */}
        <Route path='*' element={isLoggedIn ? <PageNotFound /> : <Navigate to='/login' />} />
      </Routes>
      
      {!hideNavbarFooter && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
