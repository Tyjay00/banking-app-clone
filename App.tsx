
import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AccountDetail from './components/AccountDetail';
import TransactionDetail from './components/TransactionDetail';
import Transact from './components/Transact';
import Cards from './components/Cards';
import Explore from './components/Explore';
import Messages from './components/Messages';
import Navigation from './components/Navigation';
import ChatBot from './components/ChatBot';
import { UserState, Account, Transaction, Beneficiary, Bill } from './types';

const MOCK_ACCOUNTS: Account[] = [
  { id: '1', type: 'Savings', balance: 0, accountNumber: 'Main Account', color: '#009fe3' },
  { id: '2', type: 'Investment', balance: 0, accountNumber: 'Savings Plans', color: '#004b91' },
  { id: '3', type: '7 Day Notice', balance: 9500, accountNumber: '7 Day Notice Account', color: '#e20613', pendingWithdrawal: { amount: 9500, dueDate: '04 Mar 2026 09:00' } }
];

const MOCK_BENEFICIARIES: Beneficiary[] = [
  { id: 'b1', name: 'John Doe', accountNumber: '123456789', bankName: 'Capitec Bank', accountType: 'Savings' },
  { id: 'b2', name: 'Jane Smith', accountNumber: '987654321', bankName: 'First National Bank', accountType: 'Cheque' },
  { id: 'b3', name: 'Michael Johnson', accountNumber: '555666777', bankName: 'ABSA', accountType: 'Savings' }
];

const MOCK_BILLS: Bill[] = [
  { id: 'bill1', name: 'Eskom - Electricity', accountNumber: '123456', provider: 'Eskom' },
  { id: 'bill2', name: 'Telkom - Phone Bill', accountNumber: '987654', provider: 'Telkom' },
  { id: 'bill3', name: 'JET - Internet', accountNumber: '555666', provider: 'JET' }
];

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't0a', date: '26 Feb 2026 14:32', description: 'Transfer to 7 Day Notice Account', amount: 9500.00, accountId: '3', category: 'Transfer' },
  { id: 't0b', date: '26 Feb 2026 10:15', description: 'Incoming Transfer - Main Account', amount: 9500.00, accountId: '3', category: 'Other Income' },
  { id: 't1', date: '23 Dec 2025 05:47', description: 'Ref.Mtn Ba13681283', amount: -9924.76, accountId: '1', category: 'Debit Orders' },
  { id: 't2', date: '23 Dec 2025 05:47', description: 'Ref.Mtn Ba13681283', amount: -3429.48, accountId: '1', category: 'Debit Orders' },
  { id: 't3', date: '23 Dec 2025 05:47', description: 'Sand AI Training Pty', amount: 13354.24, accountId: '1', category: 'Other Income' },
  { id: 't4', date: '21 Dec 2025 07:19', description: 'Capitec Pay Fee', amount: -1.00, accountId: '1', category: 'Fees' },
  { id: 't5', date: '21 Dec 2025 07:19', description: 'UAE MasterCard Scholarship: Immediate Capitec P...', amount: -700.00, accountId: '1', category: 'Education' },
  { id: 't6', date: '21 Dec 2025 07:10', description: 'T Mthethwa', amount: 700.00, accountId: '1', category: 'Other Income' },
  { id: 't7', date: '21 Dec 2025 12:57', description: 'Capitec Pay Fee', amount: -1.00, accountId: '1', category: 'Fees' },
  { id: 't8', date: '21 Dec 2025 12:57', description: 'UAE MasterCard Scholarship: Immediate Capitec P...', amount: -1400.00, accountId: '1', category: 'Education' },
  { id: 't9', date: '21 Dec 2025 12:35', description: 'L Mthethwa', amount: 1400.00, accountId: '1', category: 'Other Income' },
  { id: 't10', date: '21 Dec 2025 00:57', description: 'Capitec Pay Fee', amount: -1.00, accountId: '1', category: 'Fees' },
  { id: 't11', date: '21 Dec 2025 00:57', description: 'UAE MasterCard Scholarship: Immediate Capitec P...', amount: -1400.00, accountId: '1', category: 'Education' },
  { id: 't12', date: '21 Dec 2025 00:35', description: 'L Mthethwa', amount: 1400.00, accountId: '1', category: 'Other Income' },
];

