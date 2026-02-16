import React from 'react';
import type { Job, JobStatus } from '../types';
import { useJobs } from '../context/JobContext';

interface JobCardProps {
    job: Job;
    onView?: (job: Job) => void;
    onClick?: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onView, onClick }) => {
    const { saveJob, removeJob, isSaved, updateJobStatus } = useJobs();
    const saved = isSaved(job.id);

    const getStatusStyles = (status?: JobStatus) => {
        switch (status) {
            case 'Applied': return 'bg-blue-50 text-blue-700 border-blue-100 ring-blue-500/10';
            case 'Rejected': return 'bg-red-50 text-red-700 border-red-100 ring-red-500/10';
            case 'Selected': return 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-500/10';
            case 'Interview': return 'bg-violet-50 text-violet-700 border-violet-100 ring-violet-500/10';
            default: return 'bg-slate-50 text-slate-600 border-slate-100 ring-slate-500/10';
        }
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.stopPropagation();
        const newStatus = e.target.value as JobStatus;
        updateJobStatus(job.id, newStatus);
    };

    const handleSave = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (saved) {
            removeJob(job.id);
        } else {
            saveJob(job);
        }
    };

    const handleCardClick = () => {
        if (onClick) onClick();
        if (onView) onView(job);
    };

    // Generate a consistent gradient based on company name length
    const getCompanyGradient = (name: string) => {
        const gradients = [
            'from-blue-500 to-indigo-600',
            'from-emerald-400 to-teal-600',
            'from-orange-400 to-pink-600',
            'from-violet-400 to-purple-600',
            'from-cyan-400 to-blue-600'
        ];
        const index = name.length % gradients.length;
        return gradients[index];
    };

    return (
        <div
            onClick={handleCardClick}
            className="group relative bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
        >
            {/* Top Gradient Line */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getCompanyGradient(job.company)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="flex flex-col h-full gap-4">
                {/* Header: Logo & Save */}
                <div className="flex justify-between items-start gap-3">
                    <div className="flex gap-4 min-w-0">
                        {/* Logo */}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCompanyGradient(job.company)} flex items-center justify-center text-white text-lg font-bold shadow-sm shrink-0`}>
                            {job.company.charAt(0)}
                        </div>
                        <div className="min-w-0 pt-0.5">
                            <h3 className="font-bold text-slate-800 truncate leading-tight mb-1 group-hover:text-[var(--accent-primary)] transition-colors">{job.title}</h3>
                            <p className="text-sm font-medium text-slate-500 truncate">{job.company}</p>
                        </div>
                    </div>
                </div>

                {/* Tech Stack (Skills) */}
                <div className="flex flex-wrap gap-2 mt-1">
                    {job.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 border border-slate-100 group-hover:border-slate-200 transition-colors">
                            {skill}
                        </span>
                    ))}
                    {job.skills.length > 3 && (
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-50 text-slate-400 border border-slate-100">
                            +{job.skills.length - 3}
                        </span>
                    )}
                </div>

                {/* Footer: Meta & Status */}
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                    <div className="text-xs font-medium text-slate-400 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {job.postedDaysAgo}d ago
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            className={`p-1.5 rounded-full hover:bg-slate-50 transition-colors ${saved ? 'text-pink-500' : 'text-slate-300 hover:text-slate-500'}`}
                        >
                            <svg className={`w-5 h-5 ${saved ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>

                        {/* Status Dropdown */}
                        <div className="relative group/status" onClick={(e) => e.stopPropagation()}>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold border ring-1 flex items-center gap-1.5 transition-all ${getStatusStyles(job.status)}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                                {job.status || 'Applied'}
                            </div>
                            <select
                                value={job.status || 'Not Applied'}
                                onChange={handleStatusChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            >
                                <option value="Not Applied">Not Applied</option>
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Selected">Selected</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
