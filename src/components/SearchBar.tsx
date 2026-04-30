import { useState, useMemo, useRef, useEffect } from 'react';
import Fuse from 'fuse.js';

export interface SearchItem {
  type: 'Series' | 'Book';
  title: string;
  subtitle?: string;
  url: string;
}

interface SearchBarProps {
  searchData: SearchItem[];
}

export default function SearchBar({ searchData }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => new Fuse(searchData, {
    keys: ['title', 'subtitle'],
    threshold: 0.3, // Lower is more strict, higher is more fuzzy (0.3 is a good balance)
    ignoreLocation: true, // Allow matches anywhere in the string
  }), [searchData]);

  // Perform search
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 5).map(result => result.item); // Return top 5 results
  }, [query, fuse]);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mb-12">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors placeholder-gray-400 dark:placeholder-gray-500 text-lg"
          placeholder="Search by series or book title..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && query.trim() && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {results.length > 0 ? (
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {results.map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.url} 
                    className="block px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
                        {item.title}
                      </span>
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
                        item.type === 'Series' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    {item.subtitle && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.subtitle}
                      </div>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
              No archives found for "<span className="font-semibold text-gray-900 dark:text-gray-100">{query}</span>"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
