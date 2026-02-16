import React, { createContext, useContext, useState, useEffect } from 'react';
import { MockDataService } from '../services/MockDataService';
import { ScoringService } from '../services/ScoringService';

const JobContext = createContext(undefined);

export const JobProvider = ({ children }) => {
    // Jobs State
    const [jobs, setJobs] = useState(() => {
        const saved = localStorage.getItem('jobTrackerJobs');
        return saved ? JSON.parse(saved) : [];
    });
    const [isLoading, setIsLoading] = useState(false);

    // Saved Jobs State
    const [savedJobs, setSavedJobs] = useState(() => {
        const saved = localStorage.getItem('jobTrackerSavedJobs');
        return saved ? JSON.parse(saved) : [];
    });

    // Preferences State
    const [preferences, setPreferences] = useState(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        return savedPrefs ? JSON.parse(savedPrefs) : {
            roleKeywords: [],
            locations: [],
            workMode: [],
            experienceLevel: 'Fresher',
            skills: [],
            minMatchScore: 40
        };
    });

    // Status State
    const [jobStatus, setJobStatus] = useState(() => {
        const saved = localStorage.getItem('jobTrackerStatus');
        return saved ? JSON.parse(saved) : {};
    });

    // Status History
    const [statusHistory, setStatusHistory] = useState(() => {
        const saved = localStorage.getItem('jobTrackerStatusHistory');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist Effects
    useEffect(() => {
        localStorage.setItem('jobTrackerJobs', JSON.stringify(jobs));
    }, [jobs]);

    useEffect(() => {
        localStorage.setItem('jobTrackerSavedJobs', JSON.stringify(savedJobs));
    }, [savedJobs]);

    useEffect(() => {
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(preferences));
    }, [preferences]);

    useEffect(() => {
        localStorage.setItem('jobTrackerStatus', JSON.stringify(jobStatus));
    }, [jobStatus]);

    useEffect(() => {
        localStorage.setItem('jobTrackerStatusHistory', JSON.stringify(statusHistory));
    }, [statusHistory]);

    // Actions
    const loadJobs = async () => {
        setIsLoading(true);
        try {
            const data = await MockDataService.generateJobs(60, preferences);
            const processedData = data.map(job => ({
                ...job,
                matchScore: ScoringService.calculateMatchScore(job, preferences),
                status: jobStatus[job.id] || 'Not Applied'
            }));
            setJobs(processedData);
        } catch (error) {
            console.error("Failed to load jobs", error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveJob = (job) => {
        setSavedJobs(prev => {
            if (prev.some(j => j.id === job.id)) return prev;
            return [...prev, job];
        });
    };

    const removeJob = (jobId) => {
        setSavedJobs(prev => prev.filter(job => job.id !== jobId));
    };

    const isSaved = (jobId) => {
        return savedJobs.some(job => job.id === jobId);
    };

    const updatePreferences = (newPrefs) => {
        setPreferences(prev => {
            const updated = { ...prev, ...newPrefs };
            setJobs(currentJobs => currentJobs.map(job => ({
                ...job,
                matchScore: ScoringService.calculateMatchScore(job, updated)
            })));
            return updated;
        });
    };

    const updateJobStatus = (jobId, status) => {
        // Update Status Map
        setJobStatus(prev => ({
            ...prev,
            [jobId]: status
        }));

        // Update main Jobs list
        setJobs(currentJobs => currentJobs.map(job =>
            job.id === jobId ? { ...job, status } : job
        ));

        // Update Saved Jobs list if applicable
        setSavedJobs(currentSaved => currentSaved.map(job =>
            job.id === jobId ? { ...job, status } : job
        ));

        // Add to history
        const job = jobs.find(j => j.id === jobId) || savedJobs.find(j => j.id === jobId);
        if (job) {
            const historyItem = {
                jobId,
                title: job.title,
                company: job.company,
                status,
                date: new Date().toISOString()
            };
            setStatusHistory(prev => [historyItem, ...prev].slice(0, 10)); // Keep last 10
        }
    };

    const [testResults, setTestResults] = useState(() => {
        const saved = localStorage.getItem('jobTrackerTestResults');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('jobTrackerTestResults', JSON.stringify(testResults));
    }, [testResults]);

    const updateTestResult = (id, value) => {
        setTestResults(prev => ({ ...prev, [id]: value }));
    };

    const resetTestResults = () => {
        setTestResults({});
    };

    const allTestsPassed = Object.keys(testResults).length === 10 && Object.values(testResults).every(v => v);

    const [submissionLinks, setSubmissionLinks] = useState(() => {
        const saved = localStorage.getItem('jobTrackerSubmission');
        return saved ? JSON.parse(saved) : { lovable: '', github: '', deployed: '' };
    });

    useEffect(() => {
        localStorage.setItem('jobTrackerSubmission', JSON.stringify(submissionLinks));
    }, [submissionLinks]);

    const updateSubmissionLink = (key, value) => {
        setSubmissionLinks(prev => ({ ...prev, [key]: value }));
    };

    return (
        <JobContext.Provider value={{
            jobs,
            isLoading,
            loadJobs,
            savedJobs,
            saveJob,
            removeJob,
            isSaved,
            preferences,
            updatePreferences,
            jobStatus,
            updateJobStatus,
            statusHistory,
            testResults,
            updateTestResult,
            resetTestResults,
            allTestsPassed,
            submissionLinks,
            updateSubmissionLink
        }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => {
    const context = useContext(JobContext);
    if (context === undefined) {
        throw new Error('useJobs must be used within a JobProvider');
    }
    return context;
};
