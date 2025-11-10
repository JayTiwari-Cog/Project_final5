
import jwt from 'jsonwebtoken';
 
const verify = (req, res, next) => {
  try {
    console.log('=== TOKEN VERIFICATION MIDDLEWARE ===');
    console.log('Headers received:', req.headers);
    
    const authHeader = req.headers.authorization;
    console.log('Authorization header:', authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid authorization header found');
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided or invalid format' 
      });
    }

    const token = authHeader.substring(7);
    console.log('Token extracted:', token.substring(0, 20) + '...');
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verification successful:', decoded);
    
    req.user = decoded; // Add user info to request object
    next(); // Continue to next middleware/route handler
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid token',
      error: error.message 
    });
  }
};

export default verify;