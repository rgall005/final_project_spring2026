import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js'; // Import your middleware

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);          // Add auth here
router.patch('/:id', auth, updatePost);      // Add auth here
router.delete('/:id', auth, deletePost);    // Add auth here
router.patch('/:id/likePost', auth, likePost); // Add auth here

export default router;
