import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Typography, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { MoreVert, Edit, Delete, Person } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(post._id));
    }
    handleClose();
  };

  const userId = user?.result?._id || user?.result?.googleId;
  const isAdmin = user?.result?.role === 'admin'; // Adjust 'role' based on your JWT/User object
  const isCreator = userId && post?.creator && String(userId) === String(post?.creator);
  const canManage = isCreator || isAdmin;

  console.log({
  currentUserId: userId,
  postCreatorId: post?.creator,
  typesMatch: typeof userId === typeof post?.creator,
  isCreatorResult: isCreator
});

  return (
    <Card sx={{ borderRadius: '15px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        action={
          canManage && (
            <IconButton onClick={handleClick}>
              <MoreVert />
            </IconButton>
          )
        }
        title={post.title}
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Person fontSize="inherit" />
            <Typography variant="caption">Created by: {post.name}</Typography>
          </Box>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">{post.message}</Typography>
      </CardContent>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => { setCurrentId(post._id); handleClose(); }}>
          <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon><Delete fontSize="small" color="error" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default Post;