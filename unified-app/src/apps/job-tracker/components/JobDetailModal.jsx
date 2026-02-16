import React from 'react';
import { Button } from './Button';

export const JobDetailModal = ({ job, isOpen, onClose, onSave, isSaved }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
                <div className="p-6 border-b border-gray-100 flex justify-between items-start sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-[var(--text-primary)]">{job.title}</h2>
                        <div className="flex flex-wrap gap-2 mt-2 text-sm text-[var(--text-muted)]">
                            <span>{job.company}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-6 space-y-6 flex-1">
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">{job.salary}</span>
                        <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">{job.experience} Exp</span>
                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">{job.source}</span>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Job Description</h3>
                        <p className="text-[var(--text-muted)] whitespace-pre-line leading-relaxed">
                            {job.description}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Key Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 border border-gray-200 rounded-full text-sm text-gray-600 bg-gray-50">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
                    <Button
                        variant="secondary"
                        onClick={() => onSave(job.id)}
                        className={isSaved ? '!bg-gray-200 !text-gray-800' : ''}
                    >
                        {isSaved ? 'Saved' : 'Save Job'}
                    </Button>
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="block">
                        <Button>Apply Now</Button>
                    </a>
                </div>
            </div>
        </div>
    );
};

JobDetailModal.displayName = 'JobDetailModal';
