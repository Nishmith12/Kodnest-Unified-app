/**
 * Generate dynamic interview rounds based on company size and detected skills
 */

/**
 * Check if DSA/algorithms are a focus based on skills
 */
function hasDSAFocus(skills) {
    const coreCS = skills['Core CS'] || [];
    const dsaKeywords = ['dsa', 'algorithm', 'data structure'];
    return coreCS.some(skill =>
        dsaKeywords.some(keyword => skill.toLowerCase().includes(keyword))
    );
}

/**
 * Check if web/practical stack is detected
 */
function hasWebStackFocus(skills) {
    return (skills['Web'] && skills['Web'].length > 0) ||
        (skills['Languages'] && skills['Languages'].some(lang =>
            ['javascript', 'typescript', 'python'].some(l => lang.toLowerCase().includes(l))
        ));
}

/**
 * Generate Enterprise company rounds (4-5 rounds, DSA heavy)
 */
function generateEnterpriseRounds(skills) {
    const hasDSA = hasDSAFocus(skills);

    const rounds = [
        {
            number: 1,
            title: 'Online Assessment',
            duration: '60-90 minutes',
            description: 'Coding test with DSA problems and aptitude questions',
            topics: hasDSA ? ['DSA (Medium-Hard)', 'Aptitude', 'Core CS MCQs'] : ['Coding', 'Aptitude', 'Logical Reasoning'],
            whyMatters: 'Efficiently filter large applicant pool based on core technical skills'
        },
        {
            number: 2,
            title: 'Technical Interview I',
            duration: '45-60 minutes',
            description: 'Deep dive into data structures and algorithms',
            topics: ['Arrays & Strings', 'Trees & Graphs', 'Dynamic Programming', 'Complexity Analysis'],
            whyMatters: 'Validate problem-solving ability required for working at scale'
        },
        {
            number: 3,
            title: 'Technical Interview II',
            duration: '45-60 minutes',
            description: 'System design or project discussion',
            topics: ['System Architecture', 'Scalability', 'Database Design', 'API Design'],
            whyMatters: 'Assess real-world engineering skills and architectural thinking'
        },
        {
            number: 4,
            title: 'HR/Managerial Round',
            duration: '30-45 minutes',
            description: 'Behavioral questions and culture fit assessment',
            topics: ['Past Experiences', 'Conflict Resolution', 'Culture Fit', 'Compensation'],
            whyMatters: 'Ensure mutual alignment on values, expectations, and long-term fit'
        }
    ];

    return rounds;
}

/**
 * Generate Startup company rounds (2-3 rounds, practical focus)
 */
function generateStartupRounds(skills) {
    const webSkills = skills['Web'] || [];
    const hasWeb = webSkills.length > 0;

    const rounds = [
        {
            number: 1,
            title: 'Practical Coding Challenge',
            duration: '2-3 hours',
            description: hasWeb
                ? `Build a small feature using ${webSkills.slice(0, 2).join(', ')}`
                : 'Solve real-world coding problems',
            topics: hasWeb ? webSkills.slice(0, 3) : ['Problem Solving', 'Clean Code', 'Best Practices'],
            whyMatters: 'See how you actually code and approach real problems, not just theory'
        },
        {
            number: 2,
            title: 'Technical Discussion',
            duration: '45-60 minutes',
            description: 'Code review and architecture discussion',
            topics: ['Code Quality', 'Design Decisions', 'Trade-offs', 'Scalability'],
            whyMatters: 'Understand your thought process and how you make engineering decisions'
        },
        {
            number: 3,
            title: 'Team & Culture Fit',
            duration: '30-45 minutes',
            description: 'Meet the team and discuss role expectations',
            topics: ['Team Dynamics', 'Growth Goals', 'Startup Culture', 'Role Clarity'],
            whyMatters: 'Ensure long-term fit since startups need committed team members'
        }
    ];

    return rounds;
}

/**
 * Generate Mid-size company rounds (3-4 rounds, balanced)
 */
function generateMidSizeRounds(skills) {
    const hasDSA = hasDSAFocus(skills);
    const hasWeb = hasWebStackFocus(skills);

    const rounds = [
        {
            number: 1,
            title: 'Online Coding Test',
            duration: '60 minutes',
            description: 'Coding problems with medium difficulty',
            topics: hasDSA
                ? ['DSA (Easy-Medium)', 'Problem Solving', 'Code Quality']
                : ['Practical Coding', 'Logic Building', 'Syntax'],
            whyMatters: 'Baseline technical assessment to shortlist candidates'
        },
        {
            number: 2,
            title: 'Technical Interview',
            duration: '45-60 minutes',
            description: hasWeb
                ? 'Framework knowledge and coding best practices'
                : 'DSA and core CS concepts',
            topics: hasWeb
                ? [...(skills['Web'] || []).slice(0, 2), 'Code Design', 'APIs']
                : ['Data Structures', 'Algorithms', 'OOP', 'DBMS'],
            whyMatters: 'Evaluate balanced mix of theoretical knowledge and practical skills'
        },
        {
            number: 3,
            title: 'Project Discussion',
            duration: '30-45 minutes',
            description: 'Deep dive into past projects and tech choices',
            topics: ['Project Experience', 'Tech Stack', 'Challenges Faced', 'Solutions'],
            whyMatters: 'Validate real-world experience beyond textbook knowledge'
        },
        {
            number: 4,
            title: 'Final Round',
            duration: '30-45 minutes',
            description: 'Team lead and HR discussion',
            topics: ['Team Fit', 'Growth Potential', 'Expectations', 'Offer Discussion'],
            whyMatters: 'Close the loop on mutual expectations and finalize decision'
        }
    ];

    return rounds;
}

/**
 * Main function to generate rounds based on company intel and skills
 */
export function generateRoundMapping({ companySize, skills }) {
    if (companySize === 'Enterprise') {
        return generateEnterpriseRounds(skills);
    } else if (companySize === 'Mid-size') {
        return generateMidSizeRounds(skills);
    } else {
        return generateStartupRounds(skills);
    }
}

/**
 * Get round summary for quick reference
 */
export function getRoundSummary(rounds) {
    return {
        totalRounds: rounds.length,
        estimatedTime: rounds.reduce((total, round) => {
            const duration = round.duration || '';
            const mins = duration.match(/(\d+)/);
            return total + (mins ? parseInt(mins[0]) : 60);
        }, 0),
        keyTopics: [...new Set(rounds.flatMap(r => r.topics))].slice(0, 5)
    };
}
