import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// This interceptor attaches the JWT token to every request
// so that the backend 'auth' and 'admin' middleware can verify the user.
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// --- POSTS ROUTES ---
export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// --- AUTH ROUTES ---
export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);

// --- USER MANAGEMENT ROUTES (ADMIN ONLY) ---
// GET /users (Fetches list of all users)
export const fetchUsers = () => API.get("/users");

// PATCH /users/:id/role (Updates user to 'admin' or 'user')
export const updateRole = (id, role) => API.patch(`/users/${id}/role`, { role });

// DELETE /users/profile/:id (Removes user from database)
export const deleteUser = (id) => API.delete(`/users/profile/${id}`);

// --- PROFILE ROUTES ---
// PUT /users/profile/:id (Updates own name or email)
export const updateProfile = (id, updatedData) => API.put(`/users/profile/${id}`, updatedData);
