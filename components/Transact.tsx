
import React, { useState, Dispatch, SetStateAction } from 'react';
import { UserState, Account, Beneficiary, Bill, Transaction } from '../types';

interface TransactProps {
  transactView: string;
  setTransactView: Dispatch<SetStateAction<string>>;
  accounts: Account[];
  beneficiaries: Beneficiary[];
  bills: Bill[];
  user: UserState;
  setUser: (user: UserState) => void;
}

const Transact: React.FC<TransactProps> = ({
  transactView,
  setTransactView,
  accounts,
  beneficiaries,
  bills,
  user,
  setUser
}) => {
  const [selectedAccount, setSelectedAccount] = useState<string>(accounts[0]?.id || '');
  const [formData, setFormData] = useState({
    amount: '',
    beneficiaryId: '',
    newBeneficiary: {
      name: '',
      accountNumber: '',
      bankName: '',
      accountType: 'Savings'
    },
    billId: '',
    transferAmount: '',
    description: ''
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const MenuItem = ({ label, icon, onClick }: { label: string, icon: React.ReactNode, onClick?: () => void }) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center p-4 active:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 group"
    >
      <div className="w-10 flex justify-center mr-3 shrink-0">
        {icon}
      </div>
      <div className="flex-1 flex items-center justify-between overflow-hidden">
        <span className="text-gray-700 font-medium text-[16px] truncate">{label}</span>
        <span className="text-capitec-blue text-xl font-light opacity-60 group-active:opacity-100 ml-2">❯</span>
      </div>
    </button>
  );

  const SectionSeparator = () => (
    <div className="h-4 bg-gray-100 border-y border-gray-200"></div>
  );

  const handleAddBeneficiary = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newBeneficiary.name && formData.newBeneficiary.accountNumber) {
      const newBeneficiary: Beneficiary = {
        id: `b${Date.now()}`,
        ...formData.newBeneficiary
      };
      setUser({
        ...user,
        beneficiaries: [...(user.beneficiaries || []), newBeneficiary]
      });
      setFormData({ ...formData, newBeneficiary: { name: '', accountNumber: '', bankName: '', accountType: 'Savings' } });
      setSuccessMessage('Beneficiary added successfully!');
      setTimeout(() => {
        setSuccessMessage(null);
        setTransactView('pay-beneficiary');
      }, 2000);
    }
  };

  const handlePayBeneficiary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.beneficiaryId || !formData.amount) {
      alert('Please select a beneficiary and enter an amount');
      return;
    }

    const account = accounts.find(a => a.id === selectedAccount);
    const amount = parseFloat(formData.amount);

    if (!account || account.balance < amount) {
      alert('Insufficient funds');
      return;
    }

    const beneficiary = beneficiaries.find(b => b.id === formData.beneficiaryId);
    const updatedAccounts = accounts.map(a =>
      a.id === selectedAccount ? { ...a, balance: a.balance - amount } : a
    );

    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ''),
      description: `Payment to ${beneficiary?.name}`,
      amount: -amount,
      category: 'Transfer'
    };

    setUser({
      ...user,
      accounts: updatedAccounts,
      transactions: [newTransaction, ...user.transactions]
    });

    setSuccessMessage(`Payment of R${amount.toFixed(2)} sent successfully!`);
    setFormData({ ...formData, amount: '', beneficiaryId: '' });
    setTimeout(() => {
      setSuccessMessage(null);
      setTransactView('menu');
    }, 3000);
  };

  const handlePayBills = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.billId || !formData.amount) {
      alert('Please select a bill and enter an amount');
      return;
    }

    const account = accounts.find(a => a.id === selectedAccount);
    const amount = parseFloat(formData.amount);

    if (!account || account.balance < amount) {
      alert('Insufficient funds');
      return;
    }

    const bill = bills.find(b => b.id === formData.billId);
    const updatedAccounts = accounts.map(a =>
      a.id === selectedAccount ? { ...a, balance: a.balance - amount } : a
    );

    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ''),
      description: `Bill payment - ${bill?.name}`,
      amount: -amount,
      category: 'Utilities'
    };

    setUser({
      ...user,
      accounts: updatedAccounts,
      transactions: [newTransaction, ...user.transactions]
    });

    setSuccessMessage(`Bill payment of R${amount.toFixed(2)} completed!`);
    setFormData({ ...formData, amount: '', billId: '' });
    setTimeout(() => {
      setSuccessMessage(null);
      setTransactView('menu');
    }, 3000);
  };

  const handleTransferMoney = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.transferAmount || !formData.description) {
      alert('Please enter amount and description');
      return;
    }

    const fromAccount = accounts.find(a => a.id === selectedAccount);
    const amount = parseFloat(formData.transferAmount);

    if (!fromAccount || fromAccount.balance < amount) {
      alert('Insufficient funds');
      return;
    }

    const updatedAccounts = accounts.map(a =>
      a.id === selectedAccount ? { ...a, balance: a.balance - amount } : a
    );

    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ''),
      description: formData.description,
      amount: -amount,
      category: 'Transfer'
    };

    setUser({
      ...user,
      accounts: updatedAccounts,
      transactions: [newTransaction, ...user.transactions]
    });

    setSuccessMessage(`Transfer of R${amount.toFixed(2)} completed!`);
    setFormData({ ...formData, transferAmount: '', description: '' });
    setTimeout(() => {
      setSuccessMessage(null);
      setTransactView('menu');
    }, 3000);
  };

  // Render different views based on transactView
  if (transactView === 'menu') {
    return (
      <div className="flex flex-col bg-white">
        <header className="bg-capitec-header p-4 flex justify-center items-center text-white sticky top-0 z-20 shadow-sm relative flex-shrink-0 h-16">
          <h1 className="text-xl font-semibold">Transact</h1>
          <button className="absolute right-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </header>

        <div className="flex flex-col">
          <MenuItem 
            label="Pay beneficiary" 
            icon={<svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m12-10a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>} 
            onClick={() => setTransactView('pay-beneficiary')}
          />
          <MenuItem label="PayShap" icon={<div className="w-7 h-7 rounded-full border-2 border-dashed border-capitec-blue flex items-center justify-center"><div className="w-3 h-3 bg-capitec-blue transform rotate-45"></div></div>} />
          <MenuItem 
            label="Pay bills" 
            icon={<svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            onClick={() => setTransactView('pay-bills')}
          />
        </div>

        <SectionSeparator />

        <div className="flex flex-col">
          <MenuItem 
            label="Transfer money" 
            icon={<svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 10l5-5 5 5M17 14l-5 5-5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            onClick={() => setTransactView('transfer')}
          />
          <MenuItem 
            label="Recurring/future-dated" 
            icon={<svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="14" rx="2" strokeWidth="1.5"/><path d="M4 10h16M8 4v2M16 4v2" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 14a2 2 0 11-2 2" strokeWidth="1.5" strokeLinecap="round"/><path d="M10 16a2 2 0 012-2c1.1 0 2 .9 2 2s-.9 2-2 2" strokeWidth="1.5" strokeLinecap="round"/></svg>} 
          />
          <MenuItem 
            label="Send cash" 
            icon={<svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="10" rx="2" strokeWidth="1.5"/><circle cx="12" cy="13" r="2" strokeWidth="1.5"/><path d="M16 13h1M7 13h1" strokeWidth="1.5" strokeLinecap="round"/><path d="M20 13l2-2" strokeWidth="1.5" strokeLinecap="round"/></svg>} 
          />
        </div>

        <SectionSeparator />

        <div className="flex flex-col pb-8">
          <MenuItem 
            label="Debit orders" 
            icon={<svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="1.5"/><path d="M3 9h18M8 14h2M8 17h5" strokeWidth="1.5" strokeLinecap="round"/><path d="M16 14l2 2-2 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>} 
          />
          <MenuItem 
            label="SARS eFiling" 
            icon={<svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 5v3h3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="16" cy="18" r="1" fill="currentColor"/></svg>} 
          />
        </div>
      </div>
    );
  }

  // Pay Beneficiary View
  if (transactView === 'pay-beneficiary') {
    return (
      <div className="flex flex-col bg-white h-full">
        <header className="bg-capitec-header p-4 flex justify-between items-center text-white sticky top-0 z-20 shadow-sm relative flex-shrink-0 h-16">
          <button onClick={() => setTransactView('menu')} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Pay Beneficiary</h1>
          <div className="w-6"></div>
        </header>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3">
            {successMessage}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 pb-20">
          <form onSubmit={handlePayBeneficiary} className="space-y-4">
            {/* From Account */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Account</label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-capitec-blue"
              >
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>
                    {acc.accountNumber} - R{acc.balance.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            {/* Beneficiary Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Beneficiary</label>
              <select
                value={formData.beneficiaryId}
                onChange={(e) => setFormData({ ...formData, beneficiaryId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-capitec-blue"
              >
                <option value="">-- Select a beneficiary --</option>
                {beneficiaries.map(ben => (
                  <option key={ben.id} value={ben.id}>
                    {ben.name} ({ben.accountNumber})
                  </option>
                ))}
              </select>
            </div>

            {/* Add New Beneficiary Button */}
            <button
              type="button"
              onClick={() => setTransactView('add-beneficiary')}
              className="w-full bg-blue-50 border border-blue-200 text-capitec-blue p-2 rounded-lg hover:bg-blue-100 font-medium"
            >
              + Add New Beneficiary
            </button>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount (R)</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-capitec-blue"
                placeholder="0.00"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-capitec-blue text-white p-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Send Payment
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Add Beneficiary View
  if (transactView === 'add-beneficiary') {
    return (
      <div className="flex flex-col bg-white h-full">
        <header className="bg-capitec-header p-4 flex justify-between items-center text-white sticky top-0 z-20 shadow-sm relative flex-shrink-0 h-16">
          <button onClick={() => setTransactView('pay-beneficiary')} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Add Beneficiary</h1>
          <div className="w-6"></div>
        </header>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3">
            {successMessage}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 pb-20">
          <form onSubmit={handleAddBeneficiary} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiary Name</label>
              <input
                type="text"
                value={formData.newBeneficiary.name}
                onChange={(e) => setFormData({
                  ...formData,
                  newBeneficiary: { ...formData.newBeneficiary, name: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-capitec-blue"
                placeholder="Enter beneficiary name"
              />
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
              <input
                type="text"
                value={formData.newBeneficiary.accountNumber}
                onChange={(e) => setFormData({
                  ...formData,
                  newBeneficiary: { ...formData.newBeneficiary, accountNumber: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-capitec-blue"
                placeholder="Enter account number"
              />
            </div>

            {/* Bank Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
              <input
                type="text"
                value={formData.newBeneficiary.bankName}
                onChange={(e) => setFormData({
                  ...formData,
                  newBeneficiary: { ...formData.newBeneficiary, bankName: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-capitec-blue"
                placeholder="Enter bank name"
              />
            </div>

            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
              <select
                value={formData.newBeneficiary.accountType}
                onChange={(e) => setFormData({
                  ...formData,
                  newBeneficiary: { ...formData.newBeneficiary, accountType: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-capitec-blue"
              >
                <option value="Savings">Savings</option>
                <option value="Cheque">Cheque</option>
                <option value="Credit">Credit</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-capitec-blue text-white p-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Add Beneficiary
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Pay Bills View
  if (transactView === 'pay-bills') {
    return (
      <div className="flex flex-col bg-white h-full">
        <header className="bg-capitec-header p-4 flex justify-between items-center text-white sticky top-0 z-20 shadow-sm relative flex-shrink-0 h-16">
          <button onClick={() => setTransactView('menu')} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Pay Bills</h1>
          <div className="w-6"></div>
        </header>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3">
            {successMessage}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 pb-20">
          <form onSubmit={handlePayBills} className="space-y-4">
            {/* From Account */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Account</label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-capitec-blue"
              >
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>
                    {acc.accountNumber} - R{acc.balance.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            {/* Bill Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Bill</label>
              <select
                value={formData.billId}
                onChange={(e) => setFormData({ ...formData, billId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-capitec-blue"
              >
                <option value="">-- Select a bill --</option>
                {bills.map(bill => (
                  <option key={bill.id} value={bill.id}>
                    {bill.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount (R)</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-capitec-blue"
                placeholder="0.00"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-capitec-blue text-white p-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Pay Bill
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Transfer Money View
  if (transactView === 'transfer') {
    return (
      <div className="flex flex-col bg-white h-full">
        <header className="bg-capitec-header p-4 flex justify-between items-center text-white sticky top-0 z-20 shadow-sm relative flex-shrink-0 h-16">
          <button onClick={() => setTransactView('menu')} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Transfer Money</h1>
          <div className="w-6"></div>
        </header>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3">
            {successMessage}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 pb-20">
          <form onSubmit={handleTransferMoney} className="space-y-4">
            {/* From Account */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Account</label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-capitec-blue"
              >
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>
                    {acc.accountNumber} - R{acc.balance.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount (R)</label>
              <input
                type="number"
                step="0.01"
                value={formData.transferAmount}
                onChange={(e) => setFormData({ ...formData, transferAmount: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-capitec-blue"
                placeholder="0.00"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-capitec-blue"
                placeholder="Enter transfer description"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-capitec-blue text-white p-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Transfer Money
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <div className="text-center p-4">Unknown view</div>;
};

export default Transact;
