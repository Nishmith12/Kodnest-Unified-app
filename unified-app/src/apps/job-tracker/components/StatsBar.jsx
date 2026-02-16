import React from 'react';

export const StatsBar = ({ stats }) => {
    const items = [
        {
            label: 'Total Applied',
            value: stats.totalApplied,
            icon: (
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            ),
            bg: 'bg-blue-50/80',
            text: 'text-blue-900'
        },
        {
            label: 'Interviews',
            value: stats.interviews,
            icon: (
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            ),
            bg: 'bg-purple-50/80',
            text: 'text-purple-900'
        },
        {
            label: 'Offers',
            value: stats.offers,
            icon: (
                <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ),
            bg: 'bg-pink-50/80',
            text: 'text-pink-900'
        },
        {
            label: 'Response Rate',
            value: `${stats.responseRate}%`,
            icon: (
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            ),
            bg: 'bg-emerald-50/80',
            text: 'text-emerald-900'
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {items.map((item) => (
                <div key={item.label} className="p-4 flex items-center gap-4 hover:bg-white/40 transition-colors first:rounded-l-2xl last:rounded-r-2xl">
                    <div className={`p-3 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                        {item.icon}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-0.5">{item.label}</p>
                        <p className={`text-2xl font-bold ${item.text} tracking-tight`}>{item.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

StatsBar.displayName = 'StatsBar';
