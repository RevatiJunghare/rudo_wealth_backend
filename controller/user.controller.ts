import { Request, Response } from 'express';
import { AppDataSource } from '../AppDataSource';
import { UserEntity } from '../entities/user.entity';
import { BalanceService } from '../services/BalanceService';
import { DebtSimplificationService } from '../services/DebtSimplificationService';

export class UserController {
  static async getProfile(req: any, res: Response) {
    const user = await AppDataSource.getRepository(UserEntity).findOneBy({ firebaseUid: req.user.uid });
    res.json(user);
  }

  static async getGlobalBalances(req: any, res: Response) {
    const balances = await BalanceService.getBalances(req.user.uid);
    const simplified = DebtSimplificationService.simplifyDebts(balances);
    res.json({ balances, simplified });
  }
}
