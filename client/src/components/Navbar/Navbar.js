import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { AppBar, Typography, Toolbar, Avatar, Button, Box } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Wrapped in useCallback to prevent the function from being recreated on every render
  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    setUser(null);
    navigate('/'); 
  }, [dispatch, navigate]);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'));
    const token = storedProfile?.token;

    if (token) {
      if (token.split('.').length === 3) {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp * 1000 < new Date().getTime()) {
            logout();
          }
        } catch (error) {
          console.error("Token error:", error.message);
          logout();
        }
      }
    }

    setUser(storedProfile);
  }, [location, logout]); // Added logout here to satisfy ESLint

  return (
    <AppBar position="static" color="inherit" sx={{ marginBottom: '20px', borderRadius: '5px' }}>
      <Toolbar>
        <Typography component={Link} to="/" variant="h4" sx={{ flexGrow: 1, textDecoration: 'none', color: '#003366', fontWeight: 'bold' }}>
          VAWS Tools
        </Typography>

        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            
            {user?.result?.role === 'admin' && (
              <Button component={Link} to="/users" color="primary" variant="outlined">
                Manage Users
              </Button>
            )}
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Avatar alt={user?.result?.name}>
                {user?.result?.name?.charAt(0) || 'U'}
              </Avatar>
              <Typography variant="h6">{user?.result?.name}</Typography>
            </Box>

            <Button variant="contained" color="error" onClick={logout}>Logout</Button>
          </Box>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
