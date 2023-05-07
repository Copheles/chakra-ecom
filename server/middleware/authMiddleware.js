import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/User.js';

const protectedRoute = asyncHandler(async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id);
      next()
    } catch (error) {
      res.status(401);
      throw new Error('Not authorize, token failed')
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorize, No Token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin !== 'false') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin.');
  }
};

export { protectedRoute, admin };