export class DebtSimplificationService {
    static simplifyDebts(balances: Record<string, number>): Array<{from: string, to: string, amount: number}> {
      const debtors: string[] = [];
      const creditors: string[] = [];
      
      for (const [uid, balance] of Object.entries(balances)) {
        if (balance > 0.01) creditors.push(uid);
        else if (balance < -0.01) debtors.push(uid);
      }
  
      const transactions: any[] = [];
      while (debtors.length && creditors.length) {
        // Sort by absolute balance
        debtors.sort((a, b) => Math.abs(balances[a]) - Math.abs(balances[b]));
        creditors.sort((a, b) => balances[b] - balances[a]);
        
        const debtor = debtors[0];
        const creditor = creditors[0];
        const amount = Math.min(Math.abs(balances[debtor]!), balances[creditor]!);
  
        transactions.push({ from: debtor, to: creditor, amount: Number(amount.toFixed(2)) });
  
        balances[debtor] += amount;
        balances[creditor] -= amount;
  
        if (Math.abs(balances[debtor]) < 0.01) debtors.shift();
        if (balances[creditor] < 0.01) creditors.shift();
      }
      return transactions;
    }
  }
  