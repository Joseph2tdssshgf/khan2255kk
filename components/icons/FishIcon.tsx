
import React from 'react';

export const FishIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2.5 12.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.1 0 2.12.3 3 .83V4.32C14.03 4.11 13.02 4 12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8c.76 0 1.5-.11 2.2-.32l-1.37-1.37c-.38.1-.79.19-1.23.19zm6.5-4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);
