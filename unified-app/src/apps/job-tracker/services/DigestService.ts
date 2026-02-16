import type { Job } from '../types';

const DIGEST_KEY_PREFIX = 'jobTrackerDigest_';

export const DigestService = {
    getTodayDigest: (): Job[] | null => {
        const today = new Date().toISOString().split('T')[0];
        const key = `${DIGEST_KEY_PREFIX}${today}`;
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : null;
    },

    saveTodayDigest: (jobs: Job[]) => {
        const today = new Date().toISOString().split('T')[0];
        const key = `${DIGEST_KEY_PREFIX}${today}`;
        localStorage.setItem(key, JSON.stringify(jobs));
    },

    generateDigest: (jobs: Job[]): Job[] => {
        // Filter jobs with matchScore > 0
        const candidates = jobs.filter(job => (job.matchScore || 0) > 0);

        // Sort by Match Score (desc), then Posted Date (asc - newer first? Logic says postedDaysAgo ascending = newer)
        candidates.sort((a, b) => {
            const scoreDiff = (b.matchScore || 0) - (a.matchScore || 0);
            if (scoreDiff !== 0) return scoreDiff;
            return a.postedDaysAgo - b.postedDaysAgo;
        });

        // Take top 10
        return candidates.slice(0, 10);
    }
};
