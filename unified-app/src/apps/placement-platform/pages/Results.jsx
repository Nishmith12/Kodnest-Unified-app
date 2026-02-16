import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAnalysisById, updateAnalysis } from '../utils/storageManager';
import { CheckCircle2, Calendar, Target, MessageSquare, ArrowLeft, Building2, Briefcase, Download, Copy, Check, AlertCircle, TrendingUp, Info } from 'lucide-react';

export default function Results() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [analysis, setAnalysis] = useState(null);
    const [skillConfidence, setSkillConfidence] = useState({});
    const [finalScore, setFinalScore] = useState(0);
    const [copiedItem, setCopiedItem] = useState(null);

    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            const data = getAnalysisById(id);
            setAnalysis(data);
            // Initialize skill confidence from saved data or default to empty
            setSkillConfidence(data.skillConfidenceMap || {});
            // Use final score if exists, otherwise use base score
            setFinalScore(data.finalScore || data.baseScore);
        } else {
            navigate('/placement/dashboard/practice');
        }
    }, [searchParams, navigate]);

    // Calculate final score based on skill confidence
    useEffect(() => {
        if (!analysis) return;

        const baseScore = analysis.baseScore;
        let adjustment = 0;

        Object.values(skillConfidence).forEach(confidence => {
            if (confidence === 'know') adjustment += 2;
            else if (confidence === 'practice') adjustment -= 2;
        });

        const newScore = Math.max(0, Math.min(100, baseScore + adjustment));
        setFinalScore(newScore);

        // Save to localStorage with updatedAt timestamp
        const id = searchParams.get('id');
        if (id) {
            updateAnalysis(id, {
                skillConfidenceMap: skillConfidence,
                finalScore: newScore
            });
        }
    }, [skillConfidence, analysis, searchParams]);

    const toggleSkillConfidence = (skill) => {
        setSkillConfidence(prev => {
            const current = prev[skill] || 'default';
            let next;
            if (current === 'default') next = 'know';
            else if (current === 'know') next = 'practice';
            else next = 'default';
            return { ...prev, [skill]: next };
        });
    };

    const getSkillStyle = (skill) => {
        const confidence = skillConfidence[skill] || 'default';
        if (confidence === 'know') {
            return 'bg-green-100 text-green-700 border-green-300';
        } else if (confidence === 'practice') {
            return 'bg-orange-100 text-orange-700 border-orange-300';
        }
        return 'bg-purple-100 text-primary border-purple-200';
    };

    const getSkillIcon = (skill) => {
        const confidence = skillConfidence[skill] || 'default';
        if (confidence === 'know') return '✓';
        if (confidence === 'practice') return '!';
        return '';
    };

    const copyToClipboard = async (text, itemName) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedItem(itemName);
            setTimeout(() => setCopiedItem(null), 2000);
        } catch (err) {
            alert('Failed to copy to clipboard');
        }
    };

    const format7DayPlan = () => {
        if (!analysis) return '';
        let text = '7-DAY PREPARATION PLAN\n';
        text += '======================\n\n';
        Object.entries(analysis.plan).forEach(([day, tasks]) => {
            text += `${day}\n`;
            tasks.forEach(task => {
                text += `→ ${task}\n`;
            });
            text += '\n';
        });
        return text;
    };

    const formatChecklist = () => {
        if (!analysis) return '';
        let text = 'ROUND-WISE PREPARATION CHECKLIST\n';
        text += '=================================\n\n';
        Object.entries(analysis.checklist).forEach(([round, items]) => {
            text += `${round}\n`;
            items.forEach(item => {
                text += `• ${item}\n`;
            });
            text += '\n';
        });
        return text;
    };

    const formatQuestions = () => {
        if (!analysis) return '';
        let text = '10 LIKELY INTERVIEW QUESTIONS\n';
        text += '==============================\n\n';
        analysis.questions.forEach((q, idx) => {
            text += `${idx + 1}. ${q}\n`;
        });
        return text;
    };

    const downloadAsTxt = () => {
        if (!analysis) return;

        const company = analysis.company !== 'Not specified' ? analysis.company : 'Company';
        const date = new Date().toISOString().split('T')[0];

        let content = `JOB DESCRIPTION ANALYSIS\n`;
        content += `========================\n\n`;
        content += `Company: ${analysis.company}\n`;
        content += `Role: ${analysis.role}\n`;
        content += `Date: ${new Date(analysis.createdAt).toLocaleDateString()}\n`;
        content += `Readiness Score: ${finalScore}/100\n\n`;

        content += `EXTRACTED SKILLS\n`;
        content += `================\n`;
        Object.entries(analysis.extractedSkills).forEach(([category, skills]) => {
            content += `\n${category}:\n`;
            skills.forEach(skill => {
                const conf = skillConfidence[skill] || 'default';
                const status = conf === 'know' ? '✓ Know' : conf === 'practice' ? '! Practice' : '- Default';
                content += `  ${status}: ${skill}\n`;
            });
        });
        content += '\n\n';

        content += formatChecklist();
        content += '\n';
        content += format7DayPlan();
        content += '\n';
        content += formatQuestions();

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `JD_Analysis_${company}_${date}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const getWeakSkills = () => {
        const weak = [];
        Object.entries(skillConfidence).forEach(([skill, confidence]) => {
            if (confidence === 'practice') weak.push(skill);
        });
        return weak.slice(0, 3);
    };

    if (!analysis) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    const weakSkills = getWeakSkills();

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <button
                        onClick={() => navigate('/placement/dashboard/practice')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Analyzer
                    </button>
                    <h2 className="text-3xl font-bold text-gray-900">Analysis Results</h2>
                </div>
                <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center gap-2 justify-end">
                        {analysis.company !== 'Not specified' && (
                            <>
                                <Building2 className="w-4 h-4" />
                                <span className="font-medium">{analysis.company}</span>
                            </>
                        )}
                    </div>
                    {analysis.role !== 'Not specified' && (
                        <div className="flex items-center gap-2 justify-end mt-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{analysis.role}</span>
                        </div>
                    )}
                    <div className="mt-1">{new Date(analysis.createdAt).toLocaleDateString()}</div>
                </div>
            </div>

            {/* Export Buttons */}
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={() => copyToClipboard(format7DayPlan(), 'plan')}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                    {copiedItem === 'plan' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    Copy 7-Day Plan
                </button>
                <button
                    onClick={() => copyToClipboard(formatChecklist(), 'checklist')}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                    {copiedItem === 'checklist' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    Copy Checklist
                </button>
                <button
                    onClick={() => copyToClipboard(formatQuestions(), 'questions')}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                    {copiedItem === 'questions' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    Copy Questions
                </button>
                <button
                    onClick={downloadAsTxt}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                    <Download className="w-4 h-4" />
                    Download TXT
                </button>
            </div>

            {/* Readiness Score */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-lg shadow-md border border-purple-100">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Readiness Score</h3>
                        <p className="text-gray-600">Adjusts based on your skill confidence</p>
                        <p className="text-sm text-gray-500 mt-1">
                            Base: {analysis.baseScore} |
                            <span className="text-green-600"> +2 per "know"</span> |
                            <span className="text-orange-600"> -2 per "practice"</span>
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="text-6xl font-bold text-primary">{finalScore}</div>
                        <div className="text-gray-500 text-sm mt-1">/ 100</div>
                    </div>
                </div>
            </div>

            {/* Company Intel Card */}
            {analysis.companyIntel && analysis.companyIntel.name !== 'Not specified' && (
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-md border border-blue-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        Company Intel
                    </h3>
                    <div className="space-y-3">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{analysis.companyIntel.name}</div>
                            <div className="text-sm text-gray-600 mt-1">
                                {analysis.companyIntel.industry}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-gray-700">Size:</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${analysis.companyIntel.size === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                                analysis.companyIntel.size === 'Mid-size' ? 'bg-blue-100 text-blue-700' :
                                    'bg-green-100 text-green-700'
                                }`}>
                                {analysis.companyIntel.size} ({analysis.companyIntel.sizeCategory})
                            </span>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="font-semibold text-gray-900 mb-2">Typical Hiring Focus:</div>
                            <p className="text-sm text-gray-700 mb-2">{analysis.companyIntel.hiringFocus}</p>
                            <div className="text-xs text-gray-600">
                                <span className="font-medium">Key priorities:</span>
                                <ul className="list-disc list-inside mt-1 space-y-0.5">
                                    {analysis.companyIntel.priorities.map((priority, idx) => (
                                        <li key={idx}>{priority}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded">
                            <Info className="w-4 h-4" />
                            <span>Demo Mode: Company intel generated heuristically</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Interview Rounds Timeline */}
            {analysis.roundMapping && analysis.roundMapping.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Interview Rounds
                    </h3>
                    <div className="space-y-4">
                        {analysis.roundMapping.map((round, idx) => (
                            <div key={idx} className="relative pl-8 pb-6 border-l-2 border-purple-200 last:border-l-0 last:pb-0">
                                {/* Round Number Badge */}
                                <div className="absolute -left-5 top-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-md">
                                    {round.number}
                                </div>
                                {/* Round Content */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="text-lg font-semibold text-gray-900">{round.title}</h4>
                                        {round.duration && (
                                            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                                                {round.duration}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-700 mb-2">{round.description}</p>
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {round.topics.map((topic, topicIdx) => (
                                            <span key={topicIdx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-start gap-2 bg-yellow-50 p-2 rounded border-l-2 border-yellow-400">
                                        <span className="text-sm">💡</span>
                                        <div className="text-xs text-gray-700">
                                            <span className="font-semibold">Why this matters:</span> {round.whyMatters}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Extracted Skills with Toggles */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Key Skills Extracted
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                    Click skills to rate your confidence: <span className="text-gray-400">Default</span>{' '}
                    → <span className="text-green-600">✓ I know this</span>{' '}
                    → <span className="text-orange-600">! Need practice</span>
                </p>
                <div className="space-y-4">
                    {Object.entries(analysis.extractedSkills).map(([category, skills]) => (
                        <div key={category}>
                            <div className="text-sm font-medium text-gray-600 mb-2">{category}</div>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => toggleSkillConfidence(skill)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium border-2 transition-all cursor-pointer hover:scale-105 ${getSkillStyle(skill)}`}
                                    >
                                        {skill} {getSkillIcon(skill)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Next - Weak Skills Alert */}
            {weakSkills.length > 0 && (
                <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-orange-900 mb-2">🎯 Focus These Skills</h3>
                            <ul className="space-y-1 mb-3">
                                {weakSkills.map((skill, idx) => (
                                    <li key={idx} className="text-orange-800">• {skill} (need practice)</li>
                                ))}
                            </ul>
                            <p className="text-orange-900 font-medium">👉 Start Day 1 plan now</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Round-wise Checklist */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Round-wise Preparation Checklist
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(analysis.checklist).map(([round, items]) => (
                        <div key={round} className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-3">{round}</h4>
                            <ul className="space-y-2">
                                {items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                        <span className="text-primary mt-0.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* 7-Day Plan */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    7-Day Preparation Plan
                </h3>
                <div className="space-y-4">
                    {Object.entries(analysis.plan).map(([day, tasks]) => (
                        <div key={day} className="border-l-4 border-primary pl-4 py-2">
                            <h4 className="font-semibold text-gray-900 mb-2">{day}</h4>
                            <ul className="space-y-1">
                                {tasks.map((task, idx) => (
                                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                        <span className="text-primary">→</span>
                                        <span>{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interview Questions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    10 Likely Interview Questions
                </h3>
                <div className="space-y-3">
                    {analysis.questions.map((question, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                {idx + 1}
                            </div>
                            <p className="text-gray-800">{question}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={() => navigate('/placement/dashboard/practice')}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                    Try Another
                </button>
                <Button
                    onClick={() => navigate('/placement/dashboard/practice/history')}
                    className="flex-1 bg-primary hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                    View History
                </Button>
            </div>
        </div>
    );
}
