
import React from 'react';
import { Transaction } from '../types';

interface TransactionDetailProps {
  transaction: Transaction;
  onBack: () => void;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ transaction, onBack }) => {
  const isCredit = transaction.amount > 0;
  
  return (
    <div className="flex flex-col bg-white min-h-full">
      {/* Header */}
      <header className="bg-capitec-header p-4 flex items-center text-white sticky top-0 z-20">
        <button onClick={onBack} className="p-1 mr-4">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="text-xl font-semibold">Transaction Details</h1>
      </header>

      {/* Category Selection Section */}
      <button className="flex justify-between items-center p-4 border-b border-gray-100 active:bg-gray-50 group">
        <div>
          <p className="text-gray-500 text-sm mb-1">Category</p>
          <p className="text-gray-800 font-semibold text-[17px]">{transaction.category}</p>
        </div>
        <span className="text-[#0082c3] text-xl font-light">❯</span>
      </button>

      {/* Main Details Section */}
      <div className="p-4 space-y-5 border-b-[12px] border-gray-100">
        <div>
          <p className="text-gray-500 text-sm mb-1">Transaction type</p>
          <p className="text-gray-800 font-semibold text-[17px]">{isCredit ? 'Payment Received' : 'Payment Made'}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm mb-1">Amount</p>
          <p className="text-gray-800 font-semibold text-[17px]">
            {isCredit ? 'R' : '-R'}{Math.abs(transaction.amount).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm mb-1">To account</p>
          <p className="text-gray-800 font-semibold text-[17px]">Main Account</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm mb-1">Transaction date</p>
          <p className="text-gray-800 font-semibold text-[17px]">{transaction.date}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm mb-1">Posting date</p>
          <p className="text-gray-800 font-semibold text-[17px]">{transaction.date.split(' ').slice(0, 3).join(' ')}</p>
        </div>
      </div>

      {/* Description Section */}
      <div className="p-4 space-y-5 border-b-[12px] border-gray-100">
        <div>
          <p className="text-gray-500 text-sm mb-1">Description</p>
          <p className="text-gray-800 font-semibold text-[17px]">
            {isCredit ? 'Payment Received: ' : 'Payment Made: '}{transaction.description}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm mb-1">Long description</p>
          <p className="text-gray-800 font-semibold text-[17px] uppercase">{transaction.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
