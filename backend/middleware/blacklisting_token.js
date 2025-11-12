import Blacklist from '../models/BlackList.js';

const checkBlacklist = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  const blacklisted = await Blacklist.findOne({ token });
  if (blacklisted) {
    return res.status(401).json({ message: 'this user is logged out' });
  }

  next();
};

export default checkBlacklist;