
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
  type: 'Savings' | 'Credit' | 'Investment';
  balance: number;
  accountNumber: string;
  color: string;
}

export interface UserState {
  isLoggedIn: boolean;
  name: string;
  accounts: Account[];
  transactions: Transaction[];
}