const jwt = require('jsonwebtoken');
const User = require("../DataModels/UserDataModel");

// Authenticates a user request for jwt token
const authenticate = async (req, res, next) => {
    // Check for jwt in cookies
    const token = req.cookies.jwt;

    // Reject request if unauthorized
    if(!token) {
        return res.status(401).json({ message: "Unauthorized request!" });
    }

    try {
        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Add user to request
        req.user = await User.findById(verified.userId).select('-password');

        // Call next middleware
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token!" });
    }

}
module.exports = { authenticate };