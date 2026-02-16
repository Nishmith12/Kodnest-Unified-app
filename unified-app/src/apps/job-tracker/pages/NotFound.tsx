import React from 'react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <h1 className="text-6xl font-serif font-bold text-[var(--accent-primary)] mb-4">404</h1>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Page Not Found</h2>
            <p className="text-[var(--text-muted)] mb-8 max-w-md">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link to="/jobs/dashboard">
                <Button>Return to Dashboard</Button>
            </Link>
        </div>
    );
};

export default NotFound;
