import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user.js';

const secret = 'test';

// 1. SIGNIN
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.status(400).json({ message: "Email and password are required." });

        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, role: existingUser.role }, secret, { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

// 2. SIGNUP
export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
        if (!email || !password || !firstName || !lastName) return res.status(400).json({ message: "All fields are required." });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists." });

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match." });

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, role: 'user' });
        
        const token = jwt.sign({ email: result.email, id: result._id, role: result.role }, secret, { expiresIn: "1h" });
        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

// 3. GET ALL USERS (Admin Only)
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// 4. UPDATE PROFILE
export const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id');

    try {
        // SECURITY: Check if user is updating their own profile or is an admin
        if (req.userId !== id && req.userRole !== 'admin') {
            return res.status(403).json({ message: "Unauthorized to update this profile." });
        }

        const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true }).select('-password');
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Update failed." });
    }
};

// 5. DELETE PROFILE
export const deleteProfile = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id');

    try {
        // SECURITY: Only an admin or the account owner can delete
        if (req.userId !== id && req.userRole !== 'admin') {
            return res.status(403).json({ message: "Unauthorized to delete this profile." });
        }

        await User.findByIdAndDelete(id);
        res.json({ message: 'User profile deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: "Delete failed." });
    }
};

// 6. UPDATE USER ROLE (Admin Only)
export const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id');

    try {
        if (!['user', 'admin'].includes(role)) return res.status(400).json({ message: "Invalid role." });

        const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Role update failed." });
    }
};
