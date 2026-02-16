import React from 'react';

const Card = ({ children, title, action, className = '', noPadding = false }) => {
    return (
        <div className={className} style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--space-1)',
            overflow: 'hidden', // Ensure content doesn't spill
            marginBottom: 'var(--space-3)'
        }}>
            {title && (
                <div style={{
                    padding: 'var(--space-3)',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h3 style={{
                        fontFamily: 'var(--font-sans)', // Cards often use sans for headers if small
                        fontSize: '16px',
                        fontWeight: '600',
                        margin: 0
                    }}>{title}</h3>
                    {action && <div>{action}</div>}
                </div>
            )}
            <div style={{ padding: noPadding ? '0' : 'var(--space-3)' }}>
                {children}
            </div>
        </div>
    );
};

export default Card;
