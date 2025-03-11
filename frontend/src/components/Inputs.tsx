import React from 'react';
import { IconType } from 'react-icons';

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: IconType;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          Icon ? 'pl-10' : ''
        }`}
      />
    </div>
  </div>
);

export default Input;
