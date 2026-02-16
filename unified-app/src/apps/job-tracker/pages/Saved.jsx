import React, { useState } from 'react';
import { Card } from '../components/Card';
import { useJobs } from '../context/JobContext';
import { JobCard } from '../components/JobCard';
import { JobDetailModal } from '../components/JobDetailModal';

const Saved = () => {
    const { savedJobs, saveJob } = useJobs();
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewJob = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedJob(null), 300);
    };

    return (
        <div className="flex flex-col gap-6 animate-fade-in relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-[var(--text-primary)]">Saved Jobs</h1>
                    <p className="text-[var(--text-muted)] mt-1">
                        {savedJobs.length > 0
                            ? `You have saved ${savedJobs.length} opportunities.`
                            : 'Your bookmarked roles.'}
                    </p>
                </div>
            </div>

            {savedJobs.length === 0 ? (
                <Card className="py-20 text-center border-dashed bg-gray-50/50">
                    <div className="max-w-md mx-auto space-y-6">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)]">No saved jobs</h3>
                        <p className="text-[var(--text-muted)] leading-relaxed">
                            Jobs you save for later will appear here. <br />
                            Go to the Dashboard to explore opportunities.
                        </p>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedJobs.map(job => (
                        <JobCard key={job.id} job={job} onView={handleViewJob} />
                    ))}
                </div>
            )}

            {selectedJob && (
                <JobDetailModal
                    job={selectedJob}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={() => saveJob(selectedJob)}
                    isSaved={true}
                />
            )}
        </div>
    );
};

export default Saved;
