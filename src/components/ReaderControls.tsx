import { useState, useEffect } from 'react';

export default function ReaderControls() {
  const [isOpen, setIsOpen] = useState(false);
  
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fontSize');
      return saved ? parseInt(saved, 10) : 18;
    }
    return 18;
  });
  
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') !== 'light';
    }
    return true;
  });

  // Apply settings to the DOM when they change
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('fontSize', fontSize.toString());
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [fontSize, isDark]);

  return (
    <div className="fixed bottom-[24px] right-[24px] z-50 flex flex-col items-end gap-[12px]" style={{ fontSize: '16px' }}>
      {/* The Expandable Menu */}
      {isOpen && (
        <div className="bg-gray-800 border border-gray-700 rounded-[8px] shadow-xl p-[16px] flex flex-col gap-[16px] min-w-[200px] animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Text Size Controls */}
          <div>
            <div className="text-[12px] leading-none font-bold text-gray-400 uppercase tracking-widest mb-[8px]">Text Size</div>
            <div className="flex items-center justify-between bg-gray-900 rounded-[4px] p-[4px]">
              <button 
                onClick={() => setFontSize(s => Math.max(14, s - 2))}
                className="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-gray-700 text-gray-300 transition-colors"
              >
                <span className="text-[14px]">A</span>
              </button>
              <span className="text-[14px] font-bold text-gray-300">{fontSize}px</span>
              <button 
                onClick={() => setFontSize(s => Math.min(26, s + 2))}
                className="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] hover:bg-gray-700 text-gray-300 transition-colors"
              >
                <span className="text-[18px] font-bold">A</span>
              </button>
            </div>
          </div>

          <hr className="border-gray-700" />

          {/* Theme Toggle */}
          <div>
            <div className="text-[12px] leading-none font-bold text-gray-400 uppercase tracking-widest mb-[8px]">Theme</div>
            <button 
              onClick={() => setIsDark(!isDark)}
              className="w-full py-[8px] px-[12px] rounded-[4px] bg-gray-900 hover:bg-gray-700 transition-colors flex items-center justify-between text-[14px] font-medium text-gray-300"
            >
              <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
              {isDark ? (
                <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>

        </div>
      )}

      {/* The Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[56px] h-[56px] bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
        aria-label="Toggle Reader Controls"
      >
        {isOpen ? (
          <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        )}
      </button>
    </div>
  );
}
