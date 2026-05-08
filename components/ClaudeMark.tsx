import React from 'react';

export const ClaudeMark = ({ size = 16, color }: { size?: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M16 3C9.373 3 4 8.373 4 15c0 4.418 2.354 8.284 5.875 10.5V21h-.75A1.125 1.125 0 018 19.875v-.75A1.125 1.125 0 019.125 18H10v-3a6 6 0 1112 0v3h.875A1.125 1.125 0 0124 19.125v.75A1.125 1.125 0 0122.875 21h-.75v4.5C25.646 23.284 28 19.418 28 15c0-6.627-5.373-12-12-12z"
      fill={color}
      opacity="0.9"
    />
  </svg>
);
