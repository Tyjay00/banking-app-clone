
import React from 'react';

const Explore: React.FC = () => {
  const exploreItems = [
    {
      title: 'Main Account',
      description: 'Day-to-day transactional account',
      iconColor: 'bg-[#009fe3]',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M7 17l-5-5 5-5M17 7l5 5-5 5M2 12h20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: 'Save',
      description: 'Access, Notice, Fixed and Tax-free',
      iconColor: 'bg-[#001b44]',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 19h2v-7H5v7zm4 0h2V9H9v10zm4 0h2v-4h-2v4zm4 0h2V7h-2v12zm2 2H3v-2h18v2z" />
          <path d="M19 12l-1.41-1.41L13 15.17l-3-3l-7 7L4.41 20.59 10 15l3 3z" />
        </svg>
      )
    },
    {
      title: 'Credit',
      description: 'Credit Card, Facility & Loan',
      iconColor: 'bg-[#e20613]',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'Insure',
      description: 'Cover for you and your family',
      iconColor: 'bg-[#6d7d8b]',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col bg-[#f4f4f4]">
      {/* Header */}
      <header className="bg-capitec-header flex flex-col pt-4 sticky top-0 z-20 flex-shrink-0">
        <h1 className="text-white text-center text-xl font-semibold mb-6">Explore</h1>
        
        {/* Navigation Tabs */}
        <nav className="flex text-white font-semibold text-[14px]">
          <button className="flex-1 pb-4 border-b-4 border-white text-center">GlobalOne</button>
          <button className="flex-1 pb-4 opacity-70 text-center">Capitec Connect</button>
          <button className="flex-1 pb-4 opacity-70 text-center">Live Better</button>
        </nav>
      </header>

      {/* Explore Grid */}
      <div className="p-4 space-y-4">
        {exploreItems.map((item, idx) => (
          <button 
            key={idx}
            className="w-full bg-white rounded-lg shadow-sm border border-gray-100 flex items-center h-24 overflow-hidden active:bg-gray-50 transition-colors text-left"
          >
            <div className={`w-20 h-full ${item.iconColor} flex items-center justify-center shrink-0`}>
              {item.icon}
            </div>
            <div className="flex-1 px-4 flex justify-between items-center">
              <div>
                <h3 className="text-capitec-blue font-bold text-[17px] leading-tight">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-0.5 leading-tight">{item.description}</p>
              </div>
              <span className="text-capitec-blue text-xl opacity-60">❯</span>
            </div>
          </button>
        ))}

        {/* Business Section */}
        <div className="pt-6 pb-2">
           <h2 className="text-gray-700 font-bold text-[18px]">For your business</h2>
        </div>

        <button className="w-full bg-white rounded-lg shadow-sm border border-gray-100 flex items-center h-24 overflow-hidden active:bg-gray-50 transition-colors text-left group">
          <div className="w-20 h-full flex items-center justify-center shrink-0">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-capitec-blue">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
          </div>
          <div className="flex-1 px-4 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-gray-800 font-bold text-[17px] leading-tight">Entrepreneur Account</h3>
                <span className="bg-[#e20613] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">New</span>
              </div>
              <p className="text-gray-500 text-sm mt-0.5 leading-tight">Made for your business, your way</p>
            </div>
            <span className="text-capitec-blue text-xl opacity-60 group-active:opacity-100">❯</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Explore;
