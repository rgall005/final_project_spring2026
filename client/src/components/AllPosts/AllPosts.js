import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid, Box, Button, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import Post from '../Posts/Post/Post';
import Form from '../Form/Form';

const AllPosts = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <AppBar 
          position="static" 
          color="inherit" 
          sx={{ borderRadius: 15, margin: '30px 0', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '10px' }} 
        >
          <Typography variant="h2" align="center" sx={{ color: 'rgba(0,183,255, 1)' }}>
            All Posts
          </Typography>
        </AppBar>
        
        <Grid container sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }} justifyContent="space-between" alignItems="stretch" spacing={3}>
          
          {/* POSTS SECTION - Takes full width (12) if form is hidden, otherwise takes (9) */}
          <Grid item xs={12} sm={12} md={currentId ? 9 : 12}>
            <Grid container spacing={3}>
              {sortedPosts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={currentId ? 6 : 4} lg={currentId ? 4 : 3}>
                  <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* STICKY FORM - Only renders if currentId is NOT null */}
          {currentId && (
            <Grid item xs={12} sm={12} md={3}>
              <Box 
                sx={{ 
                  position: 'sticky', 
                  top: '100px', 
                  alignSelf: 'flex-start'
                }}
              >
                <Paper sx={{ padding: 2, position: 'relative', borderRadius: '15px' }} elevation={6}>
                   {/* Close Button to hide form manually */}
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small" 
                    onClick={() => setCurrentId(null)} 
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    Close Editor
                  </Button>
                  
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Paper>
              </Box>
            </Grid>
          )}
          
        </Grid>
      </Container>
    </Grow>
  );
};

export default AllPosts;
