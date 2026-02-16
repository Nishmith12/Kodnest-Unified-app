import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, Copy, Check, AlertCircle, Rocket, ExternalLink } from 'lucide-react';
import {
    getSubmission,
    updateStep,
    updateArtifacts,
    markAsShipped,
    isAllStepsComplete,
    validateURL,
    getCompletedStepsCount
} from '../utils/submissionStorage';
import { isAllTestsPassed } from '../utils/testChecklistStorage';

const STEPS = [
    { id: 1, name: 'Foundation & Auth', description: 'React setup, routing, design system' },
    { id: 2, name: 'Backend Integration', description: 'API structure, mock data' },
    { id: 3, name: 'JD Analysis Engine', description: 'Skill extraction, scoring' },
    { id: 4, name: 'Results & Interactivity', description: 'Skill toggles, score updates' },
    { id: 5, name: 'Company Intelligence', description: 'Round mapping, company data' },
    { id: 6, name: 'Data Hardening', description: 'Validation, error handling, schema' },
    { id: 7, name: 'Quality Gates', description: 'Test checklist, ship lock' },
    { id: 8, name: 'Proof & Deployment', description: 'Final submission, deployment' }
];

export default function Proof() {
    const [submission, setSubmission] = useState(getSubmission());
    const [artifacts, setArtifacts] = useState(submission.artifacts);
    const [errors, setErrors] = useState({
        lovableLink: '',
        githubLink: '',
        deployedLink: ''
    });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        loadSubmission();
    }, []);

    const loadSubmission = () => {
        const data = getSubmission();
        setSubmission(data);
        setArtifacts(data.artifacts);
    };

    const handleStepToggle = (stepId) => {
        const newSubmission = updateStep(stepId, !submission.steps[stepId]);
        setSubmission(newSubmission);
    };

    const handleArtifactChange = (field, value) => {
        const newArtifacts = { ...artifacts, [field]: value };
        setArtifacts(newArtifacts);

        // Clear error when user types
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleArtifactBlur = (field) => {
        const value = artifacts[field];
        if (value && !validateURL(value)) {
            setErrors(prev => ({ ...prev, [field]: 'Invalid URL format' }));
        } else {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }

        // Save to localStorage
        const newSubmission = updateArtifacts(artifacts);
        setSubmission(newSubmission);
    };

    const isShipped = () => {
        // All 8 steps completed
        const allStepsComplete = isAllStepsComplete();

        // All 10 tests passed
        const allTestsPassed = isAllTestsPassed();

        // All 3 links provided and valid
        const allLinksValid =
            validateURL(artifacts.lovableLink) &&
            validateURL(artifacts.githubLink) &&
            validateURL(artifacts.deployedLink);

        return allStepsComplete && allTestsPassed && allLinksValid;
    };

    const copyFinalSubmission = () => {
        const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${artifacts.lovableLink}
GitHub Repository: ${artifacts.githubLink}
Live Deployment: ${artifacts.deployedLink}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------`;

        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);

            // Mark as shipped if conditions met
            if (isShipped()) {
                markAsShipped();
                loadSubmission();
            }
        });
    };

    const shipped = isShipped();
    const completedSteps = getCompletedStepsCount();
    const totalSteps = Object.keys(STEPS).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-gray-900 mb-3">
                        Placement Readiness Platform
                    </h1>
                    <p className="text-xl text-gray-600">Final Proof & Submission</p>
                </div>

                {/* Status Badge */}
                <div className="flex justify-center mb-8">
                    {shipped ? (
                        <div className="flex items-center gap-3 px-8 py-4 bg-green-100 border-4 border-green-400 rounded-full shadow-lg animate-pulse">
                            <Rocket className="w-8 h-8 text-green-700" />
                            <span className="text-2xl font-bold text-green-800">Shipped 🚀</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 px-8 py-4 bg-orange-100 border-4 border-orange-300 rounded-full shadow-lg">
                            <Clock className="w-8 h-8 text-orange-600" />
                            <span className="text-2xl font-bold text-orange-700">In Progress</span>
                        </div>
                    )}
                </div>

                {/* Step Completion Overview */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <CheckCircle2 className="w-7 h-7 text-purple-600" />
                        Step Completion Overview
                    </h2>

                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-lg font-semibold text-gray-700">
                                Progress: {completedSteps} / {totalSteps} Steps
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                                className={`h-full transition-all duration-500 ${completedSteps === totalSteps ? 'bg-green-600' : 'bg-purple-600'
                                    }`}
                                style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        {STEPS.map((step) => (
                            <div
                                key={step.id}
                                className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <button
                                    onClick={() => handleStepToggle(step.id)}
                                    className="flex-shrink-0 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                                >
                                    {submission.steps[step.id] ? (
                                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    ) : (
                                        <Circle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>

                                <div className="flex-1">
                                    <h3 className={`text-lg font-semibold ${submission.steps[step.id] ? 'text-gray-500 line-through' : 'text-gray-900'
                                        }`}>
                                        Step {step.id}: {step.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Artifact Submissions */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <ExternalLink className="w-7 h-7 text-blue-600" />
                        Artifact Submissions
                    </h2>
                    <p className="text-gray-600 mb-6">Required for Shipped status</p>

                    <div className="space-y-6">
                        {/* Lovable Project Link */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Lovable Project Link
                            </label>
                            <input
                                type="url"
                                value={artifacts.lovableLink}
                                onChange={(e) => handleArtifactChange('lovableLink', e.target.value)}
                                onBlur={() => handleArtifactBlur('lovableLink')}
                                placeholder="https://lovable.dev/projects/..."
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                            />
                            {errors.lovableLink ? (
                                <div className="flex items-center gap-2 mt-2 text-red-600">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-sm">{errors.lovableLink}</span>
                                </div>
                            ) : artifacts.lovableLink && validateURL(artifacts.lovableLink) ? (
                                <div className="flex items-center gap-2 mt-2 text-green-600">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="text-sm">Valid URL</span>
                                </div>
                            ) : null}
                        </div>

                        {/* GitHub Repository */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                GitHub Repository
                            </label>
                            <input
                                type="url"
                                value={artifacts.githubLink}
                                onChange={(e) => handleArtifactChange('githubLink', e.target.value)}
                                onBlur={() => handleArtifactBlur('githubLink')}
                                placeholder="https://github.com/username/repo"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                            />
                            {errors.githubLink ? (
                                <div className="flex items-center gap-2 mt-2 text-red-600">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-sm">{errors.githubLink}</span>
                                </div>
                            ) : artifacts.githubLink && validateURL(artifacts.githubLink) ? (
                                <div className="flex items-center gap-2 mt-2 text-green-600">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="text-sm">Valid URL</span>
                                </div>
                            ) : null}
                        </div>

                        {/* Deployed URL */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Deployed URL
                            </label>
                            <input
                                type="url"
                                value={artifacts.deployedLink}
                                onChange={(e) => handleArtifactChange('deployedLink', e.target.value)}
                                onBlur={() => handleArtifactBlur('deployedLink')}
                                placeholder="https://your-platform.vercel.app"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                            />
                            {errors.deployedLink ? (
                                <div className="flex items-center gap-2 mt-2 text-red-600">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-sm">{errors.deployedLink}</span>
                                </div>
                            ) : artifacts.deployedLink && validateURL(artifacts.deployedLink) ? (
                                <div className="flex items-center gap-2 mt-2 text-green-600">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="text-sm">Valid URL</span>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* Requirements Checklist */}
                <div className={`rounded-2xl shadow-xl p-8 mb-8 border-4 transition-all ${shipped
                        ? 'bg-green-50 border-green-400'
                        : 'bg-orange-50 border-orange-300'
                    }`}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Shipped Status Requirements
                    </h2>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            {isAllStepsComplete() ? (
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                            ) : (
                                <Circle className="w-6 h-6 text-gray-400" />
                            )}
                            <span className="text-lg">All 8 steps completed</span>
                        </div>

                        <div className="flex items-center gap-3">
                            {isAllTestsPassed() ? (
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                            ) : (
                                <Circle className="w-6 h-6 text-gray-400" />
                            )}
                            <span className="text-lg">All 10 checklist tests passed</span>
                        </div>

                        <div className="flex items-center gap-3">
                            {validateURL(artifacts.lovableLink) &&
                                validateURL(artifacts.githubLink) &&
                                validateURL(artifacts.deployedLink) ? (
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                            ) : (
                                <Circle className="w-6 h-6 text-gray-400" />
                            )}
                            <span className="text-lg">All 3 artifact links provided</span>
                        </div>
                    </div>
                </div>

                {/* Copy Final Submission */}
                <div className="text-center mb-8">
                    <button
                        onClick={copyFinalSubmission}
                        disabled={!shipped}
                        className={`flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg mx-auto ${shipped
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:shadow-xl'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {copied ? (
                            <>
                                <Check className="w-6 h-6" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-6 h-6" />
                                Copy Final Submission
                            </>
                        )}
                    </button>
                </div>

                {/* Completion Message */}
                {shipped && (
                    <div className="bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 rounded-2xl shadow-2xl p-12 text-center border-4 border-green-400">
                        <div className="text-6xl mb-6">🎉</div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            You built a real product.
                        </h2>
                        <p className="text-2xl text-gray-700 mb-3">
                            Not a tutorial. Not a clone.
                        </p>
                        <p className="text-2xl text-gray-700 mb-6">
                            A structured tool that solves a real problem.
                        </p>
                        <p className="text-3xl font-bold text-green-800">
                            This is your proof of work.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
