import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  photo: {
    public_id:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true,
    }
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    // default: 'user',
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

// Export the User model
export { User };