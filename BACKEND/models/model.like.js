import express from 'express';
import mongoose from 'mongoose';
const Like=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    likeType: {
        type: String,
        enum: ['like', 'dislike'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})