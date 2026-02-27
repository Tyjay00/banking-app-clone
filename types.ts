
export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  // Fix: Expanded category union to include all categories used in the application mock data, including Debit Orders and Education
  category: 'Groceries' | 'Rent' | 'Salary' | 'Utilities' | 'Entertainment' | 'Transfer' | 'Fees' | 'Betting/Lottery' | 'Other Income' | 'Debit Orders' | 'Education';
}

export interface Account {
  id: string;
  type: 'Savings' | 'Credit' | 'Investment' | '7 Day Notice';
  balance: number;
  accountNumber: string;
  color: string;
  pendingWithdrawal?: {
    amount: number;
    dueDate: string;
  };
}

export interface Beneficiary {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  accountType: string;
}

export interface Bill {
  id: string;
  name: string;
  accountNumber: string;
  provider: string;
}

export interface UserState {
  isLoggedIn: boolean;
  name: string;
  accounts: Account[];
  transactions: Transaction[];
  beneficiaries?: Beneficiary[];
  bills?: Bill[];
}