
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (pin: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [pin, setPin] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 5) {
      setPin(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 5) {
      onLogin(pin);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto relative overflow-hidden font-sans">
      {/* Header Area */}
      <header className="pt-4 px-4 flex items-center justify-between">
        <button className="text-[#0082c3] p-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="bg-[#009fe3] rounded-full px-8 py-1.5 shadow-sm">
          <span className="text-white font-bold text-lg">For me</span>
        </div>
        
        <div className="w-12"></div> {/* Spacer to center the pill */}
      </header>

      {/* Main Login Content */}
      <div className="flex-1 px-8 pt-16 flex flex-col items-center">
        {/* GlobalOne Logo */}
        <div className="flex items-center text-[#004b91] mb-20">
          <span className="text-5xl font-bold tracking-tight">Global</span>
          <div className="bg-[#004b91] rounded-full w-10 h-10 flex items-center justify-center mx-1 mt-1">
             <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-[#009fe3] rounded-full"></div>
             </div>
          </div>
          <span className="text-5xl font-bold tracking-tight">ne</span>
        </div>

        {/* PIN Entry Form */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex justify-between items-end mb-2">
            <label className="text-[#4a4a4a] font-bold text-lg">Enter app PIN</label>
            <button type="button" className="text-[#009fe3] font-bold text-lg">Forgot PIN</button>
          </div>
          
          <input
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={handleInputChange}
            autoFocus
            className="w-full h-16 bg-white border border-gray-300 rounded-md px-4 text-3xl tracking-[0.5em] text-center focus:outline-none focus:border-[#009fe3] shadow-inner mb-6"
          />

          <button
            type="submit"
            disabled={pin.length < 5}
            className={`w-full py-4 rounded-lg font-bold text-xl transition-all shadow-md active:scale-[0.98] ${
              pin.length === 5 
                ? 'bg-[#009fe3] text-white opacity-100' 
                : 'bg-[#009fe3] text-white opacity-60'
            }`}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Footer Legal Text */}
      <footer className="p-8 text-center">
        <p className="text-[11px] text-[#7a7a7a] leading-tight">
          Capitec Bank is an authorised financial services provider (FSP 46669) and registered credit provider (NCRCP13). Capitec Bank Limited Reg. No: 1980/003695/06
        </p>
      </footer>

      {/* OS Navigation Bar Simulation (Optional visual flair) */}
      <div className="h-12 bg-black flex items-center justify-around px-12">
        <div className="w-4 h-4 border-l-2 border-b-2 border-white rotate-45 opacity-60"></div>
        <div className="w-4 h-4 rounded-full border-2 border-white opacity-60"></div>
        <div className="w-4 h-4 border-2 border-white opacity-60"></div>
      </div>
    </div>
  );
};

export default Login;
