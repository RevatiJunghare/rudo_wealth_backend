import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import { AppDataSource } from '../AppDataSource';
import { UserEntity } from '../entities/user.entity';

interface AuthRequest extends Request {
  user?: { uid: string; name?: string };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = { uid: decodedToken.uid, name: decodedToken.name };
    
    // Auto-create user if new
    await AppDataSource.manager.upsert(UserEntity, { firebaseUid: req.user.uid, name: req.user.name }, ['firebaseUid']);
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
