const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header is missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    if (!token || token.trim() === '') {
        return res.status(401).json({ message: 'Token is required' });
    }

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in the environment variables');
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'Token has expired' });
                }
                return res.status(401).json({ message: 'Invalid token' });
            }

            req.userId = decoded.id; // Gắn userId vào request
            next(); // Chuyển tiếp đến route handler
        });
    } catch (error) {
        console.error('JWT Verification Middleware Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = verifyToken;
