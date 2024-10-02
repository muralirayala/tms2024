// authMiddleware.js
const jwt = require('jsonwebtoken');
console.log("auth Middleware js executing")

const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    console.log("token is", token);
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token, authorization denied',
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded token ', decoded);
        req.user = decoded;
        console.log('Next is started..');
        next();
        console.log('Next is completed..');
    }
    catch(err) {
        res.status(401).json({
            success: false,
            message: 'Token is not valid',
        })
    }
};

module.exports = authMiddleware;
