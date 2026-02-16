import type { Job, UserPreferences } from '../types';

const INDIAN_TECH_COMPANIES = [
    'TCS', 'Infosys', 'Wipro', 'Accenture', 'Capgemini', 'Cognizant',
    'IBM', 'Oracle', 'SAP', 'Dell',
    'Amazon', 'Flipkart', 'Swiggy', 'Razorpay', 'PhonePe', 'Paytm',
    'Zoho', 'Freshworks', 'Juspay', 'CRED', 'Meesho', 'Zomato', 'Ola', 'Urban Company'
];

const ROLES = [
    { title: 'SDE Intern', exp: 'Fresher' },
    { title: 'Graduate Engineer Trainee', exp: 'Fresher' },
    { title: 'Junior Backend Developer', exp: '0-1' },
    { title: 'Frontend Intern', exp: 'Fresher' },
    { title: 'QA Intern', exp: 'Fresher' },
    { title: 'Data Analyst Intern', exp: 'Fresher' },
    { title: 'Java Developer', exp: '0-1' },
    { title: 'Python Developer', exp: 'Fresher' },
    { title: 'React Developer', exp: '1-3' },
    { title: 'Full Stack Engineer', exp: '1-3' },
    { title: 'DevOps Engineer', exp: '3-5' },
    { title: 'Product Engineer', exp: '1-3' }
];

const LOCATIONS = [
    'Bangalore, Karnataka', 'Hyderabad, Telangana', 'Pune, Maharashtra',
    'Chennai, Tamil Nadu', 'Gurgaon, Haryana', 'Noida, UP', 'Mumbai, Maharashtra',
    'Remote', 'Indore, MP', 'Kochi, Kerala'
];

const SKILLS_POOL = [
    'React', 'Node.js', 'Java', 'Python', 'SQL', 'AWS', 'Docker', 'Kubernetes',
    'TypeScript', 'JavaScript', 'Spring Boot', 'Django', 'FastAPI', 'MongoDB', 'PostgreSQL'
];

const SOURCES = ['LinkedIn', 'Naukri', 'Indeed'] as const;

export const MockDataService = {
    generateJobs: async (count: number = 60, _preferences?: UserPreferences): Promise<Job[]> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        return Array.from({ length: count }).map((_, index) => {
            const role = ROLES[Math.floor(Math.random() * ROLES.length)];
            const company = INDIAN_TECH_COMPANIES[Math.floor(Math.random() * INDIAN_TECH_COMPANIES.length)];
            const isRemote = Math.random() < 0.2;
            const location = isRemote ? 'Remote' : LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
            const type = isRemote ? 'Remote' : (Math.random() > 0.6 ? 'Hybrid' : 'On-site');
            const postedDaysAgo = Math.floor(Math.random() * 11); // 0-10 days

            // Salary logic
            let salary = '';
            if (role.title.includes('Intern')) {
                salary = `₹${15 + Math.floor(Math.random() * 25)}k/month`;
            } else if (role.exp === 'Fresher' || role.exp === '0-1') {
                salary = `₹${3 + Math.floor(Math.random() * 4)} - ${6 + Math.floor(Math.random() * 4)} LPA`;
            } else {
                salary = `₹${8 + Math.floor(Math.random() * 5)} - ${15 + Math.floor(Math.random() * 10)} LPA`;
            }

            const source = SOURCES[Math.floor(Math.random() * SOURCES.length)];

            // Realistic descriptions
            const description = `We are looking for a passionate ${role.title} to join our team at ${company}. 
You will work on cutting-edge technologies and contribute to scalable products. 
This is a fantastic opportunity for ${role.exp === 'Fresher' ? 'fresh graduates' : 'experienced professionals'} to grow their career.
Key responsibilities include coding, debugging, and collaborating with cross-functional teams.
Strong problem-solving skills and a willingness to learn are essential.`;

            const jobSkills = SKILLS_POOL.sort(() => 0.5 - Math.random()).slice(0, 4);

            return {
                id: `job-${Date.now()}-${index}`,
                title: role.title,
                company: company,
                location: location,
                type: type,
                experience: role.exp as any,
                salary: salary,
                postedAt: postedDaysAgo === 0 ? 'Today' : `${postedDaysAgo} days ago`,
                postedDaysAgo: postedDaysAgo,
                description: description,
                requirements: jobSkills, // Mapping skills to requirements for now
                skills: jobSkills,
                source: source,
                applyUrl: 'https://linkedin.com/jobs', // Placeholder
                tags: [type, role.exp, ...jobSkills],
                isNew: postedDaysAgo <= 2
            };
        });
    }
};
