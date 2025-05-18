import React from 'react';

interface SelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  className?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
}

/**
 * Reusable Select component
 */
export const Select: React.FC<SelectProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  className = '',
  required = false,
  disabled = false,
  placeholder = 'Select an option',
  label,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                   focus:outline-none focus:ring-primary focus:border-primary
                   ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                   ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};