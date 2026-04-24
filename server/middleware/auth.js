import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    
    if (token) {
      const decodedData = jwt.verify(token, 'test');
      req.userId = decodedData?.id;
      req.userRole = decodedData?.role; // This is the key for admin checks!
    }
    
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthenticated" });
  }
};

export default auth;
