import React from 'react';

export const SnapchatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M11.5 3c-3.04 0-5.5 2.46-5.5 5.5c0 1.63 .72 3.09 1.85 4.09c-1.18 .86-1.85 2.31-1.85 3.91c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5c0-1.6-.67-3.05-1.85-3.91c1.13-1 1.85-2.46 1.85-4.09c0-3.04-2.46-5.5-5.5-5.5z" />
  </svg>
);