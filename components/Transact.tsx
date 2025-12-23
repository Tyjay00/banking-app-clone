
import React from 'react';

const Transact: React.FC = () => {
  const MenuItem = ({ label, icon, badge }: { label: string, icon: React.ReactNode, badge?: string }) => (
    <button className="w-full flex items-center p-4 active:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 group">
      <div className="w-10 flex justify-center mr-3 shrink-0">
        {icon}
      </div>
      <div className="flex-1 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 truncate">
          <span className="text-gray-700 font-medium text-[16px] truncate">{label}</span>
          {badge && (
            <span className="bg-[#E20613] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0">
              {badge}
            </span>
          )}
        </div>
        <span className="text-capitec-blue text-xl font-light opacity-60 group-active:opacity-100 ml-2">❯</span>
      </div>
    </button>
  );

  const SectionSeparator = () => (
    <div className="h-4 bg-gray-100 border-y border-gray-200"></div>
  );

  return (
    <div className="flex flex-col bg-white">
      {/* Header */}
      <header className="bg-capitec-header p-4 flex justify-center items-center text-white sticky top-0 z-20 shadow-sm relative flex-shrink-0 h-16">
        <h1 className="text-xl font-semibold">Transact</h1>
        <button className="absolute right-4">
           {/* Lock icon with shield as per screenshot */}
           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        </button>
      </header>

      {/* Primary Actions (from previous implementation, usually at top) */}
      <div className="flex flex-col">
        <MenuItem label="Pay beneficiary" icon={<svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m12-10a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
        <MenuItem label="PayShap" icon={<div className="w-7 h-7 rounded-full border-2 border-dashed border-capitec-blue flex items-center justify-center"><div className="w-3 h-3 bg-capitec-blue transform rotate-45"></div></div>} />
        <MenuItem label="Pay bills" icon={<svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
      </div>

      <SectionSeparator />

      {/* Section 1: Lotto, Vouchers, Licence */}
      <div className="flex flex-col">
        <MenuItem 
          label="Play LOTTO" 
          icon={
            <svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" strokeWidth="1.5"/>
              <path d="M8 8l8 8M16 8l-8 8" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="3" strokeWidth="1.5"/>
            </svg>
          } 
        />
        <MenuItem 
          label="Buy vouchers" 
          icon={
            <svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="1.5"/>
              <path d="M7 12h10M12 9v6" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="5" cy="12" r="1" fill="currentColor"/>
              <circle cx="19" cy="12" r="1" fill="currentColor"/>
            </svg>
          } 
        />
        <MenuItem 
          label="Renew licence disc" 
          badge="New"
          icon={
            <svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M7 10h10M7 14h10M5 8h14l-1.5 7h-11L5 8z" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="8" cy="18" r="2" strokeWidth="1.5"/>
              <circle cx="16" cy="18" r="2" strokeWidth="1.5"/>
              <path d="M12 5v3" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          } 
        />
      </div>

      <SectionSeparator />

      {/* Section 2: Transfers, Recurring, Cash */}
      <div className="flex flex-col">
        <MenuItem 
          label="Transfer money" 
          icon={
            <svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M7 10l5-5 5 5M17 14l-5 5-5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          } 
        />
        <MenuItem 
          label="Recurring/future-dated" 
          icon={
            <svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="4" y="6" width="16" height="14" rx="2" strokeWidth="1.5"/>
              <path d="M4 10h16M8 4v2M16 4v2" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 14a2 2 0 11-2 2" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M10 16a2 2 0 012-2c1.1 0 2 .9 2 2s-.9 2-2 2" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          } 
        />
        <MenuItem 
          label="Send cash" 
          icon={
            <svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="4" y="8" width="16" height="10" rx="2" strokeWidth="1.5"/>
              <circle cx="12" cy="13" r="2" strokeWidth="1.5"/>
              <path d="M16 13h1M7 13h1" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M20 13l2-2" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          } 
        />
      </div>

      <SectionSeparator />

      {/* Section 3: Payments, Scan, Request */}
      <div className="flex flex-col">
        <MenuItem 
          label="Scan to pay" 
          icon={
            <svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" strokeWidth="1.5" strokeLinecap="round"/>
              <rect x="7" y="7" width="3" height="3" strokeWidth="1.5"/>
              <rect x="14" y="7" width="3" height="3" strokeWidth="1.5"/>
              <rect x="7" y="14" width="3" height="3" strokeWidth="1.5"/>
              <path d="M14 14h3v3h-3v-3z" fill="currentColor"/>
            </svg>
          } 
        />
        <MenuItem 
          label="Pay me" 
          icon={
            <svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="4" y="4" width="6" height="6" rx="1" strokeWidth="1.5"/>
              <rect x="14" y="4" width="6" height="6" rx="1" strokeWidth="1.5"/>
              <rect x="4" y="14" width="6" height="6" rx="1" strokeWidth="1.5"/>
              <path d="M14 14h6v6h-6v-6z" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          } 
        />
        <MenuItem 
          label="Capitec Pay" 
          icon={
            <svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="20" r="1" fill="currentColor"/>
              <circle cx="16" cy="20" r="1" fill="currentColor"/>
            </svg>
          } 
        />
        <MenuItem 
          label="Request a payment" 
          icon={
            <div className="relative w-7 h-7 border-2 border-capitec-blue rounded-md flex items-center justify-center">
              <span className="text-capitec-blue font-bold text-xs">R</span>
              <div className="absolute -top-1 -right-1 bg-white p-0.5">
                <svg className="w-3 h-3 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M8 7h12m0 0l-4-4m4 4l-4 4" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          } 
        />
      </div>

      <SectionSeparator />

      {/* Section 4: Debit orders, SARS */}
      <div className="flex flex-col pb-8">
        <MenuItem 
          label="Debit orders" 
          icon={
            <svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="1.5"/>
              <path d="M3 9h18M8 14h2M8 17h5" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16 14l2 2-2 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          } 
        />
        <MenuItem 
          label="SARS eFiling" 
          icon={
            <svg className="w-7 h-7 text-capitec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 5v3h3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="16" cy="18" r="1" fill="currentColor"/>
              <text x="14" y="17" className="text-[6px] font-bold" fill="currentColor">%</text>
            </svg>
          } 
        />
      </div>
    </div>
  );
};

export default Transact;
