
import React from 'react';

type Tab = 'home' | 'cards' | 'transact' | 'messages' | 'explore';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 flex justify-around items-end px-1 pb-1 z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      
      {/* Home */}
      <button 
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center flex-1 pt-3 pb-1 transition-all ${activeTab === 'home' ? 'text-capitec-blue' : 'text-gray-500'}`}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[11px] font-semibold mt-1">Home</span>
      </button>

      {/* Cards */}
      <button 
        onClick={() => onTabChange('cards')}
        className={`flex flex-col items-center flex-1 pt-3 pb-1 transition-all ${activeTab === 'cards' ? 'text-capitec-blue' : 'text-gray-500'}`}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.5"/>
          <path d="M3 10h18" strokeWidth="1.5"/>
          <path d="M7 15h2" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="text-[11px] font-semibold mt-1">Cards</span>
      </button>

      {/* Transact (Large Center Icon) */}
      <button 
        onClick={() => onTabChange('transact')}
        className="flex flex-col items-center flex-1 relative mb-0.5 group"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white rounded-t-2xl px-2 pt-1 border-t border-x border-capitec-blue">
           <div className="relative">
              <svg className="w-14 h-14 text-capitec-blue group-hover:text-capitec-blue transition-colors" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M8 5v14l11-7z" className="opacity-0"/>
                 <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                 <path d="M7 12l3.5 3.5L17 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                 <path d="M7 16l3.5-3.5L17 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {/* New Badge */}
              <div className="absolute -top-1 -right-1 bg-[#E20613] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white">
                New
              </div>
           </div>
        </div>
        <span className="text-[11px] font-semibold text-capitec-blue mt-12">Transact</span>
      </button>

      {/* Messages */}
      <button 
        onClick={() => onTabChange('messages')}
        className={`flex flex-col items-center flex-1 pt-3 pb-1 transition-all ${activeTab === 'messages' ? 'text-capitec-blue' : 'text-gray-500'}`}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[11px] font-semibold mt-1">Messages</span>
      </button>

      {/* Explore */}
      <button 
        onClick={() => onTabChange('explore')}
        className={`flex flex-col items-center flex-1 pt-3 pb-1 transition-all ${activeTab === 'explore' ? 'text-capitec-blue' : 'text-gray-500'}`}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" strokeWidth="1.5"/>
          <path d="M9 9l3 6 3-6-3 6-3-6z" fill="currentColor" className="opacity-20"/>
          <circle cx="12" cy="12" r="3" strokeWidth="1.5"/>
          <path d="M12 3v2m0 14v2m9-9h-2M5 12H3" strokeWidth="1.5"/>
        </svg>
        <span className="text-[11px] font-semibold mt-1">Explore</span>
      </button>

    </nav>
  );
};

export default Navigation;
