import React from 'react';
import { Grid, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Post from './Post/Post';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  
  // 1. Limit to the 10 most recent posts
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container alignitems="stretch" spacing={3}>
        {recentPosts.map((post) => (
          // 2. Change to 3 columns on medium screens (md={4})
          <Grid key={post._id} xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
      
      {/* 3. Link to view all posts in a new tab */}
      <Box mt={4} display="flex" justifycontent="center">
        <Button 
          component={Link} 
          to="/all-posts" 
          target="_blank" 
          variant="contained" 
          color="primary"
        >
          View All Posts
        </Button>
      </Box>
    </Box>
  );
};

export default Posts;
