import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Container, Link, IconButton, InputAdornment, Alert, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (isRegister && formData.password !== formData.confirmPassword) {
      return setErrorMsg("Passwords do not match.");
    }

    try {
      const { data } = isRegister ? await api.signUp(formData) : await api.signIn(formData);
      dispatch({ type: 'AUTH', data });
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong.";
      setErrorMsg(message);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const switchMode = () => {
    setIsRegister((prev) => !prev);
    setErrorMsg('');
    setShowPassword(false);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignitems: 'center' }}>
        <Paper elevation={10} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>{isRegister ? 'Register' : 'Login'}</Typography>
          
          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isRegister && (
                <>
                  {/* Changed xs={6} to xs={12} for full width */}
                  <Grid xs={12}>
                    <TextField name="firstName" label="First Name" fullWidth onChange={handleChange} required autoFocus />
                  </Grid>
                  <Grid xs={12}>
                    <TextField name="lastName" label="Last Name" fullWidth onChange={handleChange} required />
                  </Grid>
                </>
              )}
              <Grid xs={12}>
                <TextField name="email" label="Email Address" type="email" fullWidth onChange={handleChange} required />
              </Grid>
              <Grid xs={12}>
                <TextField 
                  name="password" 
                  label="Password" 
                  type={showPassword ? 'text' : 'password'} 
                  fullWidth 
                  onChange={handleChange} 
                  required 
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {isRegister && (
                <Grid xs={12}>
                  <TextField name="confirmPassword" label="Confirm Password" type="password" fullWidth onChange={handleChange} required />
                </Grid>
              )}
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, bgcolor: '#212529', py: 1.5 }}>
              {isRegister ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>
          
          <Link component="button" onClick={switchMode} sx={{ mt: 2, display: 'block', margin: '0 auto', textAlign: 'center' }}>
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Sign up"}
          </Link>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthPage;
