import jwt from 'jsonwebtoken';
import Blacklist from '../models/BlackList.js';

const verifyTokenWithRoles = (allowedRoles = []) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const blacklisted = await Blacklist.findOne({ token });
    if (blacklisted) return res.status(401).json({ message: 'Token is blacklisted' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied: role not permitted' });
      }

      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token', error: err.message });
    }
  };
};

export default verifyTokenWithRoles;