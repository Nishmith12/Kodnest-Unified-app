import React from 'react';

const ContextHeader = ({ title, description }) => {
    return (
        <div style={{ marginBottom: 'var(--space-4)' }}>
            <h1 style={{
                fontSize: 'var(--space-4)',
                marginBottom: 'var(--space-1)',
                color: 'var(--color-text-primary)'
            }}>
                {title}
            </h1>
            <p style={{
                color: 'var(--color-text-secondary)',
                fontSize: '16px',
                maxWidth: '720px'
            }}>
                {description}
            </p>
        </div>
    );
};

export default ContextHeader;
