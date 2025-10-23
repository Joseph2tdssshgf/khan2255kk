
import React from 'react';
import { FishIcon } from './icons/FishIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <FishIcon className="h-10 w-10 text-teal-600 mr-3" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
          Murrel Fish Seed Finder
        </h1>
      </div>
    </header>
  );
};
