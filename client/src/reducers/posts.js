const postReducer = (posts = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return action.payload;
    case 'CREATE':
      return [...posts, action.payload];
    case 'UPDATE':
    case 'LIKE':
      // Map through posts: if ID matches, return the updated post (payload), else keep old post
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case 'DELETE':
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
}; 
export default postReducer;
