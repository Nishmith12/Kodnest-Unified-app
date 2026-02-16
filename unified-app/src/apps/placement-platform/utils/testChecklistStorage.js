/**
 * Test Checklist Storage Manager
 * Manages pre-ship test checklist state in localStorage
 */

const CHECKLIST_KEY = 'prp_test_checklist';

// Initialize with all tests unchecked
const DEFAULT_CHECKLIST = {
    'jd-required': false,
    'short-jd-warning': false,
    'skills-extraction': false,
    'round-mapping': false,
    'score-deterministic': false,
    'skill-toggles': false,
    'persistence': false,
    'history': false,
    'export': false,
    'no-console-errors': false
};

/**
 * Get current test checklist state
 */
export function getTestChecklist() {
    try {
        const data = localStorage.getItem(CHECKLIST_KEY);
        if (!data) {
            return { ...DEFAULT_CHECKLIST };
        }
        const parsed = JSON.parse(data);
        // Ensure all keys exist (backward compatibility)
        return { ...DEFAULT_CHECKLIST, ...parsed };
    } catch {
        return { ...DEFAULT_CHECKLIST };
    }
}

/**
 * Update a single test item
 */
export function updateTestItem(itemId, checked) {
    try {
        const checklist = getTestChecklist();
        checklist[itemId] = checked;
        localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checklist));
        return checklist;
    } catch (error) {
        console.error('Error updating test item:', error);
        return getTestChecklist();
    }
}

/**
 * Reset all tests to unchecked
 */
export function resetTestChecklist() {
    try {
        localStorage.setItem(CHECKLIST_KEY, JSON.stringify(DEFAULT_CHECKLIST));
        return { ...DEFAULT_CHECKLIST };
    } catch (error) {
        console.error('Error resetting checklist:', error);
        return DEFAULT_CHECKLIST;
    }
}

/**
 * Check if all tests are passed
 */
export function isAllTestsPassed() {
    const checklist = getTestChecklist();
    return Object.values(checklist).every(v => v === true);
}

/**
 * Get count of passed tests
 */
export function getPassedCount() {
    const checklist = getTestChecklist();
    return Object.values(checklist).filter(v => v === true).length;
}

/**
 * Get total test count
 */
export function getTotalTestCount() {
    return Object.keys(DEFAULT_CHECKLIST).length;
}
