import React from 'react';

export const FilterBar = ({
    searchQuery,
    onSearchChange,
    sortOption,
    onSortChange,
    statusFilter,
    onStatusFilterChange
}) => {
    return (
        <div className="glass-panel p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in relative z-20">
            {/* Search */}
            <div className="relative w-full md:w-96 group">
                <input
                    type="text"
                    placeholder="Search jobs by title, company..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:bg-white transition-all text-sm placeholder:text-slate-400 text-slate-700"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5 transition-colors group-focus-within:text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>

            {/* Filters & Sort */}
            <div className="flex w-full md:w-auto gap-3">

                {/* Status Filter */}
                <div className="relative flex-1 md:flex-none">
                    <select
                        className="w-full md:w-44 appearance-none bg-white/50 border border-slate-200/60 text-slate-700 py-2.5 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] cursor-pointer hover:bg-white transition-all text-sm font-medium"
                        value={statusFilter}
                        onChange={(e) => onStatusFilterChange(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Not Applied">Not Applied</option>
                        <option value="Applied">Applied</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Selected">Selected</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                    </div>
                </div>

                {/* Sort */}
                <div className="relative flex-1 md:flex-none">
                    <select
                        className="w-full md:w-auto appearance-none bg-white/50 border border-slate-200/60 text-slate-700 py-2.5 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] cursor-pointer hover:bg-white transition-all text-sm font-medium"
                        value={sortOption}
                        onChange={(e) => onSortChange(e.target.value)}
                    >
                        <option value="Latest">Sort: Latest</option>
                        <option value="Match Score">Sort: Match Score</option>
                        <option value="Salary">Sort: Salary</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

FilterBar.displayName = 'FilterBar';
