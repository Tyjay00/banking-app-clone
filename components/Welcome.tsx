import React, { useState } from 'react';

interface WelcomeProps {
  onContinue: () => void;
  userName: string;
}

const Welcome: React.FC<WelcomeProps> = ({ onContinue, userName }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const greetings = [
    { label: 'hello', lang: 'English' },
    { label: 'sawubona', lang: 'Zulu' },
    { label: 'hallo', lang: 'German' },
    { label: 'molo', lang: 'Xhosa' },
    { label: 'dumela', lang: 'Tswana' }
  ];

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex justify-between items-center border-b border-gray-100 flex-shrink-0">
        <button className="p-2">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="flex gap-2">
          <button className="p-2">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="p-2">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        {/* Greeting Section */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-red-500 mb-4" style={{
            background: 'linear-gradient(45deg, #E20613, #ff6b6b)',
            WebKitBackgroundClip: 'text',
            WebKitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            hello
          </h1>
          
          {/* Carousel pagination */}
          <div className="flex justify-center gap-2 mb-6">
            {[0, 1, 2, 3, 4].map((dot) => (
              <button
                key={dot}
                onClick={() => setCurrentSlide(dot)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === dot ? 'bg-capitec-blue w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* User Name */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{userName.toUpperCase()}</h2>
          <p className="text-gray-400 text-sm">Welcome back to your banking</p>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
          <div className="flex gap-3">
            <div className="text-yellow-400 font-bold text-2xl">⚠️</div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Payment issues</h3>
              <p className="text-gray-600 text-xs mt-1">
                You may experience delays or errors when making payments in the app. We're working on resolving it urgently.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {/* Buy Airtime and Data */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center h-32 shadow-sm">
            <div className="text-capitec-blue mb-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M11 3h2v4h-2V3zm0 14h2v4h-2v-4zm9-8h4v2h-4v-2zM3 11h4v2H3v-2zm15.657-1.343l2.828-2.828 1.414 1.414-2.828 2.828-1.414-1.414zM7.071 17.071l-2.828 2.828-1.414-1.414 2.828-2.828 1.414 1.414z" strokeWidth="1.5" fill="currentColor"/>
              </svg>
            </div>
            <p className="text-gray-700 font-medium text-center text-sm">Buy airtime and data</p>
          </div>

          {/* Buy Electricity */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center h-32 shadow-sm">
            <div className="text-capitec-blue mb-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 2v1.5M12 4.5V6m8.485.515l-1.06 1.06m-1.42-1.42l1.06-1.06M20.5 12h-1.5m-2.5 0h2.5m-6 0H12m-3.5 0H6m1.06 8.485l1.06 1.06m-1.42-1.42l-1.06 1.06M12 20v-1.5m0-2.5v2.5m-8.485-6.485l1.06-1.06m1.42 1.42l-1.06-1.06M3.5 12h1.5m2.5 0H3.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-gray-700 font-medium text-center text-sm">Buy electricity</p>
          </div>

          {/* Transfer */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center h-32 shadow-sm">
            <div className="text-capitec-blue mb-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-gray-700 font-medium text-center text-sm">Transfer</p>
          </div>

          {/* More Options */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center h-32 shadow-sm">
            <div className="text-capitec-blue mb-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 5v14m7-7H5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-gray-700 font-medium text-center text-sm">More options</p>
          </div>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="bg-white border-t border-gray-200 p-4 space-y-2 flex-shrink-0">
        {/* Sign In Button */}
        <button
          onClick={onContinue}
          className="w-full bg-capitec-blue text-white font-bold py-4 rounded-lg shadow-md hover:opacity-90 transition-opacity"
        >
          Sign In
        </button>

        {/* Scan to Pay */}
        <div className="flex justify-center pt-2">
          <button className="flex flex-col items-center gap-2 text-capitec-blue">
            <div className="bg-capitec-blue text-white p-4 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M6 6h1v1H6V6zm11 0h1v1h-1V6zM6 17h1v1H6v-1zm11 0h1v1h-1v-1z" fill="currentColor"/>
              </svg>
            </div>
            <span className="text-sm font-medium">Scan to pay</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
