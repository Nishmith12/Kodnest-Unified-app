import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import type { UserPreferences } from '../types';

const Settings: React.FC = () => {
    const { preferences, updatePreferences } = useJobs();
    const navigate = useNavigate();

    // Local state for form handling
    const [formData, setFormData] = useState<UserPreferences>(preferences);

    // Update local state when context changes (initial load)
    useEffect(() => {
        setFormData(preferences);
    }, [preferences]);

    const handleChange = (field: keyof UserPreferences, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayChange = (field: 'roleKeywords' | 'locations' | 'skills', value: string) => {
        const array = value.split(',').map(item => item.trim()).filter(item => item);
        handleChange(field, array);
    };

    const handleWorkModeToggle = (mode: string) => {
        setFormData(prev => {
            const currentModes = prev.workMode || [];
            if (currentModes.includes(mode)) {
                return { ...prev, workMode: currentModes.filter(m => m !== mode) };
            } else {
                return { ...prev, workMode: [...currentModes, mode] };
            }
        });
    };

    const handleSave = () => {
        updatePreferences(formData);
        navigate('/jobs/dashboard');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center py-8">
                <h1 className="text-4xl font-serif font-bold text-[var(--text-primary)] mb-2">Configure Your Tracker</h1>
                <p className="text-[var(--text-muted)]">Tell us what you're looking for, and we'll handle the search.</p>
            </div>

            <Card title="Job Preferences" className="p-6 md:p-8">
                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>

                    {/* Role Keywords */}
                    <div className="space-y-4">
                        <Input
                            label="Target Role Keywords"
                            placeholder="e.g. Frontend Developer, React Engineer"
                            helperText="Separate keywords with commas."
                            defaultValue={formData.roleKeywords.join(', ')}
                            onChange={(e) => handleArrayChange('roleKeywords', e.target.value)}
                        />
                    </div>

                    {/* Locations (Multi-select via text for now, or could vary) */}
                    <div className="space-y-4">
                        <Input
                            label="Preferred Locations"
                            placeholder="e.g. Bangalore, Remote, Pune"
                            helperText="Separate locations with commas."
                            defaultValue={formData.locations.join(', ')}
                            onChange={(e) => handleArrayChange('locations', e.target.value)}
                        />
                    </div>

                    {/* Skills */}
                    <div className="space-y-4">
                        <Input
                            label="Key Skills"
                            placeholder="e.g. React, TypeScript, Node.js"
                            helperText="Separate skills with commas. Used for overlap matching."
                            defaultValue={formData.skills.join(', ')}
                            onChange={(e) => handleArrayChange('skills', e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Work Mode Checkboxes */}
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium text-[var(--text-primary)]">Work Mode</label>
                            <div className="flex flex-col gap-2">
                                {['Remote', 'Hybrid', 'On-site'].map(mode => (
                                    <label key={mode} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-[var(--accent-primary)] border-gray-300 rounded focus:ring-[var(--accent-primary)]"
                                            checked={formData.workMode.includes(mode)}
                                            onChange={() => handleWorkModeToggle(mode)}
                                        />
                                        <span className="text-sm text-gray-700">{mode}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Experience Dropdown */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[var(--text-primary)]">Experience Level</label>
                            <select
                                className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-sm)] bg-white focus:ring-2 focus:ring-[var(--accent-primary)] outline-none"
                                value={formData.experienceLevel}
                                onChange={(e) => handleChange('experienceLevel', e.target.value)}
                            >
                                <option value="Fresher">Fresher / Entry Level</option>
                                <option value="0-1">0-1 Years</option>
                                <option value="1-3">1-3 Years</option>
                                <option value="3-5">3-5 Years</option>
                                <option value="5+">5+ Years</option>
                            </select>
                        </div>
                    </div>

                    {/* Min Match Score Slider */}
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-[var(--text-primary)]">Minimum Match Score</label>
                            <span className="text-sm font-bold text-[var(--accent-primary)]">{formData.minMatchScore}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
                            value={formData.minMatchScore}
                            onChange={(e) => handleChange('minMatchScore', parseInt(e.target.value))}
                        />
                        <p className="text-xs text-[var(--text-muted)]">Jobs below this score will be hidden when "Show matches only" is enabled.</p>
                    </div>

                    <div className="pt-6 border-t border-[var(--border-color)] flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={() => setFormData(preferences)}>Reset</Button>
                        <Button type="submit">Save Preferences</Button>
                    </div>
                </form>
            </Card>

            <div className="text-center text-sm text-[var(--text-muted)]">
                <p>These settings control your daily digest and dashboard feed.</p>
            </div>
        </div>
    );
};

export default Settings;
