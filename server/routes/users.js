import express from 'express';
import { signin, signup, updateProfile, deleteProfile, getUsers, updateUserRole } from '../controllers/user.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

// Public routes
router.post('/signin', signin);
router.post('/signup', signup);

// Admin-only routes
// GET /users (Fetches the list for User Management)
router.get('/', auth, admin, getUsers); 

// PATCH /users/:id/role (Promote/Demote users)
router.patch('/:id/role', auth, admin, updateUserRole);

// User or Admin routes
// Only the owner or an admin can hit these (logic is in the controller)
router.put('/profile/:id', auth, updateProfile);
router.delete('/profile/:id', auth, deleteProfile); 

export default router;
