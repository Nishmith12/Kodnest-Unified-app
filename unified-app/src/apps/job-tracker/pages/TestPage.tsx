import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useJobs } from '../context/JobContext';
import { Link } from 'react-router-dom';

const TEST_ITEMS = [
    { id: '1', label: 'Preferences persist after refresh', desc: 'Change filters/settings, reload page, check if saved.' },
    { id: '2', label: 'Match score calculates correctly', desc: 'Verify score updates based on keywords/role.' },
    { id: '3', label: '"Show only matches" toggle works', desc: 'Enable toggle, ensure low matches disappear.' },
    { id: '4', label: 'Save job persists after refresh', desc: 'Save a job, reload, check Saved page.' },
    { id: '5', label: 'Apply opens in new tab', desc: 'Click Apply, check for new browser tab.' },
    { id: '6', label: 'Status update persists after refresh', desc: 'Change status, reload, verify status retained.' },
    { id: '7', label: 'Status filter works correctly', desc: 'Filter by "Applied", ensure only applied jobs show.' },
    { id: '8', label: 'Digest generates top 10 by score', desc: 'Check Digest page for high scoring jobs.' },
    { id: '9', label: 'Digest persists for the day', desc: 'Reload/Nav away, return to Digest, same jobs.' },
    { id: '10', label: 'No console errors on main pages', desc: 'Open F12 Console, browse pages, check for red errors.' }
];

const TestPage: React.FC = () => {
    const { testResults, updateTestResult, resetTestResults, allTestsPassed } = useJobs();
    const passedCount = Object.values(testResults).filter(Boolean).length;
    const progress = (passedCount / 10) * 100;

    return (
        <div className="max-w-2xl mx-auto py-8 animate-fade-in space-y-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-[var(--text-primary)]">Pre-Flight Checklist</h1>
                <p className="text-[var(--text-muted)] mt-2">Verify all system integrity checks before enabling the launch sequence.</p>
            </div>

            <Card className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-[var(--text-primary)]">System Verification</h2>
                        <div className={`text-sm font-medium mt-1 ${passedCount === 10 ? 'text-green-600' : 'text-amber-600'}`}>
                            {passedCount === 10 ? 'All Systems Go' : `${10 - passedCount} Tests Remaining`}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-[var(--accent-primary)]">{passedCount} / 10</div>
                        <div className="text-xs text-[var(--text-muted)]">PASSED</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-8 overflow-hidden">
                    <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${passedCount === 10 ? 'bg-green-500' : 'bg-[var(--accent-primary)]'}`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Checklist */}
                <div className="space-y-4">
                    {TEST_ITEMS.map((item) => (
                        <div key={item.id} className="group relative">
                            <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                                <input
                                    type="checkbox"
                                    className="mt-1 w-5 h-5 rounded border-gray-300 text-[var(--accent-primary)] focus:ring-[var(--accent-primary)] cursor-pointer"
                                    checked={!!testResults[item.id]}
                                    onChange={(e) => updateTestResult(item.id, e.target.checked)}
                                />
                                <div className="flex-1">
                                    <span className={`text-sm font-medium block ${testResults[item.id] ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                        {item.label}
                                    </span>
                                    <span className="text-xs text-gray-400 mt-0.5 block group-hover:text-gray-500">
                                        How to test: {item.desc}
                                    </span>
                                </div>
                            </label>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Button variant="text" size="sm" onClick={resetTestResults} className="text-gray-400 hover:text-red-500">
                        Reset Test Status
                    </Button>

                    <Link to="/jobs/08-ship">
                        <Button size="lg" disabled={!allTestsPassed} className={allTestsPassed ? 'bg-green-600 hover:bg-green-700' : ''}>
                            {allTestsPassed ? 'Proceed to Launch 🚀' : 'Complete Checks to Unlock'}
                        </Button>
                    </Link>
                </div>
            </Card>

            {!allTestsPassed && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <div>
                        <h4 className="font-bold text-amber-900 text-sm">Launch Sequence Hold</h4>
                        <p className="text-amber-800 text-xs mt-1">
                            The shipping route (/jt/08-ship) is currently locked. You must verify all 10 items above before the system will allow deployment.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestPage;
