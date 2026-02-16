/**
 * Schema Validator and Normalizer
 * Ensures all analysis entries have consistent, valid structure
 */

/**
 * Generate unique ID
 */
function generateId() {
    return `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Normalize skills object to standard format
 */
function normalizeSkills(skills) {
    if (!skills || typeof skills !== 'object') {
        return {
            "Core CS": [],
            "Languages": [],
            "Web": [],
            "Data": [],
            "Cloud": [],
            "Testing": [],
            "Other": []
        };
    }

    return {
        "Core CS": Array.isArray(skills["Core CS"]) ? skills["Core CS"] :
            (Array.isArray(skills.coreCS) ? skills.coreCS : []),
        "Languages": Array.isArray(skills["Languages"]) ? skills["Languages"] :
            (Array.isArray(skills.languages) ? skills.languages : []),
        "Web": Array.isArray(skills["Web"]) ? skills["Web"] :
            (Array.isArray(skills.web) ? skills.web : []),
        "Data": Array.isArray(skills["Data"]) ? skills["Data"] :
            (Array.isArray(skills.data) ? skills.data : []),
        "Cloud": Array.isArray(skills["Cloud"]) ? skills["Cloud"] :
            (Array.isArray(skills.cloud) ? skills.cloud : []),
        "Testing": Array.isArray(skills["Testing"]) ? skills["Testing"] :
            (Array.isArray(skills.testing) ? skills.testing : []),
        "Other": Array.isArray(skills["Other"]) ? skills["Other"] :
            (Array.isArray(skills.other) ? skills.other : [])
    };
}

/**
 * Normalize analysis entry to standard schema
 * Handles backward compatibility and missing fields
 */
export function normalizeAnalysisEntry(entry) {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Invalid entry: must be an object');
    }

    // Handle legacy field names
    const baseScore = typeof entry.baseScore === 'number' ? entry.baseScore :
        (typeof entry.readinessScore === 'number' ? entry.readinessScore : 0);

    const finalScore = typeof entry.finalScore === 'number' ? entry.finalScore :
        (typeof entry.adjustedScore === 'number' ? entry.adjustedScore : baseScore);

    return {
        // Core metadata
        id: entry.id || generateId(),
        createdAt: entry.createdAt || new Date().toISOString(),
        updatedAt: entry.updatedAt || entry.createdAt || new Date().toISOString(),

        // Input data
        company: typeof entry.company === 'string' ? entry.company : "",
        role: typeof entry.role === 'string' ? entry.role : "",
        jdText: typeof entry.jdText === 'string' ? entry.jdText : "",

        // Extracted data
        extractedSkills: normalizeSkills(entry.extractedSkills),

        // Analysis outputs
        checklist: entry.checklist && typeof entry.checklist === 'object' ? entry.checklist : {},
        plan: entry.plan && typeof entry.plan === 'object' ? entry.plan : {},
        questions: Array.isArray(entry.questions) ? entry.questions : [],

        // Scoring
        baseScore: baseScore,
        skillConfidenceMap: entry.skillConfidenceMap && typeof entry.skillConfidenceMap === 'object'
            ? entry.skillConfidenceMap : {},
        finalScore: finalScore,

        // Company intel (optional)
        companyIntel: entry.companyIntel || null,

        // Round mapping (optional)
        roundMapping: Array.isArray(entry.roundMapping) ? entry.roundMapping : null
    };
}

/**
 * Validate that entry has minimum required fields
 */
export function validateAnalysisEntry(entry) {
    const errors = [];

    if (!entry.id) errors.push('Missing id');
    if (!entry.jdText) errors.push('Missing jdText');
    if (typeof entry.baseScore !== 'number') errors.push('Invalid baseScore');
    if (typeof entry.finalScore !== 'number') errors.push('Invalid finalScore');
    if (!entry.extractedSkills) errors.push('Missing extractedSkills');

    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Check if all required fields are present
 */
export function hasRequiredFields(entry) {
    return Boolean(
        entry &&
        entry.id &&
        entry.jdText &&
        typeof entry.baseScore === 'number' &&
        typeof entry.finalScore === 'number' &&
        entry.extractedSkills
    );
}
