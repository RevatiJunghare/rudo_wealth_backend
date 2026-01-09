
import { AppDataSource } from '../AppDataSource';
import { ExpenseEntity } from '../entities/expense.entity';
import { SettlementEntity } from '../entities/settlement.entity';
import { UserEntity } from '../entities/user.entity';

export class BalanceService {
  static async getBalances(userUid: string, groupId?: string): Promise<Record<string, number>> {
    const expenseRepo = AppDataSource.getRepository(ExpenseEntity);
    const settlementRepo = AppDataSource.getRepository(SettlementEntity);

    const where: any = groupId ? { groupId } : {};
    const expenses = await expenseRepo.find({ where, relations: ['payer'] });
    const settlements = await settlementRepo.find({ where });

    const balances: Record<string, number> = {};

    // Process expenses
    for (const expense of expenses) {
      const totalShares = Object.values(expense.splits).reduce((sum, share) => sum + share, 0);
      for (const [uid, share] of Object.entries(expense.splits)) {
        const userShare = expense.amount * (share / totalShares);
        balances[uid] = (balances[uid] || 0) - userShare;
        balances[expense.payerUid] = (balances[expense.payerUid] || 0) + userShare;
      }
    }

    // Process settlements
    for (const settlement of settlements) {
      balances[settlement.fromUid] = (balances[settlement.fromUid] || 0) + settlement.amount;
      balances[settlement.toUid] = (balances[settlement.toUid] || 0) - settlement.amount;
    }

    return balances;
  }
}
