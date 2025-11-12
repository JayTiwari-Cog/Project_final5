import dotenv from 'dotenv';
dotenv.config();

export const headerSet = (req, res, next) => {
    res.setHeader('Content-Security-Policy', process.env.CSP_HEADER || "default-src 'self'; script-src 'self' https://trusted.cdn.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none';");
    next();
};
 
 
 
export const logger = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);
 
  const statusCode = err.statusCode || 500;
 
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong on the server",
  });
};
 
 
 
export const errorWare = (req, res, next) => {
    res.status(404).json({ error: 'Page not found' });
};
 