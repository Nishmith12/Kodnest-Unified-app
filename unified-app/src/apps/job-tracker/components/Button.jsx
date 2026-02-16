import React from 'react';

export const Button = ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    children,
    ...props
}) => {
    return (
        <button
            className={`btn btn-${variant} btn-${size} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                transition: 'all var(--transition-fast)',
                cursor: isLoading || props.disabled ? 'not-allowed' : 'pointer',
                opacity: isLoading || props.disabled ? 0.7 : 1,

                // Variant Styles (default to primary)
                backgroundColor: variant === 'primary' ? 'var(--accent-primary)' : 'transparent',
                color: variant === 'primary' ? '#fff' : 'var(--accent-primary)',
                border: variant === 'secondary' ? '1px solid var(--accent-primary)' : '1px solid transparent',

                // Size Styles
                padding: size === 'sm' ? '4px 8px' : size === 'lg' ? '16px 24px' : '8px 16px',
                fontSize: size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem',
                borderRadius: 'var(--radius-md)',
            }}
        >
            {isLoading ? (
                <span className="mr-2">Loading...</span>
            ) : null}
            {children}
        </button>
    );
};

Button.displayName = 'Button';
