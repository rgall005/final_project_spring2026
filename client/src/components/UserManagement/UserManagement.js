import React, { useEffect } from 'react';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers, changeRole, removeUser } from '../../actions/users';

const UserManagement = () => {
    const dispatch = useDispatch();
    
    // Connect to the real users array in your Redux store
    const users = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#003366' }}>
                Team Management
            </Typography>
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Box sx={{ 
                                        display: 'inline-block', 
                                        padding: '4px 8px', 
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        backgroundColor: user.role === 'admin' ? '#F37021' : '#e0e0e0',
                                        color: user.role === 'admin' ? '#fff' : '#000'
                                    }}>
                                        {user.role.toUpperCase()}
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Button 
                                        variant="outlined" 
                                        size="small" 
                                        sx={{ mr: 1 }}
                                        onClick={() => dispatch(changeRole(user._id, user.role === 'admin' ? 'user' : 'admin'))}
                                    >
                                        {user.role === 'admin' ? 'Demote' : 'Promote'}
                                    </Button>
                                    <Button 
                                        color="error" 
                                        variant="contained" 
                                        size="small"
                                        onClick={() => {
                                            if(window.confirm('Are you sure you want to remove this user?')) {
                                                dispatch(removeUser(user._id));
                                            }
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default UserManagement;
