import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  // Check if authorization header exists and starts with Bearer
  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      if (!process.env.SECRET_KEY) {
        return res.status(500).json({ 
          success: false, 
          message: 'Server configuration error' 
        });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY) as { _id: string };

      // Find user and attach to request object (excluding password)
      const user = await User.findById(decoded._id).select('-password');

      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'Not authorized, user not found' 
        });
      }

      // Attach user to request object
      req.user = {
        id: user._id as string,
        username: user.username
      };

      next();
    } catch (error) {
      res.status(401).json({ 
        success: false, 
        message: 'Not authorized, token failed' 
      });
    }
  }

  // If no token
  if (!token) {
    res.status(401).json({ 
      success: false, 
      message: 'Not authorized, no token' 
    });
  }
};