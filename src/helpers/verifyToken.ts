import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
};

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json('Access Denied!');

    const payload = jwt.verify(token, process.env.JWT_SECRET || 'TokenMaestro') as IPayload;
    req.userId = payload._id;
    
    next();
};