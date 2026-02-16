import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    className = '',
    ...props
}) => {
    return (
        <div className="flex flex-col gap-sm w-full">
            {label && (
                <label className="text-sm font-medium text-[var(--text-primary)]">
                    {label}
                </label>
            )}
            <input
                className={`
          w-full px-4 py-2 border rounded-[var(--radius-sm)] 
          bg-white text-[var(--text-primary)] 
          focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent
          transition-all duration-200
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-[var(--border-color)]'}
          ${className}
        `}
                style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    height: '40px', // consistent height
                }}
                {...props}
            />
            {error && (
                <span className="text-sm text-red-500 mt-1">{error}</span>
            )}
            {helperText && !error && (
                <span className="text-sm text-[var(--text-muted)] mt-1">{helperText}</span>
            )}
        </div>
    );
};
