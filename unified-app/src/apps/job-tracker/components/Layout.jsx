import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useJobs } from '../context/JobContext';

export const Layout = ({
    children,
    title,
}) => {
    const { allTestsPassed } = useJobs();
    const location = useLocation();

    const navigation = [
        {
            name: 'Dashboard', path: '/jobs/dashboard', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            )
        },
        {
            name: 'Applications', path: '/jobs/dashboard', icon: ( // Alias to Dashboard for now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            )
        },
        {
            name: 'Analytics', path: '/jobs/dashboard', icon: ( // Alias to Dashboard (Stats are there)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            )
        },
        {
            name: 'Settings', path: '/jobs/settings', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826 3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            )
        },
    ];

    const secondaryNav = [
        {
            name: 'Proof', path: '/jobs/proof', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )
        },
        {
            name: 'Test', path: '/jobs/07-test', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            )
        },
        {
            name: 'Ship', path: '/jobs/08-ship', locked: !allTestsPassed, icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            )
        },
    ];

    const getPageTitle = () => {
        if (title) return title;
        const currentPath = location.pathname;
        const route = [...navigation, ...secondaryNav].find(n => n.path === currentPath);
        return route ? route.name : 'Job Tracker';
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">

            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                            K
                        </div>
                        <span className="font-bold text-lg text-slate-900 tracking-tight">KodWest</span>
                    </div>
                </div>

                {/* Main Nav */}
                <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
                    <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main</p>
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${isActive
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                                        {item.icon}
                                    </span>
                                    {item.name}
                                </>
                            )}
                        </NavLink>
                    ))}

                    <div className="my-6 border-t border-slate-100"></div>
                    <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Dev Tools</p>
                    {secondaryNav.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={(e) => item.locked && e.preventDefault()}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${isActive
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : item.locked
                                        ? 'opacity-50 cursor-not-allowed text-slate-400'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                                        {item.icon}
                                    </span>
                                    <div className="flex justify-between w-full">
                                        {item.name}
                                        {item.locked && (
                                            <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                        )}
                                    </div>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* User */}
                <div className="p-4 border-t border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-200 border border-white shadow-sm overflow-hidden">
                            {/* Placeholder Avatar */}
                            <svg className="w-full h-full text-slate-400 p-1" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">Demo User</p>
                            <p className="text-xs text-slate-500 truncate">user@kodwest.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Desktop Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
                    <h2 className="text-lg font-semibold text-slate-800">{getPageTitle()}</h2>
                    <div className="flex gap-4">
                        {/* Notification Bell */}
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        </button>
                    </div>
                </header>

                {/* Content Scroll Area */}
                <div className="flex-1 overflow-auto p-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

Layout.displayName = 'Layout';
