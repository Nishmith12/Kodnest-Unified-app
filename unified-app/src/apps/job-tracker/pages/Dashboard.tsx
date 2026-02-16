import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useJobs } from '../context/JobContext';
import { JobCard } from '../components/JobCard';
import { FilterBar } from '../components/FilterBar';
import { JobDetailModal } from '../components/JobDetailModal';
import { StatsBar } from '../components/StatsBar';
import type { Job } from '../types';

const Dashboard: React.FC = () => {
    const { jobs, isLoading, loadJobs, savedJobs, saveJob } = useJobs();
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('match');
    const [statusFilter, setStatusFilter] = useState('All');

    const handleViewJob = (job: Job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedJob(null), 300);
    };

    // Filter Logic
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus = statusFilter === 'All' ? true : (job.status || 'Not Applied') === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const sortedJobs = [...filteredJobs].sort((a, b) => {
        if (sortOption === 'salary') return b.salary.localeCompare(a.salary);
        if (sortOption === 'Match Score' || sortOption === 'match') return (b.matchScore || 0) - (a.matchScore || 0);
        return a.postedDaysAgo - b.postedDaysAgo;
    });

    const isJobSaved = (id: string) => savedJobs.some(j => j.id === id);

    // Stats Calculation
    const stats = {
        totalApplied: jobs.filter(j => j.status === 'Applied' || j.status === 'Interview' || j.status === 'Selected').length,
        interviews: jobs.filter(j => j.status === 'Interview' || j.status === 'Selected').length,
        offers: jobs.filter(j => j.status === 'Selected').length,
        responseRate: jobs.filter(j => j.status === 'Applied').length > 0
            ? Math.round((jobs.filter(j => j.status !== 'Applied' && j.status !== 'Not Applied').length / jobs.filter(j => j.status === 'Applied').length) * 100)
            : 0
    };

    return (
        <div className="flex flex-col gap-8 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Hero Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-6 border-b border-slate-200/60">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                    <p className="text-slate-500 text-lg">
                        Track your applications and land your dream job.
                    </p>
                </div>
                {jobs.length > 0 && (
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={loadJobs}
                        disabled={isLoading}
                        className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-sm"
                    >
                        {isLoading ? 'Syncing...' : 'Sync Jobs'}
                    </Button>
                )}
            </div>

            {/* Stats Bar */}
            {jobs.length > 0 && (
                <div className="glass-panel rounded-2xl p-1">
                    <StatsBar stats={stats} />
                </div>
            )}

            {/* Content */}
            <div className="space-y-6">
                {jobs.length > 0 && (
                    <FilterBar
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        sortOption={sortOption}
                        onSortChange={setSortOption}
                        statusFilter={statusFilter}
                        onStatusFilterChange={setStatusFilter}
                    />
                )}

                {jobs.length === 0 ? (
                    <div className="text-center py-32 glass-panel rounded-3xl border border-dashed border-slate-300 bg-white/50 backdrop-blur-sm">
                        <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 shadow-inset">
                            <svg className="w-8 h-8 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No jobs tracked yet</h3>
                        <p className="text-slate-500 text-base mb-8 max-w-md mx-auto">Get started by loading a sample dataset tailored to your profile and start tracking your journey.</p>
                        <Button onClick={loadJobs} disabled={isLoading} className="shadow-lg shadow-indigo-500/20">
                            {isLoading ? 'Loading...' : 'Load Jobs'}
                        </Button>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-20 bg-white/40 rounded-3xl border border-slate-200">
                        <p className="text-slate-500 text-lg">No jobs match your filters.</p>
                        <Button variant="text" onClick={() => { setSearchQuery(''); setStatusFilter('All'); }} className="mt-4 text-[var(--accent-primary)]">
                            Clear Filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedJobs.map(job => (
                            <JobCard key={job.id} job={job} onView={handleViewJob} />
                        ))}
                    </div>
                )}
            </div>

            {selectedJob && (
                <JobDetailModal
                    job={selectedJob}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={() => saveJob(selectedJob)}
                    isSaved={isJobSaved(selectedJob.id)}
                />
            )}
        </div>
    );
};

export default Dashboard;
