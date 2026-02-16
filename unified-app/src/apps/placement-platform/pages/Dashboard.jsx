import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Clock, TrendingUp } from 'lucide-react';

// Skill data for radar chart
const skillData = [
    { skill: 'DSA', value: 75 },
    { skill: 'System Design', value: 60 },
    { skill: 'Communication', value: 80 },
    { skill: 'Resume', value: 85 },
    { skill: 'Aptitude', value: 70 },
];

// Weekly activity data
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const activeDays = [true, true, false, true, true, false, false];

// Upcoming assessments
const assessments = [
    { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM' },
    { title: 'System Design Review', time: 'Wed, 2:00 PM' },
    { title: 'HR Interview Prep', time: 'Friday, 11:00 AM' },
];

export default function Dashboard() {
    // Clamp readiness score between 0 and 100
    const rawScore = 72; // Could come from props/state
    const readinessScore = Math.min(100, Math.max(0, rawScore));
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (readinessScore / 100) * circumference;

    // Practice progress - can be null if all complete
    const currentTopic = 'Dynamic Programming';
    const topicProgress = { current: 3, total: 10 };
    const allTopicsComplete = !currentTopic || topicProgress.current >= topicProgress.total;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Overall Readiness */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Overall Readiness</h3>
                    <div className="flex flex-col items-center">
                        <div className="relative w-48 h-48">
                            <svg className="transform -rotate-90" width="192" height="192">
                                {/* Background circle */}
                                <circle
                                    cx="96"
                                    cy="96"
                                    r={radius}
                                    stroke="#e5e7eb"
                                    strokeWidth="12"
                                    fill="none"
                                />
                                {/* Progress circle */}
                                <circle
                                    cx="96"
                                    cy="96"
                                    r={radius}
                                    stroke="hsl(245, 58%, 51%)"
                                    strokeWidth="12"
                                    fill="none"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={offset}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-gray-900">{readinessScore}</span>
                                <span className="text-sm text-gray-500">/100</span>
                            </div>
                        </div>
                        <p className="mt-4 text-gray-600 font-medium">Readiness Score</p>
                    </div>
                </div>

                {/* Skill Breakdown */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Skill Breakdown</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={skillData}>
                            <PolarGrid stroke="#e5e7eb" />
                            <PolarAngleAxis dataKey="skill" tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                            <Radar
                                name="Skills"
                                dataKey="value"
                                stroke="hsl(245, 58%, 51%)"
                                fill="hsl(245, 58%, 51%)"
                                fillOpacity={0.3}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* Continue Practice */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Continue Practice</h3>
                    {allTopicsComplete ? (
                        <div className="space-y-4 text-center py-4">
                            <div className="text-4xl">🎉</div>
                            <p className="text-xl font-semibold text-gray-900">All Topics Complete!</p>
                            <p className="text-sm text-gray-600">Great job! Consider reviewing previous topics or exploring advanced concepts.</p>
                            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
                                Review Topics
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Last Topic</p>
                                <p className="text-xl font-semibold text-gray-900">{currentTopic}</p>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>Progress</span>
                                    <span>{topicProgress.current}/{topicProgress.total} completed</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-primary h-2.5 rounded-full transition-all duration-300"
                                        style={{ width: `${(topicProgress.current / topicProgress.total) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            <button className="w-full bg-primary hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                Continue
                            </button>
                        </div>
                    )}
                </div>

                {/* Weekly Goals */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Weekly Goals</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Problems Solved</span>
                                <span className="font-semibold">12/20 this week</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
                                    style={{ width: '60%' }}
                                ></div>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-3">Activity</p>
                            <div className="flex gap-2 justify-between">
                                {weekDays.map((day, index) => (
                                    <div key={day} className="flex flex-col items-center gap-1">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${activeDays[index]
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 text-gray-400'
                                                }`}
                                        >
                                            {day[0]}
                                        </div>
                                        <span className="text-xs text-gray-500">{day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upcoming Assessments */}
                <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Upcoming Assessments</h3>
                    <div className="space-y-3">
                        {assessments.map((assessment, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div>
                                    <p className="font-semibold text-gray-900">{assessment.title}</p>
                                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                                        <Clock className="w-4 h-4" />
                                        <span>{assessment.time}</span>
                                    </div>
                                </div>
                                <button className="text-primary hover:text-purple-700 font-medium text-sm transition-colors">
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
