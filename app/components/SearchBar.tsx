'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, onSearch]);

  return (
    <div className={`relative transition-all duration-300 ${
      isFocused ? 'scale-[1.02]' : 'scale-100'
    }`}>
      <div className="relative">
        <MagnifyingGlassIcon 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Поиск по названию работы..."
          className="w-full pl-10 pr-4 py-2 bg-[#181F38] border border-gray-700 rounded-lg 
                   text-white placeholder-gray-400 focus:outline-none focus:border-[#454CEE] 
                   focus:ring-1 focus:ring-[#454CEE] transition-all duration-300"
        />
      </div>
    </div>
  );
} 