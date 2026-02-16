import React from 'react';

export const Card = ({
    children,
    title,
    footer,
    className = '',
    onClick
}) => {
    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-[var(--radius-md)] border border-[var(--border-color)] overflow-hidden ${className}`}
            style={{
                padding: 'var(--space-md)',
                boxShadow: 'none', // Strictly no drop shadows
                transition: 'border-color var(--transition-fast)',
            }}
        >
            {title && (
                <div className="mb-4 pb-2 border-b border-[var(--border-color)]">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                        {title}
                    </h3>
                </div>
            )}
            <div className="text-[var(--text-primary)]">
                {children}
            </div>
            {footer && (
                <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                    {footer}
                </div>
            )}
        </div>
    );
};
