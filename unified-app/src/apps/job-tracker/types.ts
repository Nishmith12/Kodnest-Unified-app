export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: 'Remote' | 'Hybrid' | 'On-site';
    experience: 'Fresher' | '0-1' | '1-3' | '3-5' | '5+';
    salary: string;
    postedAt: string;
    postedDaysAgo: number;
    description: string;
    requirements: string[]; // Keeping for backward compatibility or mapping to skills
    skills: string[];
    source: 'LinkedIn' | 'Naukri' | 'Indeed';
    applyUrl: string;
    tags: string[];
    logoUrl?: string;
    isNew?: boolean;
    matchScore?: number;
    status?: JobStatus; // New field
}

export type JobStatus = 'Not Applied' | 'Applied' | 'Rejected' | 'Selected' | 'Interview';

export interface UserPreferences {
    roleKeywords: string[];
    locations: string[];
    workMode: string[]; // Changed to array for multi-select
    experienceLevel: string;
    skills: string[]; // New field
    minMatchScore: number; // New field
}
