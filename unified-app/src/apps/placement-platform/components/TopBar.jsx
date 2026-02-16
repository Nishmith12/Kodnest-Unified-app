import React from 'react';

const TopBar = ({ projectName = "KodNest Premium Build", stepCurrent = 1, stepTotal = 5, status = "In Progress" }) => {
    return (
        <div style={{
            height: '64px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 var(--space-4)',
            backgroundColor: '#FFFFFF',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            {/* Left: Project Name */}
            <div style={{ fontWeight: '600', fontSize: '16px', letterSpacing: '0.02em' }}>
                {projectName}
            </div>

            {/* Center: Progress Indicator */}
            <div style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-text-secondary)',
                fontSize: '16px'
            }}>
                Step {stepCurrent} / {stepTotal}
            </div>

            {/* Right: Status Badge */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                fontSize: '16px',
                fontWeight: '500',
                padding: 'var(--space-1) var(--space-2)',
                borderRadius: 'var(--space-1)',
                backgroundColor: 'rgba(217, 119, 6, 0.1)', // Muted amber bg
                color: 'var(--color-warning)'
            }}>
                <span style={{
                    width: 'var(--space-1)',
                    height: 'var(--space-1)',
                    borderRadius: '50%',
                    backgroundColor: 'currentColor'
                }}></span>
                {status}
            </div>
        </div>
    );
};

export default TopBar;
