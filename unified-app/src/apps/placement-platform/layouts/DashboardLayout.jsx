import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Code, FileText, BookOpen, User } from 'lucide-react';

export default function DashboardLayout() {
    const navItems = [
        { path: '/placement/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/placement/dashboard/practice', icon: Code, label: 'Practice' },
        { path: '/placement/dashboard/assessments', icon: FileText, label: 'Assessments' },
        { path: '/placement/dashboard/resources', icon: BookOpen, label: 'Resources' },
        { path: '/placement/dashboard/profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-primary">Placement Prep</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/dashboard'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-purple-50 text-primary font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Placement Prep</h1>
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                        U
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
