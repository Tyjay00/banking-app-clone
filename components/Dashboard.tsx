
import React from 'react';
import { Account, Transaction } from '../types';

interface DashboardProps {
  accounts: Account[];
  transactions: Transaction[];
  userName: string;
  onAccountClick?: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ accounts, transactions, userName, onAccountClick }) => {
  // Calculate total balance from transaction history for the "Main Account" (ID 1)
  const mainAccountBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const formattedBalance = mainAccountBalance.toLocaleString('en-ZA', { minimumFractionDigits: 2 });

  return (
    <div className="flex flex-col pb-8">
      {/* Dashboard Section */}
      <div className="px-4 py-4 flex justify-between items-center bg-transparent">
        <h2 className="text-[17px] font-bold text-gray-700">My dashboard</h2>
        <button className="text-capitec-blue text-sm font-semibold flex items-center">
          Edit <span className="ml-1 mt-0.5 text-xs">❯</span>
        </button>
      </div>

      <div className="px-4 space-y-3">
        {/* Main Account Card */}
        <button 
          onClick={() => onAccountClick?.('1')}
          className="w-full text-left bg-white rounded-lg overflow-hidden shadow-sm flex h-20 active:opacity-80 transition-opacity border border-gray-100"
        >
          <div className="w-16 bg-[#009fe3] flex items-center justify-center shrink-0">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17l-5-5 5-5M17 7l5 5-5 5M2 12h20" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-1 p-3 flex justify-between items-center">
            <div>
              <h3 className="text-capitec-blue font-bold text-[14px]">Main Account</h3>
              <p className="text-gray-500 text-[11px] mt-0.5">Available balance</p>
            </div>
            <p className="text-gray-800 font-bold text-lg">R{formattedBalance}</p>
          </div>
        </button>

        {/* Other Accounts - Dynamically rendered */}
        {accounts.map((account) => {
          if (account.id === '1') return null; // Skip main account, already displayed
          
          const getIcon = (type: string) => {
            if (type === 'Investment') {
              return (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 19h2v-7H5v7zm4 0h2V9H9v10zm4 0h2v-4h-2v4zm4 0h2V7h-2v12zm2 2H3v-2h18v2z" />
                  <path d="M19 12l-1.41-1.41L13 15.17l-3-3l-7 7L4.41 20.59 10 15l3 3z" />
                </svg>
              );
            } else if (type === '7 Day Notice') {
              return (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.16-2.66c-.44-.53-1.25-.58-1.78-.15-.53.44-.58 1.25-.15 1.78l3 3.67c.25.31.61.5 1.02.5s.77-.19 1.02-.5l3.93-4.85c.44-.53.39-1.34-.15-1.78s-1.34-.39-1.78.15z"/>
                </svg>
              );
            }
          };

          return (
            <div key={account.id} onClick={() => onAccountClick?.(account.id)} className={`bg-white rounded-lg overflow-hidden shadow-sm flex h-20 border cursor-pointer active:opacity-80 transition-opacity ${account.pendingWithdrawal ? 'border-red-300 border-2' : 'border-gray-100'}`}>
              <div className={`w-16 flex items-center justify-center shrink-0`} style={{ backgroundColor: account.color }}>
                {getIcon(account.type)}
              </div>
              <div className="flex-1 p-3 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-[14px]" style={{ color: account.color }}>
                    {account.type === 'Investment' ? 'Savings Plans' : account.type}
                  </h3>
                  {account.pendingWithdrawal ? (
                    <div>
                      <p className="text-red-600 text-[10px] mt-0.5 font-semibold">Pending withdrawal: R{account.pendingWithdrawal.amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</p>
                      <p className="text-red-500 text-[9px] font-medium">Due: {account.pendingWithdrawal.dueDate}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-[11px] mt-0.5">
                      {account.type === 'Investment' ? 'Total saved' : 'Account balance'}
                    </p>
                  )}
                </div>
                <p className="text-gray-800 font-bold text-lg">R{account.balance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* What's New Section */}
      <div className="mt-8 px-4">
        <h3 className="text-gray-700 font-bold text-[17px] mb-4">What's New</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative flex items-center p-4 h-32">
          <button className="absolute top-2 right-2 text-capitec-blue">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="w-24 h-24 relative mr-4 shrink-0">
             <div className="absolute inset-0 bg-capitec-blue rounded-full scale-90 opacity-10"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-capitec-blue" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
             </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-[#004b91] font-bold text-[17px]">Connect phones</h4>
              <span className="bg-[#e20613] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">New</span>
            </div>
            <p className="text-gray-500 text-[14px]">Find your perfect phone</p>
          </div>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="mt-8 px-4">
        <h3 className="text-gray-700 font-bold text-[17px] mb-4">Rewards</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center p-4 gap-4 h-28 relative">
            <div className="w-24 h-24 shrink-0 relative">
               <div className="absolute inset-0 bg-pink-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <svg className="w-16 h-16 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.65-.5-.65C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM4 19V8h16v11H4z"/>
                  </svg>
               </div>
            </div>
            <div className="flex-1 flex justify-between items-center pr-2">
              <h4 className="text-[#3c1053] font-bold text-[16px] leading-tight max-w-[140px]">Cash back, deals and more</h4>
              <p className="text-gray-800 font-bold text-[17px]">R0.24</p>
            </div>
          </div>
          <div className="bg-[#fcfcfc] border-t border-gray-50 p-4 flex justify-between items-center">
             <div className="flex items-center gap-3">
               <span className="bg-[#e20613] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">New</span>
               <p className="text-gray-700 font-medium text-[14px]">Get 15% off at Dis-Chem</p>
             </div>
             <button className="text-capitec-blue font-bold text-[14px]">Learn more</button>
          </div>
        </div>
      </div>

      {/* Favourites Section */}
      <div className="mt-8 px-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-700 font-bold text-[17px]">Favourites</h3>
          <button className="text-capitec-blue text-sm font-semibold flex items-center">
            Edit <span className="ml-1 mt-0.5 text-xs">❯</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <FavouriteItem icon={<PhoneIcon />} label="Buy prepaid mobile" />
          <FavouriteItem icon={<LightbulbIcon />} label="Buy electricity" />
          <FavouriteItem icon={<TransferIcon />} label="Transfer money" />
          <FavouriteItem icon={<ScanIcon />} label="Scan to pay" />
          <FavouriteItem icon={<PayMeIcon />} label="Pay me" />
          <FavouriteItem icon={<PayBillsIcon />} label="Pay bills" />
        </div>
      </div>
    </div>
  );
};

const FavouriteItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 active:bg-gray-50 transition-colors h-32 text-center">
    <div className="text-capitec-blue">
      {icon}
    </div>
    <span className="text-gray-700 font-medium text-[14px] leading-tight">{label}</span>
  </button>
);

const PhoneIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="1.5"/>
    <path d="M12 18h.01" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 2h6" strokeWidth="1.5"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TransferIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ScanIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="8" y="8" width="2" height="2" fill="currentColor"/>
    <rect x="14" y="8" width="2" height="2" fill="currentColor"/>
    <rect x="8" y="14" width="2" height="2" fill="currentColor"/>
  </svg>
);

const PayMeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="4" y="4" width="6" height="6" rx="1" strokeWidth="1.5"/>
    <rect x="14" y="4" width="6" height="6" rx="1" strokeWidth="1.5"/>
    <rect x="4" y="14" width="6" height="6" rx="1" strokeWidth="1.5"/>
    <path d="M14 14h6v6h-6v-6z" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PayBillsIcon = () => (
  <div className="relative w-8 h-8 flex items-center justify-center">
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center pt-2">
       <span className="text-[10px] font-bold border border-capitec-blue rounded-sm px-0.5 leading-none">R</span>
    </div>
  </div>
);

export default Dashboard;
