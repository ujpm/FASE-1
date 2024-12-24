// Module Configuration
const moduleConfig = {
    modules: {
        'cardiac': {
            id: 'cardiac',
            title: 'Cardiac Emergency Response',
            description: 'Learn essential skills for responding to cardiac emergencies, including CPR and AED usage.',
            prerequisites: [],
            estimatedTime: '2 hours',
            difficulty: 'Intermediate',
            sections: [
                {
                    id: 'introduction',
                    title: 'Introduction to Cardiac Emergencies',
                    type: 'theory',
                    content: 'Understanding cardiac emergencies and their signs.'
                },
                {
                    id: 'cpr-basics',
                    title: 'CPR Basics',
                    type: 'theory',
                    content: 'Learn proper CPR techniques and protocols.'
                },
                {
                    id: 'cpr-practice',
                    title: 'CPR Practice',
                    type: 'interactive',
                    content: 'Interactive CPR practice scenarios.'
                },
                {
                    id: 'aed-usage',
                    title: 'Using an AED',
                    type: 'theory',
                    content: 'Learn when and how to use an Automated External Defibrillator.'
                },
                {
                    id: 'assessment',
                    title: 'Knowledge Assessment',
                    type: 'quiz',
                    content: 'Test your understanding of cardiac emergency response.'
                }
            ],
            quizzes: {
                'final-assessment': {
                    id: 'final-assessment',
                    title: 'Final Assessment',
                    passingScore: 80,
                    questions: [
                        {
                            id: 1,
                            question: 'What is the correct compression rate for adult CPR?',
                            options: [
                                '60-80 compressions per minute',
                                '100-120 compressions per minute',
                                '140-160 compressions per minute',
                                '180-200 compressions per minute'
                            ],
                            correctAnswer: 1,
                            explanation: 'The correct rate is 100-120 compressions per minute to ensure effective blood circulation.'
                        },
                        {
                            id: 2,
                            question: 'What is the correct depth for chest compressions in adult CPR?',
                            options: [
                                '1-2 inches',
                                '2-2.4 inches',
                                '3-4 inches',
                                '4-5 inches'
                            ],
                            correctAnswer: 1,
                            explanation: 'Compress at least 2 inches (5 cm) for an average adult.'
                        }
                    ]
                }
            }
        },
        'trauma': {
            id: 'trauma',
            title: 'Trauma Response',
            description: 'Master the skills needed to respond to traumatic injuries effectively.',
            prerequisites: ['basic-life-support'],
            estimatedTime: '3 hours',
            difficulty: 'Advanced',
            sections: [
                {
                    id: 'introduction',
                    title: 'Introduction to Trauma Care',
                    type: 'theory',
                    content: 'Understanding different types of trauma and initial assessment.'
                },
                {
                    id: 'bleeding-control',
                    title: 'Bleeding Control',
                    type: 'theory',
                    content: 'Learn techniques for controlling severe bleeding.'
                },
                {
                    id: 'practical-scenarios',
                    title: 'Practical Scenarios',
                    type: 'interactive',
                    content: 'Practice trauma response through interactive scenarios.'
                }
            ]
        },
        'basic-life-support': {
            id: 'basic-life-support',
            title: 'Basic Life Support',
            description: 'Essential first aid and life support skills every first responder needs.',
            prerequisites: [],
            estimatedTime: '1.5 hours',
            difficulty: 'Beginner',
            sections: [
                {
                    id: 'introduction',
                    title: 'Introduction to BLS',
                    type: 'theory',
                    content: 'Basic principles of life support and first aid.'
                },
                {
                    id: 'assessment',
                    title: 'Patient Assessment',
                    type: 'interactive',
                    content: 'Learn how to assess patients in emergency situations.'
                }
            ]
        }
    },

    // Module dependencies and prerequisites
    prerequisites: {
        'advanced-cardiac': ['cardiac'],
        'trauma': ['basic-life-support']
    },

    // Module paths and resources
    resources: {
        'cardiac': {
            path: '/modules/cardiac/cardiac.html',
            images: {
                'cpr-position': '/modules/cardiac/images/cpr-position.jpg',
                'aed-placement': '/modules/cardiac/images/aed-placement.jpg'
            },
            videos: {
                'cpr-demo': '/modules/cardiac/videos/cpr-demonstration.mp4'
            }
        },
        'trauma': {
            path: '/modules/trauma/trauma.html',
            images: {
                'bleeding-control': '/modules/trauma/images/bleeding-control.jpg',
                'wound-assessment': '/modules/trauma/images/wound-assessment.jpg'
            }
        },
        'basic-life-support': {
            path: '/modules/basic-life-support/basic-life-support.html',
            images: {
                'recovery-position': '/modules/basic-life-support/images/recovery-position.jpg',
                'vital-signs': '/modules/basic-life-support/images/vital-signs.jpg'
            }
        }
    }
};

// Helper functions for module management
const ModuleHelper = {
    isModuleAvailable: function(moduleId, userProgress) {
        const prerequisites = moduleConfig.prerequisites[moduleId] || [];
        return prerequisites.every(preReqId => 
            userProgress[preReqId]?.overallProgress === 100
        );
    },

    getModuleResources: function(moduleId) {
        return moduleConfig.resources[moduleId] || null;
    },

    getModuleData: function(moduleId) {
        return moduleConfig.modules[moduleId] || null;
    },

    getAllModules: function() {
        return Object.keys(moduleConfig.modules).map(moduleId => ({
            id: moduleId,
            ...moduleConfig.modules[moduleId]
        }));
    },

    getNextModule: function(currentModuleId) {
        const modules = this.getAllModules();
        const currentIndex = modules.findIndex(m => m.id === currentModuleId);
        return modules[currentIndex + 1] || null;
    },

    getPreviousModule: function(currentModuleId) {
        const modules = this.getAllModules();
        const currentIndex = modules.findIndex(m => m.id === currentModuleId);
        return modules[currentIndex - 1] || null;
    },

    getDifficultyColor: function(difficulty) {
        const colors = {
            'Beginner': 'success',
            'Intermediate': 'warning',
            'Advanced': 'danger'
        };
        return colors[difficulty] || 'primary';
    }
};

// Export the configuration and helper
window.moduleConfig = moduleConfig;
window.ModuleHelper = ModuleHelper;
