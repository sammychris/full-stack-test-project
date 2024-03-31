const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Assuming 'Bearer token' format

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.userId = decoded._id; 
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' }); 
    }
}
