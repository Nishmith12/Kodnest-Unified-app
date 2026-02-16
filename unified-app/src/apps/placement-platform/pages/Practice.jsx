import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Briefcase, FileText, Building2 } from 'lucide-react';
import { extractSkills, calculateReadinessScore, generateChecklist, generate7DayPlan, generateQuestions } from '../utils/analysisEngine';
import { saveAnalysis } from '../utils/storageManager';
import { generateCompanyIntel } from '../utils/companyIntel';
import { generateRoundMapping } from '../utils/roundMapping';

export default function Practice() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        jdText: ''
    });
    const [validationError, setValidationError] = useState('');
    const [validationWarning, setValidationWarning] = useState('');

    const handleAnalyze = () => {
        // Clear previous validation messages
        setValidationError('');
        setValidationWarning('');

        // Required validation
        if (!formData.jdText.trim()) {
            setValidationError('Please enter a job description to analyze.');
            return;
        }

        // Length warning (soft - doesn't block)
        if (formData.jdText.trim().length < 200) {
            setValidationWarning('This JD is too short to analyze deeply. Paste full JD for better output.');
            // Continue with analysis anyway
        }

        // Extract skills
        const extractedSkills = extractSkills(formData.jdText);

        // Generate all outputs
        const readinessScore = calculateReadinessScore({
            skills: extractedSkills,
            company: formData.company,
            role: formData.role,
            jdText: formData.jdText
        });

        const checklist = generateChecklist(extractedSkills);
        const plan = generate7DayPlan(extractedSkills);
        const questions = generateQuestions(extractedSkills);

        // Generate company intel and round mapping
        const companyIntel = generateCompanyIntel({
            company: formData.company,
            jdText: formData.jdText
        });

        const roundMapping = generateRoundMapping({
            companySize: companyIntel.size,
            skills: extractedSkills
        });

        // Save to history
        const id = saveAnalysis({
            company: formData.company || "",
            role: formData.role || "",
            jdText: formData.jdText,
            extractedSkills,
            checklist,
            plan,
            questions,
            baseScore: readinessScore,
            finalScore: readinessScore,  // Initially same as base
            skillConfidenceMap: {},      // Empty initially
            companyIntel,
            roundMapping
        });

        // Navigate to results with the ID
        navigate(`/dashboard/practice/results?id=${id}`);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">JD Analysis</h2>
                <p className="text-gray-600">Paste a job description to get personalized preparation insights</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                {/* Company Name */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Building2 className="w-4 h-4" />
                        Company Name (Optional)
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., Google, Amazon, Microsoft"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                </div>

                {/* Role */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Briefcase className="w-4 h-4" />
                        Role (Optional)
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., Software Engineer, Frontend Developer"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                </div>

                {/* JD Text */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FileText className="w-4 h-4" />
                        Job Description *
                    </label>
                    <textarea
                        placeholder="Paste the complete job description here..."
                        value={formData.jdText}
                        onChange={(e) => setFormData({ ...formData, jdText: e.target.value })}
                        rows={12}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    />
                    <div className="mt-2 text-sm text-gray-500">
                        {formData.jdText.length} characters
                        {formData.jdText.length > 800 && <span className="text-green-600 ml-2">✓ Detailed JD bonus</span>}
                    </div>
                </div>

                {/* Validation Messages */}
                {validationError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                        <span className="font-semibold">⚠️</span>
                        <span>{validationError}</span>
                    </div>
                )}

                {validationWarning && (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg flex items-center gap-2">
                        <span className="font-semibold">ℹ️</span>
                        <span>{validationWarning}</span>
                    </div>
                )}

                {/* Analyze Button */}
                <button
                    onClick={handleAnalyze}
                    disabled={!formData.jdText.trim()}
                    className="w-full bg-primary hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                    Analyze JD
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            {/* History Link */}
            <div className="text-center">
                <button
                    onClick={() => navigate('/placement/dashboard/practice/history')}
                    className="text-primary hover:text-purple-700 font-medium"
                >
                    View Analysis History
                </button>
            </div>
        </div>
    );
}
