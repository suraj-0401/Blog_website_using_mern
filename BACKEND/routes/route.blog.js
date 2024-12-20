import express from 'express';
import {createBlog,deleteBlog, getAllBlogs, getSingleBlog, getMyBlog,updateBlog, getRelatedBlog  } from '../controllers/Controllers.Blog.js'; // Use import for ESM, add .js extension
import {isAuthenticated,authorizeRoles} from '../middleware/authUser.js'

const router = express.Router();

// Define the route
router.post('/createBlog',isAuthenticated,createBlog);
router.delete("/deleteBlog/:id",isAuthenticated,authorizeRoles('admin'),deleteBlog)
router.put('/updateBlog/:id',isAuthenticated,authorizeRoles('admin'),updateBlog);
router.get('/getAllBlog',isAuthenticated,getAllBlogs)
router.get('/getSingleBlog/:id',isAuthenticated,getSingleBlog)
router.get('/getMyBlog/:id',isAuthenticated,authorizeRoles('admin'),getMyBlog)
router.get('/getRelatedBlog',getRelatedBlog);

// Export the router
export default router;

