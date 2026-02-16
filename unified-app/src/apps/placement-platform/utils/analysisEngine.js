// Skill categories with keywords
const SKILL_CATEGORIES = {
    'Core CS': ['dsa', 'data structures', 'algorithms', 'oop', 'object oriented', 'dbms', 'database', 'os', 'operating system', 'networks', 'networking', 'computer science'],
    'Languages': ['java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'golang', 'go lang', 'ruby', 'php', 'swift', 'kotlin'],
    'Web': ['react', 'reactjs', 'next.js', 'nextjs', 'node.js', 'nodejs', 'express', 'rest api', 'restful', 'graphql', 'angular', 'vue', 'django', 'flask'],
    'Data': ['sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'nosql', 'cassandra', 'dynamodb'],
    'Cloud': ['aws', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'jenkins', 'linux', 'terraform', 'ansible'],
    'Testing': ['selenium', 'cypress', 'playwright', 'junit', 'pytest', 'testing', 'test automation', 'jest', 'mocha']
};

// Extract skills from JD text
export function extractSkills(jdText) {
    const text = jdText.toLowerCase();
    const extracted = {
        'Core CS': [],
        'Languages': [],
        'Web': [],
        'Data': [],
        'Cloud': [],
        'Testing': [],
        'Other': []
    };

    Object.entries(SKILL_CATEGORIES).forEach(([category, keywords]) => {
        const found = keywords.filter(keyword => text.includes(keyword));
        if (found.length > 0) {
            // Remove duplicates and capitalize
            extracted[category] = [...new Set(found)].map(s =>
                s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
            );
        }
    });

    // Check if we found any skills at all
    const totalSkills = Object.values(extracted).flat().length;

    // Fallback if completely empty
    if (totalSkills === 0) {
        extracted['Other'] = [
            'Communication',
            'Problem Solving',
            'Basic Coding',
            'Team Collaboration'
        ];
    }

    return extracted;
}

// Calculate readiness score
export function calculateReadinessScore({ skills, company, role, jdText }) {
    let score = 35; // Base

    // +5 per category (max 30)
    const categoryCount = Object.keys(skills).length;
    score += Math.min(categoryCount * 5, 30);

    // +10 if company provided
    if (company && company.trim().length > 0) score += 10;

    // +10 if role provided
    if (role && role.trim().length > 0) score += 10;

    // +10 if JD > 800 chars
    if (jdText && jdText.length > 800) score += 10;

    return Math.min(score, 100);
}

// Generate round-wise checklist
export function generateChecklist(skills) {
    const hasWeb = skills['Web'] || [];
    const hasData = skills['Data'] || [];
    const hasCloud = skills['Cloud'] || [];
    const hasDSA = skills['Core CS']?.some(s => s.toLowerCase().includes('dsa') || s.toLowerCase().includes('algorithm'));

    return {
        'Round 1: Aptitude & Basics': [
            'Practice quantitative aptitude (20-30 questions)',
            'Brush up on logical reasoning',
            'Review verbal ability basics',
            'Solve previous year aptitude papers',
            'Time management practice (1 min per question)',
            'Company-specific aptitude patterns research'
        ],
        'Round 2: DSA & Core CS': [
            hasDSA ? 'Master arrays, strings, and linked lists' : 'Learn basic data structures',
            'Practice sorting and searching algorithms',
            skills['Core CS']?.includes('Oop') ? 'Review OOP principles (4 pillars)' : 'Understand OOP basics',
            skills['Core CS']?.includes('Dbms') ? 'ACID, normalization, indexing concepts' : 'Database fundamentals',
            skills['Core CS']?.includes('Os') ? 'Process scheduling, deadlocks, memory management' : 'OS basics',
            'Solve 10-15 medium DSA problems',
            'Prepare complexity analysis explanations'
        ],
        'Round 3: Technical Interview': [
            hasWeb.length > 0 ? `Deep dive: ${hasWeb.slice(0, 2).join(', ')}` : 'Review your tech stack',
            'Prepare 2-3 projects with detailed explanations',
            hasData.length > 0 ? `Database queries and ${hasData[0]} specifics` : 'SQL query practice',
            hasCloud.length > 0 ? `Cloud/DevOps: ${hasCloud.slice(0, 2).join(', ')}` : 'Deployment basics',
            'System design basics (if asked)',
            'Code optimization and best practices',
            'Prepare questions about company tech stack'
        ],
        'Round 4: Managerial & HR': [
            'Prepare "Tell me about yourself" (2-min version)',
            'STAR method for behavioral questions',
            'Why this company? Research their products/culture',
            'Strengths and weaknesses with examples',
            'Career goals alignment with role',
            'Prepare 5-6 questions to ask interviewer',
            'Salary expectations research'
        ]
    };
}

// Generate 7-day plan
export function generate7DayPlan(skills) {
    const hasWeb = skills['Web'] || [];
    const hasReact = hasWeb.some(s => s.toLowerCase().includes('react'));
    const hasDSA = skills['Core CS']?.some(s => s.toLowerCase().includes('dsa'));

    return {
        'Day 1-2: Foundations': [
            'Review core CS concepts (OOP, DBMS, OS)',
            'Brush up on your primary language',
            'Solve 5 easy DSA problems',
            'Read about company background and culture',
            'Prepare resume talking points'
        ],
        'Day 3-4: DSA & Coding': [
            hasDSA ? 'Solve 10 medium DSA problems' : 'Practice basic coding problems',
            'Focus on arrays, strings, hashmaps',
            'Time yourself (45 min per problem)',
            'Write clean, documented code',
            'Practice explaining your approach verbally'
        ],
        'Day 5: Projects & Stack': [
            'Deep dive into your best 2 projects',
            hasReact ? 'React concepts: hooks, state, lifecycle' : 'Review your web framework',
            hasWeb.length > 0 ? `${hasWeb[0]} specific interview questions` : 'Tech stack deep dive',
            'Prepare architecture diagrams',
            'Practice project demos (5-min version)'
        ],
        'Day 6: Mock Interviews': [
            'Solve 3-4 common interview problems',
            'Practice system design (if applicable)',
            'Mock behavioral interview questions',
            'Record yourself answering technical questions',
            'Review weak areas from practice'
        ],
        'Day 7: Final Revision': [
            'Quick revision of all core topics',
            'Review your notes and key points',
            'Practice intro and project explanations',
            'Relax and get good sleep',
            'Prepare questions for interviewer'
        ]
    };
}

// Generate interview questions based on skills
export function generateQuestions(skills) {
    const questions = [];

    // Core CS questions
    if (skills['Core CS']) {
        if (skills['Core CS'].some(s => s.toLowerCase().includes('dsa') || s.toLowerCase().includes('algorithm'))) {
            questions.push('How would you optimize search in a sorted array?');
            questions.push('Explain time and space complexity with examples.');
        }
        if (skills['Core CS'].some(s => s.toLowerCase().includes('oop'))) {
            questions.push('Explain polymorphism with a real-world example.');
        }
        if (skills['Core CS'].some(s => s.toLowerCase().includes('dbms'))) {
            questions.push('Explain database indexing and when it helps performance.');
        }
        if (skills['Core CS'].some(s => s.toLowerCase().includes('os'))) {
            questions.push('What is a deadlock? How can you prevent it?');
        }
    }

    // Web questions
    if (skills['Web']) {
        if (skills['Web'].some(s => s.toLowerCase().includes('react'))) {
            questions.push('Explain state management options in React.');
            questions.push('What are React hooks and why were they introduced?');
        }
        if (skills['Web'].some(s => s.toLowerCase().includes('node'))) {
            questions.push('How does Node.js handle async operations?');
        }
        if (skills['Web'].some(s => s.toLowerCase().includes('rest'))) {
            questions.push('Explain RESTful API design principles.');
        }
    }

    // Data questions
    if (skills['Data']) {
        questions.push('Difference between SQL and NoSQL databases?');
        if (skills['Data'].some(s => s.toLowerCase().includes('mongodb'))) {
            questions.push('When would you use MongoDB over a relational database?');
        }
    }

    // Cloud questions
    if (skills['Cloud/DevOps']) {
        if (skills['Cloud/DevOps'].some(s => s.toLowerCase().includes('docker'))) {
            questions.push('Explain containerization and its benefits.');
        }
        if (skills['Cloud/DevOps'].some(s => s.toLowerCase().includes('aws') || s.toLowerCase().includes('cloud'))) {
            questions.push('What cloud services have you worked with?');
        }
    }

    // Generic important questions
    questions.push('Walk me through your best project and the challenges you faced.');
    questions.push('How do you approach debugging a complex issue?');

    // Ensure we have exactly 10 questions
    while (questions.length < 10) {
        const generic = [
            'Explain a time you optimized code for better performance.',
            'How do you stay updated with new technologies?',
            'Describe your development workflow.',
            'What testing strategies do you follow?'
        ];
        questions.push(generic[questions.length % generic.length]);
    }

    return questions.slice(0, 10);
}
