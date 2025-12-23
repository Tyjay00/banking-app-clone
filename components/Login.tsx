
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
      {/* OS Status Bar Simulation */}
      <div className="h-6 bg-black flex items-center justify-between px-4 text-white text-[10px]">
        <span>10:30</span>
        <div className="flex gap-1">
          <span>4G</span>
          <span>100%</span>
        </div>
      </div>

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
        
        <div className="w-12"></div>
      </header>

      {/* Main Login Content */}
      <div className="flex-1 px-8 pt-12 flex flex-col items-center">
        {/* GlobalOne Logo */}
        <div className="flex items-center text-[#004b91] mb-16">
          <span className="text-5xl font-bold tracking-tight">Global</span>
          <div className="relative mx-1 mt-1">
             <div className="w-10 h-10 bg-[#004b91] rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                   <div className="w-3.5 h-3.5 bg-[#009fe3] rounded-full"></div>
                </div>
             </div>
          </div>
          <span className="text-5xl font-bold tracking-tight">ne</span>
        </div>

        {/* PIN Entry Form */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex justify-between items-end mb-2 px-1">
            <label className="text-gray-800 font-bold text-lg">Enter app PIN</label>
            <button type="button" className="text-[#009fe3] font-bold text-lg">Forgot PIN</button>
          </div>
          
          <div className="relative mb-6">
            <input
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={handleInputChange}
              autoFocus
              className="w-full h-16 bg-white border border-gray-300 rounded-md px-4 text-3xl tracking-[0.5em] text-center focus:outline-none focus:border-[#009fe3] shadow-inner transition-colors"
              placeholder="•••••"
            />
          </div>

          <button
            type="submit"
            disabled={pin.length < 5}
            className={`w-full py-4 rounded-lg font-bold text-xl transition-all shadow-md active:scale-[0.98] ${
              pin.length === 5 
                ? 'bg-[#009fe3] text-white' 
                : 'bg-[#009fe3] text-white opacity-40 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Footer Legal Text */}
      <footer className="p-8 text-center bg-white">
        <p className="text-[10px] text-gray-400 leading-tight">
          Capitec Bank is an authorised financial services provider (FSP 46669) and registered credit provider (NCRCP13). Capitec Bank Limited Reg. No: 1980/003695/06
        </p>
      </footer>

      {/* OS Navigation Bar Simulation */}
      <div className="h-14 bg-black flex items-center justify-around px-12">
        <div className="w-4 h-4 border-l-2 border-b-2 border-white rotate-45 opacity-40"></div>
        <div className="w-4 h-4 rounded-full border-2 border-white opacity-40"></div>
        <div className="w-4 h-4 border-2 border-white opacity-40 rounded-[2px]"></div>
      </div>
    </div>
  );
};

export default Login;
