import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory, deleteAnalysis, hasCorruptedEntries } from '../utils/storageManager';
import { Clock, Building2, Briefcase, Trash2, Eye, TrendingUp } from 'lucide-react';

export default function History() {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = () => {
        const data = getHistory();
        setHistory(data);

        // Check for corrupted entries
        if (hasCorruptedEntries()) {
            setLoadError(true);
        }
    };

    const handleView = (id) => {
        navigate(`/dashboard/practice/results?id=${id}`);
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        if (confirm('Delete this analysis?')) {
            deleteAnalysis(id);
            loadHistory();
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600 bg-green-100';
        if (score >= 60) return 'text-blue-600 bg-blue-100';
        if (score >= 40) return 'text-yellow-600 bg-yellow-100';
        return 'text-orange-600 bg-orange-100';
    };

    if (history.length === 0) {
        return (
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Analysis History</h2>
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <div className="text-gray-400 mb-4">
                        <Clock className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No analyses yet</h3>
                    <p className="text-gray-500 mb-6">Start by analyzing your first job description</p>
                    <button
                        onClick={() => navigate('/dashboard/practice')}
                        className="bg-primary hover:bg-purple-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
                    >
                        Analyze JD
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">Analysis History</h2>
                <button
                    onClick={() => navigate('/dashboard/practice')}
                    className="bg-primary hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                    New Analysis
                </button>
            </div>

            <div className="space-y-4">
                {history.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => handleView(item.id)}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    {item.company !== 'Not specified' && (
                                        <div className="flex items-center gap-1 text-gray-900">
                                            <Building2 className="w-4 h-4" />
                                            <span className="font-semibold">{item.company}</span>
                                        </div>
                                    )}
                                    {item.role !== 'Not specified' && (
                                        <div className="flex items-center gap-1 text-gray-600">
                                            <Briefcase className="w-4 h-4" />
                                            <span>{item.role}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {Object.entries(item.extractedSkills).slice(0, 3).map(([category, skills]) => (
                                        <div key={category} className="text-xs">
                                            <span className="text-gray-500">{category}:</span>{' '}
                                            <span className="text-gray-700 font-medium">
                                                {skills.slice(0, 3).join(', ')}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <TrendingUp className="w-4 h-4" />
                                        {item.jdText.length} chars
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className={`px-4 py-2 rounded-lg font-bold text-lg ${getScoreColor(item.readinessScore)}`}>
                                    {item.readinessScore}
                                </div>
                                <button
                                    onClick={(e) => handleView(item.id)}
                                    className="p-2 text-primary hover:bg-purple-50 rounded-lg transition-colors"
                                    title="View"
                                >
                                    <Eye className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={(e) => handleDelete(item.id, e)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
