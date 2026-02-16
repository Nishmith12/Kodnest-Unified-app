import React from 'react';
import TopBar from './TopBar';
import ProofFooter from './ProofFooter';

const Layout = ({ children }) => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--color-bg)'
        }}>
            <TopBar />

            <main style={{
                flex: 1,
                padding: 'var(--space-4)',
                paddingBottom: '80px', // Space for footer
                maxWidth: '1440px',
                margin: '0 auto',
                width: '100%'
            }}>
                {children}
            </main>

            <ProofFooter />
        </div>
    );
};

export default Layout;
