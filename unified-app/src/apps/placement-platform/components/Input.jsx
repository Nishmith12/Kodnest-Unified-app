import React from 'react';

const Input = ({ label, placeholder, value, onChange, type = 'text', error, ...props }) => {
    return (
        <div style={{ marginBottom: 'var(--space-3)' }}>
            {label && (
                <label style={{
                    display: 'block',
                    marginBottom: 'var(--space-1)',
                    color: 'var(--color-text-secondary)',
                    fontSize: '16px',
                    fontWeight: '500'
                }}>
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    width: '100%',
                    padding: 'var(--space-2)',
                    borderRadius: 'var(--space-1)',
                    border: error ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                    fontSize: '16px',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast)',
                    backgroundColor: '#FFFFFF'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-text-primary)'}
                onBlur={(e) => e.target.style.borderColor = error ? 'var(--color-accent)' : 'var(--color-border)'}
                {...props}
            />
            {error && (
                <span style={{
                    display: 'block',
                    marginTop: 'var(--space-1)',
                    color: 'var(--color-accent)',
                    fontSize: '16px'
                }}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default Input;