const App: React.FC = () => {
  const [user, setUser] = useState<UserState>({
    isLoggedIn: false,
    name: 'Tyrone',
    accounts: MOCK_ACCOUNTS,
    transactions: MOCK_TRANSACTIONS,
    beneficiaries: MOCK_BENEFICIARIES,
    bills: MOCK_BILLS
  });

  const [activeTab, setActiveTab] = useState<'home' | 'cards' | 'transact' | 'messages' | 'explore'>('home');
  const [currentView, setCurrentView] = useState<'dashboard' | 'account-detail' | 'transaction-detail'>('dashboard');
  const [transactView, setTransactView] = useState<'menu' | 'pay-beneficiary' | 'pay-bills' | 'transfer' | 'add-beneficiary'>('menu');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('1');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleLogin = (pin: string) => {
    if (pin.length === 5) {
      setUser(prev => ({ ...prev, isLoggedIn: true }));
    }
  };

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setCurrentView('transaction-detail');
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentView('dashboard');
    }
    if (tab === 'transact') {
      setTransactView('menu');
    }
  };

  if (showWelcome) {
    return <Welcome onContinue={() => setShowWelcome(false)} userName={user.name} />;
  }

  if (!user.isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    if (activeTab === 'transact') {
      return (
        <Transact
          transactView={transactView}
          setTransactView={setTransactView}
          accounts={user.accounts}
          beneficiaries={user.beneficiaries || []}
          bills={user.bills || []}
          user={user}
          setUser={setUser}
        />
      );
    }
    }

    if (activeTab === 'cards') {
      return <Cards />;
    }

    if (activeTab === 'explore') {
      return <Explore />;
    }

    if (activeTab === 'messages') {
      return <Messages />;
    }

    if (activeTab === 'home') {
      switch (currentView) {
        case 'dashboard':
          return (
            <Dashboard 
              accounts={user.accounts} 
              transactions={user.transactions} 
              userName={user.name} 
              onAccountClick={(id) => {
                setSelectedAccountId(id);
                setCurrentView('account-detail');
              }}
            />
          );
        case 'account-detail': {
          const selectedAccount = user.accounts.find(a => a.id === selectedAccountId);
          return (
            <AccountDetail 
              account={selectedAccount}
              transactions={user.transactions} 
              onBack={() => setCurrentView('dashboard')} 
              onTransactionClick={handleTransactionClick}
            />
          );
        }
        case 'transaction-detail':
          return selectedTransaction ? (
            <TransactionDetail 
              transaction={selectedTransaction} 
              onBack={() => setCurrentView('account-detail')} 
            />
          ) : null;
        default:
          return null;
      }
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <p className="text-lg font-semibold capitalize">{activeTab} View</p>
        <p className="text-sm">Coming Soon</p>
      </div>
    );

  return (
    <div className="h-screen bg-[#f4f4f4] max-w-md mx-auto relative shadow-2xl overflow-hidden flex flex-col">
      {currentView === 'dashboard' && activeTab === 'home' && (
        <header className="bg-capitec-header p-3 flex justify-between items-center sticky top-0 z-20 shadow-md flex-shrink-0">
          <button className="text-white">
            <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </button>
          
          <div className="flex items-center text-white">
            <span className="text-2xl font-bold tracking-tight">Global</span>
            <div className="bg-white rounded-full w-5 h-5 flex items-center justify-center mx-0.5 mt-0.5">
               <div className="w-3 h-3 bg-capitec-header rounded-full"></div>
            </div>
            <span className="text-2xl font-bold tracking-tight">ne</span>
          </div>

          <button className="text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </header>
      )}

      <main className={`flex-1 overflow-y-auto pb-24 ${(currentView !== 'dashboard' || activeTab !== 'home') ? 'bg-white' : ''} scroll-smooth`}>
        {renderContent()}
      </main>

      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#E20613] text-white rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-30 border-2 border-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {isChatOpen && <ChatBot transactions={user.transactions} onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default App;
