import * as api from '../api/index.js';

// 1. Action to fetch all work-study students
export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();
    dispatch({ type: 'FETCH_USERS', payload: data });
  } catch (error) {
    console.log("Error fetching users:", error.message);
  }
};

// 2. Action to promote/demote a user
export const changeRole = (id, role) => async (dispatch) => {
  try {
    const { data } = await api.updateRole(id, role);
    dispatch({ type: 'UPDATE_USER', payload: data });
  } catch (error) {
    console.log("Error updating role:", error.message);
  }
};

// 3. Action to delete a user from the team
export const removeUser = (id) => async (dispatch) => {
  try {
    await api.deleteUser(id);
    dispatch({ type: 'DELETE_USER', payload: id });
  } catch (error) {
    console.log("Error deleting user:", error.message);
  }
};
