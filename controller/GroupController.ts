import { Request, Response } from 'express';
import { BalanceService } from '../services/BalanceService';
import { DebtSimplificationService } from '../services/DebtSimplificationService';
import { validate } from 'class-validator';
import { AppDataSource } from '../AppDataSource';
import { GroupEntity } from '../entities/group.entity';

export class GroupController {
  static async create(req: any, res: Response) {
    const group = new GroupEntity();
    group.name = req.body.name;
    group.creatorUid = req.user.uid;
    
    const saved = await AppDataSource.manager.save(group);
    await AppDataSource.manager.save(GroupEntity, { ...group, members: [req.user.uid] }); // Add creator
    res.status(201).json(saved);
  }

  static async getGroupBalances(req: any, res: Response) {
    const balances = await BalanceService.getBalances(req.user.uid, req.params.id);
    const simplified = DebtSimplificationService.simplifyDebts(balances);
    res.json({ balances, simplified });
  }
}
