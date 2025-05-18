import React from 'react';

interface InputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
}

/**
 * Reusable Input component
 */
export const Input: React.FC<InputProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  className = '',
  required = false,
  disabled = false,
  label,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                   focus:outline-none focus:ring-primary focus:border-primary
                   ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                   ${className}`}
      />
    </div>
  );
};