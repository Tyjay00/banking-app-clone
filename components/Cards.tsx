
import React from 'react';

const Cards: React.FC = () => {
  return (
    <div className="flex flex-col bg-[#f4f4f4] min-h-full">
      {/* Header Tabs */}
      <nav className="bg-capitec-header flex text-white font-semibold text-[15px] sticky top-0 z-20">
        <button className="flex-1 py-4 border-b-4 border-white">Cards</button>
        <button className="flex-1 py-4 opacity-70">Virtual</button>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-col items-center px-6 pt-10">
        
        {/* Physical Card Representation */}
        <div className="relative w-full aspect-[1/1.58] max-w-[280px] bg-[#1a1a1a] rounded-[24px] shadow-2xl overflow-hidden flex flex-col p-8 mb-8 group transition-transform hover:scale-[1.02]">
          {/* Subtle wood-like grain texture overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')]"></div>
          
          {/* Card Top Info */}
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div className="flex flex-col">
              <span className="text-white text-lg leading-tight">Personal</span>
              <span className="text-white font-bold text-2xl leading-tight">debit</span>
            </div>
            <div className="text-white opacity-80">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 11V8m0-4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 11c-.77 1.333.192 3 1.732 3z" className="hidden"/>
                <path d="M15 6a3 3 0 00-6 0m6 0a3 3 0 00-6 0M12 11a5 5 0 01-5-5m5 5a5 5 0 005-5" className="hidden"/>
                <path d="M5 8a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H6a1 1 0 01-1-1V8z" className="hidden"/>
                {/* Contactless symbol */}
                <path d="M17 12c.5-1.5.5-3 0-4.5m-3 6.5c1.5-2 1.5-6 0-8m-3 10.5c2.5-3 2.5-9 0-12" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* ACTIVE Badge */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 mt-4 z-20">
             <div className="bg-[#8cc63f] px-5 py-1.5 rounded-full border-2 border-white shadow-md">
                <span className="text-white text-[10px] font-bold tracking-widest uppercase">Active</span>
             </div>
          </div>

          {/* Center Logo Section */}
          <div className="flex-1 flex flex-col items-center justify-center mb-8 relative z-10">
            <div className="flex items-center gap-3">
               <div className="w-16 h-12 bg-white rounded-[6px] flex items-center justify-center">
                  <div className="w-10 h-8 flex flex-col items-center justify-center">
                    <div className="w-full h-1.5 bg-[#1a1a1a] mb-1"></div>
                    <div className="w-6 h-4 border-2 border-[#1a1a1a] rounded-sm flex items-center justify-center">
                       <div className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full"></div>
                    </div>
                  </div>
               </div>
               <span className="text-white text-3xl font-bold tracking-[.15em] opacity-90 uppercase">Capitec</span>
            </div>
          </div>

          {/* Bottom Card Details */}
          <div className="mt-auto relative z-10">
            <p className="text-white/90 font-medium text-[17px] mb-1 tracking-wider uppercase">Mr T Joel</p>
            <p className="text-white font-bold text-xl tracking-widest mb-1">1533855526</p>
            <p className="text-white/60 text-[10px] font-bold tracking-[.15em] uppercase">Savings Account Number</p>
          </div>

          {/* Mastercard Logo */}
          <div className="absolute bottom-10 right-8 flex items-center">
             <div className="w-10 h-10 bg-[#eb001b] rounded-full opacity-90"></div>
             <div className="w-10 h-10 bg-[#f79e1b] rounded-full -ml-4 opacity-90"></div>
          </div>

          {/* Blue side indicator */}
          <div className="absolute top-1/4 bottom-1/4 right-0 w-[4px] bg-[#009fe3] rounded-l-md shadow-[0_0_15px_rgba(0,159,227,0.5)]"></div>
        </div>

        {/* Action Links */}
        <button className="text-capitec-blue font-bold text-[15px] mb-10">
          Show Card Details
        </button>

        {/* Info Box */}
        <div className="w-full bg-[#e6f4f9] rounded-xl p-5 flex items-start gap-4 mb-8">
           <div className="w-6 h-10 bg-capitec-blue rounded-full mt-1"></div>
           <div>
              <p className="text-gray-700 text-[15px]">Your daily online limit is <span className="font-bold">R50 000</span></p>
              <button className="text-capitec-blue font-bold text-[16px] mt-0.5">Manage</button>
           </div>
        </div>

        {/* Toggles */}
        <div className="w-full">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-gray-700 font-bold text-[18px]">Online purchases</h3>
              <button className="relative w-[70px] h-[32px] bg-[#8cc63f] rounded-full p-1 transition-colors">
                 <div className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-[11px] font-bold">YES</div>
                 <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm"></div>
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Cards;
