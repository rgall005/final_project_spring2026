const admin = (req, res, next) => {
    // req.userRole must be set by your auth middleware first
    if (req.userRole !== 'admin') {
        return res.status(403).json({ 
            message: "Access Denied: You do not have administrator privileges." 
        });
    }

    next();
};

export default admin;
