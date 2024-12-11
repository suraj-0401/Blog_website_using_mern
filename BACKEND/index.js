import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary'; 
import cookieParser from 'cookie-parser'; 
import userRoute from './routes/route.user.js'; 
import blogRoute from './routes/route.blog.js'; 
import commentRoute from './routes/route.comment.js';
import http from 'http'; // Import http module
import { Server } from 'socket.io'; // Correct import for Socket.IO
import path from 'path';
dotenv.config(); 
const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, { cors: { origin: '*' } }); // Initialize Socket.IO with the server

// path 
const _dirname=path.resolve();


app.use(cors({
  origin: 'http://localhost:3001', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.options('*', cors()); 

app.use(cookieParser()); 
app.use(express.json()); 

const port = process.env.PORT; // Default to 3000 if PORT is not set
const MONGO_URL = process.env.MONGO_URL; // No default value

// Input Validation - Check if MongoDB URL is provided
if (!MONGO_URL) {
  console.error('MONGO_URL environment variable is not set');
  process.exit(1);
}

// Setup express-fileupload for handling file uploads
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/temp/",
}));

// Cloudinary Configuration for file uploads
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY
});

// MongoDB Connection
mongoose.connect(MONGO_URL) 
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// // Routes
// app.get('/', (req, res) => {
//   res.send('Hello World, Suraj!');
// });

app.use('/api/users', userRoute); // User-related routes
app.use('/api/blogs', blogRoute); // Blog-related routes
app.use('/api/comment', commentRoute); // Comment routes

// Socket.io connection for real-time updates
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


// join with frontened 
app.use(express.static(path.join(_dirname,'/FRONTEND/build')))

app.get('*',(_,res)=>{
  res.sendFile(path.resolve(_dirname,"FRONTEND","build","index.html"))
})


// Start the server
server.listen(port, () => { // Use server to listen
  console.log(`Server running on port ${port}`);
}).on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});


