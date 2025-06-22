import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
  >
    {label}
  </button>
);

export default Button;
