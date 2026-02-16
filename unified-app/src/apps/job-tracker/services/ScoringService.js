export const ScoringService = {
    calculateMatchScore: (job, prefs) => {
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
        const locMatch = prefs.locations.some(loc =>
            job.location.toLowerCase().includes(loc.toLowerCase())
        );
        if (locMatch) score += 15;

        // +10 if job.mode matches preferredMode
        const modeMatch = prefs.workMode.some(mode =>
            mode.toLowerCase() === job.type.toLowerCase()
        );
        if (modeMatch) score += 10;

        // +10 if job.experience matches experienceLevel
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
