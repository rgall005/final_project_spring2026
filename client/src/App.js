import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Grow, Container, Grid } from '@mui/material';

import Posts from './components/Posts/Posts';
import AllPosts from './components/AllPosts/AllPosts';
import Form from './components/Form/Form';
import BusinessCardBuilder from './components/BusinessCard/BusinessCardBuilder';
import Auth from './components/AuthPage';
import Navbar from './components/Navbar/Navbar';
import UserManagement from './components/UserManagement/UserManagement';
import { getPosts } from './actions/posts';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentId, setCurrentId] = useState(0);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <main style={{ width: '100%' }}>
      {!user?.result ? (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Auth />
        </div>
      ) : (
        <Grow in>
          <Container maxWidth="lg">
            <Navbar />
            <Routes>
              <Route path="/" element={
                  /* Grid container manages the 12-column layout */
                  <Grid container spacing={3} alignitems="stretch">
                    <Grid container spacing={4} alignitems="center" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '30% 70%' }}}>
                    {/* LEFT SIDE: Message Form (4/12 columns on medium+ screens) */}
                    <Grid xs={12} md={4}>
                      <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                    
                    {/* RIGHT SIDE: Posts (8/12 columns on medium+ screens) */}
                    <Grid xs={12} md={8}>
                      <Posts setCurrentId={setCurrentId} />
                    </Grid>                    
                    </Grid>
                    
                    {/* BOTTOM: Business Cards (spans all 12 columns) */}
                    <Grid xs={12}>
                      <Box mt={2}>
                        <BusinessCardBuilder />
                      </Box>
                    </Grid>
                  </Grid>
                } 
              />

              <Route path="/all-posts" element={<AllPosts />} />

              <Route 
                path="/users" 
                element={
                  user?.result?.role === 'admin' ? <UserManagement /> : <Navigate to="/" />
                } 
              />
            </Routes>
          </Container>
        </Grow>
      )}
    </main>
  );
};

export default App;