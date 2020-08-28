import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income: number | undefined;
    let outcome: number | undefined;

    let mapIncome = this.transactions.map((item) => {
      if (item.type == "income") {
        return item.value
      }
    });

    if (mapIncome.length < 1) {
      income = 0;
    } else {
      income = mapIncome.reduce((a = 0, b) => {
        return b != undefined ? a + b : a
      })
    }

    let mapOutcome = this.transactions.map((item) => {
      if (item.type == "outcome") {
        return item.value
      }
    });

    if (mapOutcome.length < 1) {
      outcome = 0
    } else {
      outcome = mapOutcome.reduce((a = 0, b) => {
        return b != undefined ? a + b : a
      })
    }
    income = income != undefined ? income : 0;
    outcome = outcome != undefined ? outcome : 0;
    const balanced = {
      income: income,
      outcome: outcome,
      total: income - outcome
    }

    return balanced;

  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
