import React, { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import Post from '../Posts/Post/Post';

const AllPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // Sort by newest first, but show EVERYTHING
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <Grow in>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <AppBar 
          position="static" 
          color="inherit" 
          sx={{ 
            borderRadius: 15, 
            margin: '30px 0', 
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '10px'
          }} 
        >
          <Typography variant="h2" align="center" sx={{ color: 'rgba(0,183,255, 1)' }}>
            All Archive Posts
          </Typography>
        </AppBar>
        
        <Grid container spacing={3} alignitems="stretch">
          {sortedPosts.map((post) => (
            <Grid key={post._id} xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
              {/* Note: setCurrentId is omitted here as this is typically a read-only view */}
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Grow>
  );
};

export default AllPosts;
