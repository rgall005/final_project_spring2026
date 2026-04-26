import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Grow, Container, Grid, Typography } from '@mui/material';

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
                  <Grid container spacing={3} alignitems="stretch">
                    
                    {/* SECTION: MESSAGE BOARD WITH BORDER */}
                    <Grid xs={12}>
                      {/* Centered Label Above Border */}
                      <Typography 
                        variant="h4" 
                        align="center" 
                        sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}
                      >
                        Message Board
                      </Typography>

                      {/* Bold Black Border Wrapper */}
                      <Box 
                        sx={{ 
                          border: '3px solid black', 
                          borderRadius: '15px', 
                          padding: '30px 20px',
                          backgroundColor: '#fff',
                          width: '100%',
                          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
                        }}
                      >
                        <Grid 
                          container 
                          spacing={1} 
                          alignitems="center" 
                          sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: { xs: '1fr', md: '30% 70%' },
                            width: '100%' 
                          }}
                        >
                          {/* LEFT SIDE: Message Form */}
                          <Grid xs={12} md={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                          </Grid>
                          
                          {/* RIGHT SIDE: Posts (Table view) */}
                          <Grid xs={12} md={8}>
                            <Posts setCurrentId={setCurrentId} />
                          </Grid>                    
                        </Grid>
                      </Box>
                    </Grid>
                    
                    {/* BOTTOM SECTION: Business Cards */}
                    <Grid xs={12}>
                      <Box mt={4}>
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
