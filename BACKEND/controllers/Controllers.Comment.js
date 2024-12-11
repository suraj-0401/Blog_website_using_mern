import express from 'express';
import Comment from '../models/model.comment.js'

//write comment on blogs
export const addComment = async (req, res) => {
    try {
        // Get blog ID from URL parameters
        const blogId = req.params.id;
        // console.log(blogId);
        
        // Get comment content from request body
        const { content } = req.body;
        // Create a new comment instance with blogId and content
        const comment = new Comment({
            blogId,
            content,
            createdAt: new Date()
        });

        // Save the comment to the database
        await comment.save();

        // Return the saved comment as a JSON response
        res.status(201).json(comment);
    } catch (error) {
        // Handle errors
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Error occurred while adding the comment" });
    }
};

//get comment to display on blog pages 
export const getComment = async (req, res) => {
    const blogId = req.params.id;
    // console.log(blogId);
    try {
        const comments = await Comment.find({ blogId });
        if (comments.length === 0) {
            return res.status(404).json({ message: "No comments found for this blog." });
        }
        res.json(comments);
        // console.log(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}





