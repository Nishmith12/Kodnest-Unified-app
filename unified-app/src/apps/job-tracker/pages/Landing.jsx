import React from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="relative overflow-hidden min-h-[85vh] flex flex-col justify-center">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-20 w-[600px] h-[600px] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/50 shadow-sm text-sm font-medium text-indigo-700 mb-8 animate-fade-in">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    v2.0 Now Live: Smart Match & Daily Digest
                </div>

                <h1 className="text-6xl md:text-8xl font-heading font-extrabold tracking-tight text-[var(--accent-primary)] mb-8 leading-[1.1] drop-shadow-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    Stop Missing The <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                        Right Jobs.
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    Precision-matched job discovery delivered daily. No noise. Just the signals that matter for your career.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center gap-4">
                        <Link to="/jobs/settings">
                            <Button size="lg" className="h-14 px-10 text-lg shadow-xl shadow-indigo-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-[var(--accent-primary)] hover:bg-black">
                                Start Tracking Free
                            </Button>
                        </Link>
                        <Link to="/jobs/dashboard">
                            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg bg-white/50 backdrop-blur-sm border-white/60 hover:bg-white transition-all">
                                View Demo
                            </Button>
                        </Link>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] mt-4">
                        No credit card required. Setup in 2 minutes.
                    </p>
                </div>

                <div className="mt-20 relative animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent to-[var(--bg-secondary)] z-20"></div>
                    <Card className="glass-panel mx-auto max-w-4xl p-2 bg-white/40 ring-1 ring-white/60 shadow-2xl rounded-2xl md:rounded-3xl">
                        <div className="rounded-xl md:rounded-2xl overflow-hidden border border-[var(--border-color)] bg-white shadow-inner">
                            {/* Fake Dashboard Preview */}
                            <div className="h-[300px] md:h-[500px] bg-gray-50 p-6 flex flex-col gap-4 opacity-80">
                                <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-24 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4">
                                            <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
                                                <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Landing;
