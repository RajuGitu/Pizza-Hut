const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
        req.user = decoded; // Attach decoded user data (id) to request object
        next(); // Pass control to the controller
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
    }
};

module.exports = verifyToken;
