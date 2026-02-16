import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, RotateCcw, ArrowRight, AlertTriangle, Info } from 'lucide-react';
import {
    getTestChecklist,
    updateTestItem,
    resetTestChecklist,
    getPassedCount,
    getTotalTestCount
} from '../utils/testChecklistStorage';

const TEST_ITEMS = [
    {
        id: 'jd-required',
        label: 'JD required validation works',
        hint: 'Leave JD empty and click Analyze → should show red error and block submission'
    },
    {
        id: 'short-jd-warning',
        label: 'Short JD warning shows for <200 chars',
        hint: 'Enter JD under 200 chars → should show yellow warning but allow submit'
    },
    {
        id: 'skills-extraction',
        label: 'Skills extraction groups correctly',
        hint: 'Analyze JD with React, Node.js, AWS → check skills grouped into Web, Cloud categories'
    },
    {
        id: 'round-mapping',
        label: 'Round mapping changes based on company + skills',
        hint: 'Try "Amazon" (4 rounds) vs unknown company (3 rounds startup pattern)'
    },
    {
        id: 'score-deterministic',
        label: 'Score calculation is deterministic',
        hint: 'Same JD should give same baseScore every time'
    },
    {
        id: 'skill-toggles',
        label: 'Skill toggles update score live',
        hint: 'On results, toggle skill to "know" → finalScore should increase by 2 immediately'
    },
    {
        id: 'persistence',
        label: 'Changes persist after refresh',
        hint: 'Toggle skills, refresh page, reopen from history → finalScore and toggles should be preserved'
    },
    {
        id: 'history',
        label: 'History saves and loads correctly',
        hint: 'Analyze → go to history → reopen entry → all data should be intact'
    },
    {
        id: 'export',
        label: 'Export buttons copy the correct content',
        hint: 'Click copy plan/checklist/questions → paste to verify content matches'
    },
    {
        id: 'no-console-errors',
        label: 'No console errors on core pages',
        hint: 'Open DevTools → navigate Practice, Results, History → check for errors in console'
    }
];

export default function TestChecklist() {
    const navigate = useNavigate();
    const [checklist, setChecklist] = useState({});
    const [passedCount, setPassedCount] = useState(0);
    const totalCount = getTotalTestCount();

    useEffect(() => {
        loadChecklist();
    }, []);

    const loadChecklist = () => {
        const data = getTestChecklist();
        setChecklist(data);
        setPassedCount(getPassedCount());
    };

    const handleToggle = (itemId) => {
        const newChecklist = updateTestItem(itemId, !checklist[itemId]);
        setChecklist(newChecklist);
        setPassedCount(getPassedCount());
    };

    const handleReset = () => {
        if (confirm('Reset all test items? This will uncheck everything.')) {
            const newChecklist = resetTestChecklist();
            setChecklist(newChecklist);
            setPassedCount(0);
        }
    };

    const handleContinue = () => {
        if (passedCount === totalCount) {
            navigate('/placement/08-ship');
        }
    };

    const allPassed = passedCount === totalCount;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Pre-Ship Test Checklist
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Verify all platform features before deployment
                    </p>
                </div>

                {/* Summary Card */}
                <div className={`p-6 rounded-lg shadow-md mb-8 border-2 transition-all ${allPassed
                    ? 'bg-green-50 border-green-300'
                    : 'bg-orange-50 border-orange-300'
                    }`}>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Tests Passed: {passedCount} / {totalCount}
                        </h2>
                        {allPassed ? (
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        ) : (
                            <AlertTriangle className="w-8 h-8 text-orange-600" />
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${allPassed ? 'bg-green-600' : 'bg-orange-500'
                                }`}
                            style={{ width: `${(passedCount / totalCount) * 100}%` }}
                        />
                    </div>

                    {!allPassed && (
                        <div className="flex items-center gap-2 text-orange-800">
                            <AlertTriangle className="w-5 h-5" />
                            <span className="font-semibold">
                                Fix issues before shipping. ({totalCount - passedCount} remaining)
                            </span>
                        </div>
                    )}

                    {allPassed && (
                        <div className="flex items-center gap-2 text-green-800">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-semibold">
                                All tests passed! Ready to ship. 🚀
                            </span>
                        </div>
                    )}
                </div>

                {/* Test Items */}
                <div className="space-y-4 mb-8">
                    {TEST_ITEMS.map((item, index) => (
                        <div
                            key={item.id}
                            className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start gap-4">
                                {/* Checkbox */}
                                <button
                                    onClick={() => handleToggle(item.id)}
                                    className="flex-shrink-0 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                                >
                                    {checklist[item.id] ? (
                                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    ) : (
                                        <Circle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-semibold text-gray-500">
                                            Test {index + 1}
                                        </span>
                                    </div>

                                    <label
                                        onClick={() => handleToggle(item.id)}
                                        className={`text-lg font-medium cursor-pointer ${checklist[item.id]
                                            ? 'text-gray-500 line-through'
                                            : 'text-gray-900'
                                            }`}
                                    >
                                        {item.label}
                                    </label>

                                    {/* Hint (Collapsible) */}
                                    {item.hint && (
                                        <details className="mt-3">
                                            <summary className="text-sm text-purple-600 cursor-pointer hover:text-purple-700 font-medium flex items-center gap-1">
                                                <Info className="w-4 h-4" />
                                                How to test
                                            </summary>
                                            <p className="mt-2 text-sm text-gray-600 pl-5 py-2 bg-purple-50 rounded border-l-2 border-purple-300">
                                                {item.hint}
                                            </p>
                                        </details>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-4 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Reset Checklist
                    </button>

                    <button
                        onClick={handleContinue}
                        disabled={!allPassed}
                        className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all ${allPassed
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        Continue to Ship
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Help Text */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>This checklist ensures platform quality before deployment.</p>
                    <p>All tests must pass to unlock the ship process.</p>
                </div>
            </div>
        </div>
    );
}
