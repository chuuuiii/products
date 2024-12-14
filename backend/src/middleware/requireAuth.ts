// import { RequestHandler } from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../models/user.model';

// interface JwtPayload {
//   _id: string
// }

// const requireAuth: RequestHandler = async (req, res, next) => {
//   //verify auth
//   const { authorization } = req.headers;

//   if (!authorization) {
//     res.status(401).json({ error: 'Auth token required' })
//   }

//   try {
//     const token = authorization.split(' ')[1]
//     const { _id } = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload

//     const user = await User.findOne({ _id }).select('_id')

        
//     if (!user) {
//       return res.status(401).json({ error: 'User not found' });
//     }

//     // req.user = user;
//     next();
//   } catch (error) {
//     console.log(error)
//     res.status(401).json({ error: 'Request is not authorized' })
    
//   }
// }
