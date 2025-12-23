
import React, { useState } from 'react';
import { Transaction } from '../types';

interface AccountDetailProps {
  transactions: Transaction[];
  onBack: () => void;
  onTransactionClick?: (transaction: Transaction) => void;
}

type FilterTab = 'All' | 'Money In' | 'Money Out';

const AccountDetail: React.FC<AccountDetailProps> = ({ transactions, onBack, onTransactionClick }) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  // Calculate summaries based on transaction history
  const totalIn = transactions.filter(t => t.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);
  const totalOut = Math.abs(transactions.filter(t => t.amount < 0).reduce((acc, curr) => acc + curr.amount, 0));
  const availableBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  // Filter transactions based on active tab
  const filteredTransactions = transactions.filter(t => {
    if (activeTab === 'Money In') return t.amount > 0;
    if (activeTab === 'Money Out') return t.amount < 0;
    return true;
  });

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 });
  };

  return (
    <div className="flex flex-col bg-white min-h-full">
      {/* Header */}
      <header className="bg-capitec-header p-4 flex justify-between items-center text-white sticky top-0 z-20">
        <button onClick={onBack} className="p-1">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="text-xl font-semibold">Main Account</h1>
        <div className="flex gap-4">
          <button>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button>
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Balance Section */}
      <section className="bg-capitec-header px-4 py-8 flex flex-col items-center text-white relative">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg opacity-90">Available</span>
          <button className="opacity-80">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
               <path d="M12 16v-4m0-4h.01" strokeWidth="2" strokeLinecap="round"/>
             </svg>
          </button>
        </div>
        <h2 className="text-4xl font-bold mb-6">R{formatCurrency(availableBalance)}</h2>
        
        {/* Money In / Money Out Summary */}
        <div className="grid grid-cols-2 w-full gap-4 px-4">
          <div className="flex flex-col items-center border-r border-white/20">
            <span className="text-[10px] uppercase tracking-wider font-bold opacity-70">Money in</span>
            <span className="text-[17px] font-bold">R{formatCurrency(totalIn)}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-wider font-bold opacity-70">Money out</span>
            <span className="text-[17px] font-bold">R{formatCurrency(totalOut)}</span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <nav className="bg-capitec-header flex text-white font-semibold text-sm">
        <button 
          onClick={() => setActiveTab('All')}
          className={`flex-1 py-4 border-b-4 transition-all ${activeTab === 'All' ? 'border-white opacity-100' : 'border-transparent opacity-70'}`}
        >
          All
        </button>
        <button 
          onClick={() => setActiveTab('Money In')}
          className={`flex-1 py-4 border-b-4 transition-all ${activeTab === 'Money In' ? 'border-white opacity-100' : 'border-transparent opacity-70'}`}
        >
          Money In
        </button>
        <button 
          onClick={() => setActiveTab('Money Out')}
          className={`flex-1 py-4 border-b-4 transition-all ${activeTab === 'Money Out' ? 'border-white opacity-100' : 'border-transparent opacity-70'}`}
        >
          Money Out
        </button>
        <button className="flex-1 py-4 opacity-70">Track</button>
      </nav>

      {/* Content Area */}
      <div className="p-4 bg-gray-50 flex-1">
        <div className="flex justify-between items-center py-4">
          <span className="font-bold text-gray-700 text-[15px]">Dec 2025</span>
          <button className="text-[#0082c3] font-bold text-sm flex items-center">
            Statement <span className="ml-1 text-[10px]">❯</span>
          </button>
        </div>

        <div className="space-y-0.5 bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t) => (
              <button 
                key={t.id} 
                onClick={() => onTransactionClick?.(t)}
                className="w-full flex justify-between items-start py-4 border-b border-gray-50 last:border-0 px-4 active:bg-gray-50 text-left transition-colors"
              >
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-gray-800 leading-tight mb-1">{t.description}</p>
                  <p className="text-[11px] text-gray-400 font-medium">{t.date} - {t.category}</p>
                </div>
                <p className={`text-[14px] font-bold whitespace-nowrap ml-2 ${t.amount > 0 ? 'text-[#8cc63f]' : 'text-gray-800'}`}>
                  {t.amount > 0 ? 'R' : '-R'}{Math.abs(t.amount).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </p>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-gray-400 text-sm">
              No transactions for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
