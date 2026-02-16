import React, { useState } from 'react';

const CheckItem = ({ label, checked, onChange }) => (
    <label style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-1)',
        cursor: 'pointer',
        fontSize: '16px',
        color: checked ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        transition: 'color var(--transition-fast)'
    }}>
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            style={{ accentColor: 'var(--color-accent)' }}
        />
        {label}
    </label>
);

const ProofFooter = () => {
    const [checks, setChecks] = useState({
        ui: false,
        logic: false,
        test: false,
        deployed: false
    });

    const toggle = (key) => setChecks(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div style={{
            height: 'var(--space-5)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Or center? User asked for persistent bottom section
            padding: '0 var(--space-4)',
            backgroundColor: '#FFFFFF',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100
        }}>
            <div style={{ fontSize: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Proof of Work
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <CheckItem label="UI Built" checked={checks.ui} onChange={() => toggle('ui')} />
                <CheckItem label="Logic Working" checked={checks.logic} onChange={() => toggle('logic')} />
                <CheckItem label="Test Passed" checked={checks.test} onChange={() => toggle('test')} />
                <CheckItem label="Deployed" checked={checks.deployed} onChange={() => toggle('deployed')} />
            </div>

            <div style={{ width: 'var(--space-5)' }}></div> {/* Spacer for balance */}
        </div>
    );
};

export default ProofFooter;
