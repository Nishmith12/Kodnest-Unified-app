import React from 'react';

const Button = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
    const baseStyles = {
        padding: 'var(--space-2) var(--space-3)',
        borderRadius: 'var(--space-1)',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'all var(--transition-fast)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-1)',
    };

    const variants = {
        primary: {
            backgroundColor: 'var(--color-accent)',
            color: '#FFFFFF',
            border: '1px solid var(--color-accent)',
        },
        secondary: {
            backgroundColor: 'transparent',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
        },
        outline: { // Explicit outline variant if needed separate from secondary
            backgroundColor: 'transparent',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-text-primary)',
        }
    };

    // Hover styles would typically be handled in CSS, but inline for this specific system or via className
    // Using style prop for dynamic base, but relying on class for hover is better. 
    // Let's add a class for hover handling in index.css or use a styled approach.
    // For simplicity and "one mind" coherent design, I'll attach a specific class.

    return (
        <button
            className={`btn-${variant} ${className}`}
            style={{ ...baseStyles, ...variants[variant] }}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};



export default Button;
