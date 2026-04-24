import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,      // Add this to store the display name (e.g., "John Doe")
  creator: String,   // Stores the user ID (from req.userId)
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],  // Change this to an array of IDs to track who liked what
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
