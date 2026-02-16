/**
 * Submission Storage Manager
 * Manages final proof submission data including steps and artifacts
 */

const SUBMISSION_KEY = 'prp_final_submission';

const DEFAULT_SUBMISSION = {
    steps: {
        1: false, // Foundation & Auth
        2: false, // Backend Integration
        3: false, // JD Analysis Engine
        4: false, // Results & Interactivity
        5: false, // Company Intelligence
        6: false, // Data Hardening
        7: false, // Quality Gates
        8: false  // Proof & Deployment
    },
    artifacts: {
        lovableLink: '',
        githubLink: '',
        deployedLink: ''
    },
    submittedAt: null,
    shippedAt: null
};

/**
 * Get current submission state
 */
export function getSubmission() {
    try {
        const data = localStorage.getItem(SUBMISSION_KEY);
        if (!data) {
            return { ...DEFAULT_SUBMISSION };
        }
        const parsed = JSON.parse(data);
        // Ensure all keys exist (backward compatibility)
        return {
            steps: { ...DEFAULT_SUBMISSION.steps, ...parsed.steps },
            artifacts: { ...DEFAULT_SUBMISSION.artifacts, ...parsed.artifacts },
            submittedAt: parsed.submittedAt || null,
            shippedAt: parsed.shippedAt || null
        };
    } catch {
        return { ...DEFAULT_SUBMISSION };
    }
}

/**
 * Update a single step completion status
 */
export function updateStep(stepId, completed) {
    try {
        const submission = getSubmission();
        submission.steps[stepId] = completed;
        localStorage.setItem(SUBMISSION_KEY, JSON.stringify(submission));
        return submission;
    } catch (error) {
        console.error('Error updating step:', error);
        return getSubmission();
    }
}

/**
 * Update artifact links
 */
export function updateArtifacts(artifacts) {
    try {
        const submission = getSubmission();
        submission.artifacts = artifacts;

        // Set submittedAt if all 3 links provided and valid
        if (validateURL(artifacts.lovableLink) &&
            validateURL(artifacts.githubLink) &&
            validateURL(artifacts.deployedLink)) {
            if (!submission.submittedAt) {
                submission.submittedAt = new Date().toISOString();
            }
        } else {
            submission.submittedAt = null; // Reset if links become invalid
        }

        localStorage.setItem(SUBMISSION_KEY, JSON.stringify(submission));
        return submission;
    } catch (error) {
        console.error('Error updating artifacts:', error);
        return getSubmission();
    }
}

/**
 * Mark submission as shipped (when all conditions met)
 */
export function markAsShipped() {
    try {
        const submission = getSubmission();
        if (!submission.shippedAt) {
            submission.shippedAt = new Date().toISOString();
            localStorage.setItem(SUBMISSION_KEY, JSON.stringify(submission));
        }
        return submission;
    } catch (error) {
        console.error('Error marking as shipped:', error);
        return getSubmission();
    }
}

/**
 * Check if all 8 steps are completed
 */
export function isAllStepsComplete() {
    const submission = getSubmission();
    return Object.values(submission.steps).every(v => v === true);
}

/**
 * Validate URL format
 */
export function validateURL(url) {
    if (!url || url.trim() === '') return false;
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
        return false;
    }
}

/**
 * Get count of completed steps
 */
export function getCompletedStepsCount() {
    const submission = getSubmission();
    return Object.values(submission.steps).filter(v => v === true).length;
}

/**
 * Reset submission (for testing)
 */
export function resetSubmission() {
    try {
        localStorage.setItem(SUBMISSION_KEY, JSON.stringify(DEFAULT_SUBMISSION));
        return { ...DEFAULT_SUBMISSION };
    } catch (error) {
        console.error('Error resetting submission:', error);
        return DEFAULT_SUBMISSION;
    }
}
