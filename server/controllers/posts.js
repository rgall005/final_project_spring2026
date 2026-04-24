import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'; 

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    
    // Use req.userId (attached by your auth middleware) to set the creator
    const newPost = new PostMessage({ 
        ...post, 
        creator: req.userId, 
        createdAt: new Date().toISOString() 
    });

    try {        
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, name } = req.body;

    // 1. Critical Fix: Validate the ID format to avoid 404/500 crashes
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try {
        // 2. Use { new: true } to return the post AFTER it was updated
        const updatedPost = await PostMessage.findByIdAndUpdate(
            id, 
            { title, message, name, _id: id }, 
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try {
        await PostMessage.findByIdAndDelete(id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try {
        const post = await PostMessage.findById(id);
        const updatedPost = await PostMessage.findByIdAndUpdate(
            id,
            { $addToSet: { likes: req.userId } },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
