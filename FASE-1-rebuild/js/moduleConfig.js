// Module Configuration
const moduleConfig = {
    modules: {
        'cardiac': {
            id: 'cardiac',
            title: 'Cardiac Emergency Response',
            description: 'Learn how to respond to cardiac emergencies effectively',
            prerequisites: [],
            sections: [
                {
                    id: 'introduction',
                    title: 'Introduction to Cardiac Emergencies',
                    type: 'theory'
                },
                {
                    id: 'cpr-basics',
                    title: 'CPR Basics',
                    type: 'theory'
                },
                {
                    id: 'cpr-practice',
                    title: 'CPR Practice',
                    type: 'interactive'
                },
                {
                    id: 'aed-usage',
                    title: 'Using an AED',
                    type: 'theory'
                },
                {
                    id: 'assessment',
                    title: 'Knowledge Assessment',
                    type: 'quiz'
                }
            ],
            quizzes: {
                'final-assessment': {
                    id: 'final-assessment',
                    title: 'Final Assessment',
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
                            correctAnswer: 1
                        },
                        // Add more questions here
                    ]
                }
            }
        },
        // Add more modules here following the same structure
    },

    // Module dependencies and prerequisites
    prerequisites: {
        'advanced-cardiac': ['cardiac'],
        'trauma-response': ['cardiac']
    },

    // Module paths and resources
    resources: {
        'cardiac': {
            path: '/modules/cardiac.html',
            images: {
                'cpr-position': '/images/modules/cardiac/cpr-position.jpg',
                'aed-placement': '/images/modules/cardiac/aed-placement.jpg'
            },
            videos: {
                'cpr-demo': '/videos/modules/cardiac/cpr-demonstration.mp4'
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
    }
};

// Export the configuration and helper
window.moduleConfig = moduleConfig;
window.ModuleHelper = ModuleHelper;
