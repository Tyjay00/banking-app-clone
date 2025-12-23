
import React from 'react';

const Messages: React.FC = () => {
  return (
    <div className="flex flex-col bg-white min-h-full">
      {/* Header */}
      <header className="bg-capitec-header flex flex-col pt-4 sticky top-0 z-20">
        <div className="relative px-4 flex justify-center items-center h-12">
          <h1 className="text-white text-xl font-semibold">Messages</h1>
          <button className="absolute right-4 text-white p-1">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        {/* Navigation Tabs */}
        <nav className="flex text-white font-semibold text-[15px] mt-2">
          <button className="flex-1 pb-4 border-b-4 border-white text-center">Transactions</button>
          <button className="flex-1 pb-4 opacity-70 text-center">Inbox</button>
        </nav>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-start pt-16 px-8 text-center bg-gray-50/30">
        
        {/* Illustration Container */}
        <div className="relative w-48 h-48 mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Simple Envelope SVG Illustration */}
            <svg className="w-full h-full text-gray-400" viewBox="0 0 200 150" fill="none">
              {/* Back flap */}
              <rect x="10" y="40" width="180" height="100" rx="4" stroke="currentColor" strokeWidth="2"/>
              {/* Papers sticking out */}
              <rect x="30" y="10" width="140" height="80" fill="white" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="50" y1="30" x2="150" y2="30" stroke="#f1f1f1" strokeWidth="6"/>
              <line x1="50" y1="50" x2="120" y2="50" stroke="#f1f1f1" strokeWidth="6"/>
              <line x1="50" y1="70" x2="100" y2="70" stroke="#e20613" strokeWidth="4" className="opacity-60"/>
              {/* Envelope V shape front */}
              <path d="M10 40L100 95L190 40" stroke="currentColor" strokeWidth="2" fill="white"/>
              <path d="M10 140L100 95L190 140" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          
          {/* Notification Bubble */}
          <div className="absolute top-8 right-4 bg-[#001b44] text-white w-9 h-9 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
            <span className="font-bold text-sm">0</span>
          </div>
        </div>

        {/* Message Text */}
        <p className="text-gray-600 text-[18px] leading-relaxed mb-10 max-w-[280px]">
          Receive all your transactional messages in the app for free.
        </p>

        {/* Update Button */}
        <button className="w-full bg-capitec-header text-white font-bold py-4 rounded-lg shadow-md hover:bg-[#0071aa] active:scale-[0.98] transition-all text-lg">
          Update
        </button>
      </div>
    </div>
  );
};

export default Messages;
