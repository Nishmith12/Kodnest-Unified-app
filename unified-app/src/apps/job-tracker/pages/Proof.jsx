import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useJobs } from '../context/JobContext';

const Proof = () => {
    const { allTestsPassed, submissionLinks, updateSubmissionLink } = useJobs();
    const [copied, setCopied] = useState(false);

    const STEPS = [
        { id: 1, label: 'Project Setup & Foundation' },
        { id: 2, label: 'Authentication & Routing' },
        { id: 3, label: 'Premium Layout & UI' },
        { id: 4, label: 'Data Mocking & Context' },
        { id: 5, label: 'Dashboard & Filtering' },
        { id: 6, label: 'Saved Jobs Persistence' },
        { id: 7, label: 'Daily Digest Engine' },
        { id: 8, label: 'Status Tracking & Tests' }
    ];

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const isComplete =
        allTestsPassed &&
        isValidUrl(submissionLinks.lovable) &&
        isValidUrl(submissionLinks.github) &&
        isValidUrl(submissionLinks.deployed);

    const handleCopy = () => {
        const text = `
Job Notification Tracker — Final Submission

Lovable Project:
${submissionLinks.lovable}

GitHub Repository:
${submissionLinks.github}

Live Deployment:
${submissionLinks.deployed}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
`.trim();

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-3xl mx-auto py-8 animate-fade-in space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-serif font-bold text-[var(--text-primary)]">Proof of Work</h1>
                <p className="text-[var(--text-muted)] mt-2">Final verification and submission for Project 1.</p>
            </div>

            <Card className="p-8">
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Project 1: Job Notification Tracker</h2>
                        <div className="flex gap-3 mt-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isComplete ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                {isComplete ? 'Shipped' : 'In Progress'}
                            </span>
                            {!allTestsPassed && (
                                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700">
                                    Tests Pending
                                </span>
                            )}
                        </div>
                    </div>
                    {isComplete ? (
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                    ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Completion Summary */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                            Step Completion
                        </h3>
                        <div className="space-y-3">
                            {STEPS.map(step => (
                                <div key={step.id} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">{step.id}. {step.label}</span>
                                    <span className="text-green-600 font-bold">✓</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Artifact Collection */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                            Artifact Collection
                        </h3>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Lovable Project Link</label>
                            <input
                                type="url"
                                placeholder="https://lovable.dev/..."
                                className="w-full text-sm border-gray-300 rounded focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]"
                                value={submissionLinks.lovable}
                                onChange={(e) => updateSubmissionLink('lovable', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">GitHub Repository</label>
                            <input
                                type="url"
                                placeholder="https://github.com/..."
                                className="w-full text-sm border-gray-300 rounded focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]"
                                value={submissionLinks.github}
                                onChange={(e) => updateSubmissionLink('github', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Deployed URL</label>
                            <input
                                type="url"
                                placeholder="https://vercel.app/..."
                                className="w-full text-sm border-gray-300 rounded focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]"
                                value={submissionLinks.deployed}
                                onChange={(e) => updateSubmissionLink('deployed', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                    <Button
                        size="lg"
                        className={`w-full ${isComplete ? 'bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)]' : 'bg-gray-300 cursor-not-allowed text-gray-500'}`}
                        disabled={!isComplete}
                        onClick={handleCopy}
                    >
                        {copied ? 'Copied to Clipboard!' : 'Copy Final Submission'}
                    </Button>
                    {!isComplete && (
                        <p className="text-center text-xs text-red-500 mt-2">
                            Complete all tests and provide valid links to unlock submission.
                        </p>
                    )}
                </div>
            </Card>

            {isComplete && (
                <div className="text-center animate-fade-in">
                    <p className="text-green-700 font-medium">Project 1 Shipped Successfully.</p>
                </div>
            )}
        </div>
    );
};

export default Proof;
