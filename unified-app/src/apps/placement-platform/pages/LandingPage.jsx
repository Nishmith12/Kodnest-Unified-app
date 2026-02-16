import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Video, BarChart3 } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-20">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Ace Your Placement
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Practice, assess, and prepare for your dream job
                    </p>
                    <button
                        onClick={() => navigate('/placement/dashboard')}
                        className="bg-primary hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                    >
                        Get Started
                    </button>
                </div>
            </div>

            {/* Features Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Practice Problems Card */}
                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <Code className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Practice Problems</h3>
                        <p className="text-gray-600">
                            Solve coding challenges to sharpen your skills
                        </p>
                    </div>

                    {/* Mock Interviews Card */}
                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <Video className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Mock Interviews</h3>
                        <p className="text-gray-600">
                            Practice interviews with real-time feedback
                        </p>
                    </div>

                    {/* Track Progress Card */}
                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <BarChart3 className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                        <p className="text-gray-600">
                            Monitor your improvement with detailed analytics
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-20">
                <div className="container mx-auto px-4 text-center text-gray-600">
                    © 2026 Placement Readiness Platform. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
