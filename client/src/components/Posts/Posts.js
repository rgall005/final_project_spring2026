import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, Box, Typography 
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deletePost } from '../../actions/posts';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  
  // Get current user information
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?.googleId || user?.result?._id;
  const isAdmin = user?.result?.role === 'admin';

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '15px', border: '1px solid #e0e0e0' }}>
        <Table 
          sx={{ 
            minWidth: 650,
            '& .MuiTableCell-root': { fontSize: '0.8rem', padding: '10px' } 
          }}
        >
          <TableHead sx={{ backgroundColor: '#f9f9f9' }}>
            <TableRow>
              <TableCell><strong>TITLE</strong></TableCell>
              <TableCell><strong>MESSAGE</strong></TableCell>
              <TableCell><strong>AUTHOR</strong></TableCell>
              <TableCell><strong>DATE</strong></TableCell>
              <TableCell align="center"><strong>ACTIONS</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentPosts.map((post) => (
              <TableRow key={post._id} hover>
                <TableCell>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {post.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  {post.message?.length > 25 ? `${post.message.substring(0, 25)}...` : post.message}
                </TableCell>
                <TableCell>{post.name}</TableCell> 
                <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    {/* Only show Edit/Delete if user is the Creator OR is an Admin */}
                    {(isAdmin || userId === post?.creator) ? (
                      <>
                        <Button 
                          size="small" 
                          variant="outlined"
                          color="primary" 
                          onClick={() => setCurrentId(post._id)}
                          sx={{ fontSize: '0.7rem', minWidth: '70px' }}
                        >
                          <EditIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} /> Edit
                        </Button>
                        <Button 
                          size="small" 
                          variant="outlined"
                          color="error" 
                          onClick={() => dispatch(deletePost(post._id))}
                          sx={{ fontSize: '0.7rem', minWidth: '70px' }}
                        >
                          <DeleteIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} /> Delete
                        </Button>
                      </>
                    ) : (
                      <Typography variant="caption" color="textSecondary">Read Only</Typography>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box mt={3} display="flex" justifyContent="center">
        <Button 
          component={Link} 
          to="/all-posts" 
          target="_blank" 
          variant="contained" 
          color="primary"
          sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold', mt: 2.5 }}
        >
          View All Posts
        </Button>
      </Box>
    </Box>
  );
};

export default Posts;
