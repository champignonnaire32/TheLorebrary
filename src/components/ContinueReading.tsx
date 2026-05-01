import { useState, useEffect } from 'react';

interface ProgressItem {
  range: string;
  currentUrl: string;
  nextUrl: string | null;
  bookName: string;
  seriesName: string;
  timestamp: number;
}

export default function ContinueReading() {
  const [items, setItems] = useState<ProgressItem[]>([]);

  useEffect(() => {
    try {
      const found: ProgressItem[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('distiller_progress_')) {
          const data = JSON.parse(localStorage.getItem(key) ?? '');
          if (data?.timestamp) found.push(data);
        }
      }
      found.sort((a, b) => b.timestamp - a.timestamp);
      setItems(found.slice(0, 3));
    } catch (e) {}
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="mb-10 w-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-bold text-cream-500 dark:text-cream-500 uppercase tracking-[0.15em]">
          Continue Reading
        </span>
        <div className="h-0.5 flex-1 bg-cream-200 dark:bg-ink-700" />
      </div>
      <div className="flex flex-wrap gap-3">
        {items.map((item, i) => {
          const dest = item.nextUrl || item.currentUrl;
          const label = item.nextUrl
            ? `Next → Ch. ${item.nextUrl.split('/').pop()}`
            : `Resume → Ch. ${item.range}`;

          return (
            <a
              key={i}
              href={dest}
              className="flex flex-col px-4 py-3 bg-cream-50 dark:bg-ink-800 border border-gold-400/40 dark:border-gold-400/25 rounded-lg hover:border-gold-400 dark:hover:border-gold-400 hover:shadow-[0_4px_20px_rgba(201,168,76,0.10)] transition-all duration-200 group min-w-[160px]"
            >
              <span className="text-xs font-bold text-cream-500 dark:text-cream-500 uppercase tracking-[0.12em] mb-0.5">
                {item.seriesName}
              </span>
              <span className="text-sm font-display font-semibold text-cream-900 dark:text-cream-100 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors duration-200 leading-tight">
                {item.bookName}
              </span>
              <span className="text-xs text-gold-600 dark:text-gold-400 mt-1.5">
                {label}
              </span>
            </a>
          );
        })}
      </div>
      <div className="w-full h-0.5 mt-4 bg-cream-200 dark:bg-ink-700" />
    </div>
  );
}
