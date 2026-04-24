import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '' });
  // Add state for validation feedback
  const [error, setError] = useState(false); 
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '' });
    setError(false); // Reset error state on clear
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDATION: Ensure title and message are not just whitespace
    if (!postData.title.trim() || !postData.message.trim()) {
      setError(true);
      return; // Stop the function from submitting
    }

    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name || user?.profile?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name || user?.profile?.name }));
    }
    clear();
  };

  if (!user?.result?.name && !user?.profile?.name) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" align="center">Please sign in to create posts.</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Message</Typography>
        
        <TextField 
          name="title" 
          variant="outlined" 
          label="Title" 
          fullWidth 
          required
          error={error && !postData.title.trim()} // Highlight red if empty
          value={postData.title} 
          onChange={(e) => {
            setPostData({ ...postData, title: e.target.value });
            if (error) setError(false); // Clear error while typing
          }} 
          sx={{ mb: 2, mt: 1 }} 
        />

        <TextField 
          name="message" 
          variant="outlined" 
          label="Message" 
          fullWidth 
          multiline 
          rows={4} 
          required
          error={error && !postData.message.trim()} // Highlight red if empty
          helperText={error && !postData.message.trim() ? "Message cannot be blank" : ""}
          value={postData.message} 
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value });
            if (error) setError(false); // Clear error while typing
          }} 
          sx={{ mb: 2 }} 
        />

        <Button variant="contained" color="primary" size="large" type="submit" fullWidth sx={{ mb: 1 }}>Submit</Button>
        <Button variant="contained" color="error" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
