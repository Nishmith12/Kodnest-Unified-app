import type { Job, UserPreferences } from '../types';

export const ScoringService = {
    calculateMatchScore: (job: Job, prefs: UserPreferences): number => {
        let score = 0;

        // +25 if any roleKeyword appears in job.title (case-insensitive)
        const titleMatch = prefs.roleKeywords.some(keyword =>
            job.title.toLowerCase().includes(keyword.toLowerCase())
        );
        if (titleMatch) score += 25;

        // +15 if any roleKeyword appears in job.description
        const descMatch = prefs.roleKeywords.some(keyword =>
            job.description.toLowerCase().includes(keyword.toLowerCase())
        );
        if (descMatch) score += 15;

        // +15 if job.location matches preferredLocations
        // We check if job location contains any of the preferred locations (e.g. "Bangalore" in "Bangalore, Karnataka")
        const locMatch = prefs.locations.some(loc =>
            job.location.toLowerCase().includes(loc.toLowerCase())
        );
        if (locMatch) score += 15;

        // +10 if job.mode matches preferredMode
        // job.type is "Remote" | "Hybrid" | "On-site"
        // prefs.workMode is string[] e.g. ["Remote", "Hybrid"]
        const modeMatch = prefs.workMode.some(mode =>
            mode.toLowerCase() === job.type.toLowerCase()
        );
        if (modeMatch) score += 10;

        // +10 if job.experience matches experienceLevel
        // exact match for simplicity as per requirement, or we could do range mapping logic
        // Requirement says: "+10 if job.experience matches experienceLevel"
        // job.experience is "Fresher" | "0-1" | "1-3" etc.
        // prefs.experienceLevel is likely single select? User request said dropdown.
        // Let's assume exact string match or simplified mapping if needed. 
        // For now, strict equality or strict inclusion if experiencLevel became array? 
        // Request said "experienceLevel (dropdown)", so single string.
        if (job.experience.toLowerCase() === prefs.experienceLevel.toLowerCase()) {
            score += 10;
        }

        // +15 if overlap between job.skills and user.skills (any match)
        const skillMatch = job.skills.some(jobSkill =>
            prefs.skills.some(userSkill => userSkill.toLowerCase() === jobSkill.toLowerCase())
        );
        if (skillMatch) score += 15;

        // +5 if postedDaysAgo <= 2
        if (job.postedDaysAgo <= 2) score += 5;

        // +5 if source is LinkedIn
        if (job.source === 'LinkedIn') score += 5;

        // Cap score at 100
        return Math.min(score, 100);
    }
};
