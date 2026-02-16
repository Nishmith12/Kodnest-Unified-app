import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, FileText, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
    const products = [
        {
            id: 'jobs',
            title: 'Job Tracker',
            description: 'Track your applications, manage status, and organize your job search journey.',
            icon: Briefcase,
            color: 'bg-indigo-500',
            path: '/jobs',
            gradient: 'from-indigo-500 to-purple-600'
        },
        {
            id: 'placement',
            title: 'Placement Prep',
            description: 'Comprehensive platform for assessments, practice, and skill building.',
            icon: GraduationCap,
            color: 'bg-emerald-500',
            path: '/placement/dashboard',
            gradient: 'from-emerald-500 to-teal-600'
        },
        {
            id: 'resume',
            title: 'AI Resume Builder',
            description: 'Build ATS-friendly, professional resumes with AI-powered assistance.',
            icon: FileText,
            color: 'bg-rose-500',
            path: '/resume',
            gradient: 'from-rose-500 to-red-600'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-900 text-white pb-32">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 opacity-90"></div>
                    <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                    <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
                        KodNest Integrated Platform
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                        One platform, three powerful tools. Manage your career journey from preparation to application.
                    </p>
                </div>
            </div>

            {/* Cards Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            to={product.path}
                            className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100"
                        >
                            <div className={`h-2 bg-gradient-to-r ${product.gradient}`}></div>
                            <div className="p-8">
                                <div className={`w-14 h-14 rounded-xl ${product.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <product.icon size={28} strokeWidth={2} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-3 font-heading">
                                    {product.title}
                                </h3>
                                <p className="text-slate-500 mb-8 leading-relaxed">
                                    {product.description}
                                </p>
                                <div className="flex items-center text-sm font-semibold tracking-wide uppercase text-slate-400 group-hover:text-indigo-600 transition-colors">
                                    Launch App <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <footer className="mt-auto py-8 text-center text-slate-500 text-sm border-t border-slate-200 bg-white">
                © 2026 KodNest. All rights reserved.
            </footer>
        </div>
    );
};

export default LandingPage;
