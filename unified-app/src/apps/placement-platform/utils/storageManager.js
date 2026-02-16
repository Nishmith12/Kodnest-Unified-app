import { normalizeAnalysisEntry } from './schemaValidator';

const STORAGE_KEY = 'placement_analysis_history';

// Generate unique ID
function generateId() {
    return `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Save analysis to history
export function saveAnalysis(analysisData) {
    try {
        const history = getHistory();

        // Normalize and add timestamps
        const entry = normalizeAnalysisEntry({
            id: generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...analysisData
        });

        history.unshift(entry); // Add to beginning
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        return entry.id;
    } catch (error) {
        console.error('Error saving analysis:', error);
        throw new Error('Failed to save analysis');
    }
}

// Get all history with validation and error handling
export function getHistory() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];

        const parsed = JSON.parse(data);
        if (!Array.isArray(parsed)) {
            console.warn('Invalid history data format, resetting');
            return [];
        }

        // Validate and normalize each entry
        const validated = [];
        for (const entry of parsed) {
            try {
                const normalized = normalizeAnalysisEntry(entry);
                validated.push(normalized);
            } catch (err) {
                console.warn('Skipping corrupted entry:', err.message);
                // Skip this entry, continue with others
            }
        }

        return validated;
    } catch (error) {
        console.error('Error loading history:', error);
        // Return empty instead of crashing
        return [];
    }
}

// Get specific analysis by ID
export function getAnalysisById(id) {
    try {
        const history = getHistory();
        const entry = history.find(item => item.id === id);
        return entry || null;
    } catch (error) {
        console.error('Error getting analysis:', error);
        return null;
    }
}

// Delete analysis
export function deleteAnalysis(id) {
    try {
        const history = getHistory();
        const filtered = history.filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Error deleting analysis:', error);
        return false;
    }
}

// Update specific analysis (for skill confidence and final score)
export function updateAnalysis(id, updates) {
    try {
        const history = getHistory();
        const index = history.findIndex(item => item.id === id);

        if (index !== -1) {
            // Always update the updatedAt timestamp
            history[index] = {
                ...history[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
            return history[index];
        }

        return null;
    } catch (error) {
        console.error('Error updating analysis:', error);
        return null;
    }
}

// Clear all history
export function clearHistory() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing history:', error);
        return false;
    }
}

// Check if history has corrupted data
export function hasCorruptedEntries() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return false;

        const parsed = JSON.parse(data);
        if (!Array.isArray(parsed)) return true;

        // Check if any entry would fail normalization
        for (const entry of parsed) {
            try {
                normalizeAnalysisEntry(entry);
            } catch {
                return true; // At least one corrupted entry
            }
        }

        return false;
    } catch {
        return true; // Parse error = corrupted
    }
}
