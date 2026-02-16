import React, { useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useJobs } from '../context/JobContext';
import { useNavigate } from 'react-router-dom';

const ShipPage: React.FC = () => {
    const { allTestsPassed } = useJobs();
    const navigate = useNavigate();

    // Security Check
    useEffect(() => {
        if (!allTestsPassed) {
            // Option 1: Redirect
            // navigate('/jobs/07-test');
            // Option 2: Allow render but show Access Denied (better for visual confirmation of lock)
        }
    }, [allTestsPassed, navigate]);

    if (!allTestsPassed) {
        return (
            <div className="max-w-md mx-auto py-20 text-center animate-fade-in">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
                <p className="text-gray-600 mb-8">
                    Launch protocols are not verified. You must complete the pre-flight checklist before accessing this area.
                </p>
                <Button onClick={() => navigate('/jt/07-test')}>Go to Checklist</Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-12 animate-fade-in text-center">
            <div className="mb-12">
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 rounded-full"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-6 transform rotate-3 hover:rotate-6 transition-transform">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                <h1 className="text-4xl font-serif font-bold text-[var(--text-primary)] mb-4">Ready for Liftoff</h1>
                <p className="text-xl text-[var(--text-muted)]">
                    All systems verified. KodNest Job Tracker is ready for its maiden voyage.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <Card className="hover:border-green-200 transition-colors">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Quality Assurance
                    </h3>
                    <p className="text-sm text-gray-600">
                        10/10 critical tests passed. Logic and UI integrity confirmed.
                    </p>
                </Card>
                <Card className="hover:border-green-200 transition-colors">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        Design System
                    </h3>
                    <p className="text-sm text-gray-600">
                        Premium styles, responsive layouts, and animations loaded.
                    </p>
                </Card>
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-sm font-mono text-gray-500 mb-4">DEPLOYMENT_KEY: KODNEST_V1_STABLE</p>
                <Button size="lg" className="w-full md:w-auto bg-gray-900 hover:bg-black text-white px-8">
                    Initialize Final Build sequence
                </Button>
            </div>
        </div>
    );
};

export default ShipPage;
