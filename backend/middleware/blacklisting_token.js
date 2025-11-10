import jwt from 'jsonwebtoken';
import express from 'express';
 
const app = express();
 


const blacklistedTokens = new Set();

 
function checkBlacklist(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);
  if (blacklistedTokens.has(token)) return res.status(403).json({ message: 'Token is blacklisted' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
export { checkBlacklist, blacklistedTokens };

export default checkBlacklist;
