import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';

const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// 2. Routes
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

// 3. Database & Server
// Added 'VMRC_DB' to the URL to name the database
const CONNECTION_URL = 'mongodb+srv://rgall005:hobbles313@cluster0.5vmkssw.mongodb.net/VMRC_DB?appName=Cluster0';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.error(error.message));
