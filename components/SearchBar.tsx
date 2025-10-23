
import React from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      onSearch();
    }
  };

  return (
    <div className="flex items-center w-full max-w-2xl bg-white rounded-full shadow-lg overflow-hidden border-2 border-transparent focus-within:border-teal-500 transition-colors duration-300">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., 'Best murrel fish feed' or 'Dealers near me'"
        className="w-full px-6 py-4 text-gray-700 placeholder-gray-500 focus:outline-none bg-transparent"
        disabled={isLoading}
      />
      <button
        onClick={onSearch}
        disabled={isLoading || !query}
        className="bg-teal-600 text-white p-4 rounded-full m-2 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
        aria-label="Search"
      >
        {isLoading ? (
          <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <SearchIcon className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};
