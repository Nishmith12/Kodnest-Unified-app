// Known company databases for size classification
const ENTERPRISE_COMPANIES = [
    'amazon', 'google', 'microsoft', 'meta', 'facebook',
    'infosys', 'tcs', 'wipro', 'cognizant', 'accenture',
    'ibm', 'oracle', 'sap', 'adobe', 'salesforce',
    'apple', 'netflix', 'uber', 'linkedin', 'twitter',
    'intel', 'nvidia', 'qualcomm', 'cisco', 'dell',
    'hp', 'capgemini', 'deloitte', 'pwc', 'ey'
];

const MIDSIZE_COMPANIES = [
    'flipkart', 'paytm', 'swiggy', 'zomato', 'phonpe',
    'razorpay', 'cred', 'zerodha', 'freshworks', 'ola',
    'byju', 'sharechat', 'meesho', 'dunzo', 'cure.fit',
    'bigbasket', 'myntra', 'nykaa', 'udaan', 'delhivery'
];

// Industry keywords mapping
const INDUSTRY_KEYWORDS = {
    'Financial Services': ['fintech', 'banking', 'payment', 'wallet', 'finance', 'trading', 'insurance'],
    'E-commerce': ['ecommerce', 'e-commerce', 'retail', 'marketplace', 'shopping', 'delivery'],
    'Healthcare': ['healthcare', 'health', 'medical', 'pharma', 'telemedicine', 'hospital'],
    'Food & Delivery': ['food', 'restaurant', 'delivery', 'grocery'],
    'Cloud & Infrastructure': ['cloud', 'aws', 'azure', 'infrastructure', 'devops', 'saas'],
    'Social & Media': ['social', 'media', 'content', 'streaming', 'entertainment'],
    'EdTech': ['education', 'learning', 'edtech', 'training', 'courses'],
    'Transportation': ['ride', 'transport', 'logistics', 'mobility', 'cab']
};

/**
 * Detect company size based on known companies or default to startup
 */
export function detectCompanySize(companyName) {
    if (!companyName || companyName === 'Not specified') {
        return {
            size: 'Startup',
            category: '<200 employees',
            description: 'Early-stage or unknown company'
        };
    }

    const normalized = companyName.toLowerCase().trim();

    // Check enterprise list
    if (ENTERPRISE_COMPANIES.some(company => normalized.includes(company))) {
        return {
            size: 'Enterprise',
            category: '2000+ employees',
            description: 'Large established corporation'
        };
    }

    // Check mid-size list
    if (MIDSIZE_COMPANIES.some(company => normalized.includes(company))) {
        return {
            size: 'Mid-size',
            category: '200-2000 employees',
            description: 'Growing company with established processes'
        };
    }

    // Default to startup
    return {
        size: 'Startup',
        category: '<200 employees',
        description: 'Early-stage or unknown company'
    };
}

/**
 * Infer industry from JD text keywords
 */
export function inferIndustry(jdText, companyName) {
    const text = (jdText + ' ' + companyName).toLowerCase();

    // Check each industry's keywords
    for (const [industry, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
        if (keywords.some(keyword => text.includes(keyword))) {
            return industry;
        }
    }

    // Default industry
    return 'Technology Services';
}

/**
 * Get hiring focus based on company size
 */
export function getHiringFocus(companySize) {
    const focuses = {
        'Enterprise': {
            summary: 'Structured interviews with strong DSA and core CS fundamentals',
            priorities: ['Algorithm optimization', 'System design at scale', 'CS theory mastery'],
            approach: 'Multiple rounds with emphasis on standardized problem-solving'
        },
        'Mid-size': {
            summary: 'Balanced approach with practical skills and problem solving',
            priorities: ['Full-stack abilities', 'Team collaboration', 'Growth mindset'],
            approach: 'Mix of technical depth and practical application'
        },
        'Startup': {
            summary: 'Hands-on coding with emphasis on shipping products fast',
            priorities: ['Quick learning', 'Ownership mindset', 'Stack expertise'],
            approach: 'Focus on practical coding and culture fit'
        }
    };

    return focuses[companySize] || focuses['Startup'];
}

/**
 * Generate complete company intel
 */
export function generateCompanyIntel({ company, jdText }) {
    const sizeInfo = detectCompanySize(company);
    const industry = inferIndustry(jdText, company);
    const hiringFocus = getHiringFocus(sizeInfo.size);

    return {
        name: company || 'Not specified',
        size: sizeInfo.size,
        sizeCategory: sizeInfo.category,
        sizeDescription: sizeInfo.description,
        industry: industry,
        hiringFocus: hiringFocus.summary,
        priorities: hiringFocus.priorities,
        approach: hiringFocus.approach,
        detectedFrom: 'heuristic'
    };
}
