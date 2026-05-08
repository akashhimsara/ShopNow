"use client";

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const base = 'px-4 py-2 rounded-md font-medium';
  const cls =
    variant === 'primary'
      ? `${base} bg-blue-600 text-white hover:bg-blue-700`
      : `${base} bg-gray-100 text-gray-800 hover:bg-gray-200`;

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
};

export default Button;
