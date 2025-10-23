
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Murrel Fish Seed Finder. Powered by AI.</p>
      </div>
    </footer>
  );
};
