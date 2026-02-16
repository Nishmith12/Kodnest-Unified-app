import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2, ArrowLeft, Rocket, AlertCircle } from 'lucide-react';
import { isAllTestsPassed, getPassedCount, getTotalTestCount } from '../utils/testChecklistStorage';

export default function Ship() {
    const navigate = useNavigate();
    const [testsComplete, setTestsComplete] = useState(false);
    const [passedCount, setPassedCount] = useState(0);
    const totalCount = getTotalTestCount();

    useEffect(() => {
        checkTestStatus();
    }, []);

    const checkTestStatus = () => {
        const allPassed = isAllTestsPassed();
        const count = getPassedCount();
        setTestsComplete(allPassed);
        setPassedCount(count);
    };

    const goToChecklist = () => {
        navigate('/placement/07-test');
    };

    if (!testsComplete) {
        // LOCKED STATE
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4">
                <div className="max-w-2xl w-full">
                    <div className="bg-white rounded-2xl shadow-2xl p-12 text-center border-4 border-orange-300">
                        {/* Lock Icon */}
                        <div className="mb-6 flex justify-center">
                            <div className="bg-orange-100 p-6 rounded-full">
                                <Lock className="w-16 h-16 text-orange-600" />
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Ship Locked 🔒
                        </h1>

                        <p className="text-xl text-gray-700 mb-6">
                            Complete all tests in the checklist first.
                        </p>

                        {/* Progress */}
                        <div className="bg-orange-50 rounded-lg p-6 mb-8 border border-orange-200">
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <AlertCircle className="w-6 h-6 text-orange-600" />
                                <span className="text-lg font-semibold text-orange-900">
                                    Tests Passed: {passedCount} / {totalCount}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                <div
                                    className="h-full bg-orange-500 transition-all duration-500"
                                    style={{ width: `${(passedCount / totalCount) * 100}%` }}
                                />
                            </div>

                            <p className="mt-3 text-sm text-orange-800">
                                {totalCount - passedCount} test{totalCount - passedCount !== 1 ? 's' : ''} remaining
                            </p>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={goToChecklist}
                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl"
                        >
                            Go to Test Checklist
                        </button>

                        {/* Help Text */}
                        <p className="mt-8 text-sm text-gray-500">
                            All platform features must be verified before deployment.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // UNLOCKED STATE
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-2xl shadow-2xl p-12 text-center border-4 border-green-300">
                    {/* Success Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="bg-green-100 p-6 rounded-full animate-pulse">
                            <CheckCircle2 className="w-16 h-16 text-green-600" />
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Ready to Ship! 🚀
                    </h1>

                    <p className="text-xl text-gray-700 mb-6">
                        All tests passed. Platform is ready for deployment.
                    </p>

                    {/* Success Stats */}
                    <div className="bg-green-50 rounded-lg p-6 mb-8 border border-green-200">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <Rocket className="w-6 h-6 text-green-600" />
                            <span className="text-lg font-semibold text-green-900">
                                All {totalCount} Tests Passed ✓
                            </span>
                        </div>

                        {/* Full Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                            <div className="h-full bg-green-600 w-full transition-all duration-500" />
                        </div>

                        <p className="mt-3 text-sm text-green-800 font-medium">
                            Platform verified and ready for production
                        </p>
                    </div>

                    {/* Deployment Instructions */}
                    <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200 text-left">
                        <h3 className="font-bold text-gray-900 mb-3 text-lg">
                            Deployment Steps:
                        </h3>
                        <ol className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-blue-600">1.</span>
                                <span>Run <code className="bg-gray-100 px-2 py-1 rounded text-xs">npm run build</code> to create production bundle</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-blue-600">2.</span>
                                <span>Test the build locally with <code className="bg-gray-100 px-2 py-1 rounded text-xs">npm run preview</code></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-blue-600">3.</span>
                                <span>Deploy to Vercel/Netlify or your hosting platform</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold text-blue-600">4.</span>
                                <span>Verify production deployment with smoke tests</span>
                            </li>
                        </ol>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={goToChecklist}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Checklist
                        </button>

                        <button
                            onClick={() => navigate('/placement/dashboard')}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl"
                        >
                            Go to Dashboard
                        </button>
                    </div>

                    {/* Celebration */}
                    <p className="mt-8 text-2xl">
                        🎉 Congratulations! 🎉
                    </p>
                </div>
            </div>
        </div>
    );
}
