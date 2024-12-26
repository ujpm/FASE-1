// Module Configuration
const moduleConfig = {
    modules: {
        'cpr-aed': {
            id: 'cpr-aed',
            title: 'CPR & AED Use',
            description: 'Learn essential life-saving techniques including Cardiopulmonary Resuscitation (CPR) and how to use an Automated External Defibrillator (AED).',
            icon: 'fa-heartbeat',
            difficulty: 'Beginner',
            duration: '2 hours',
            featured: true,
            prerequisites: [],
            topics: [
                'Understanding Sudden Cardiac Arrest',
                'Step-by-step CPR for Adults',
                'CPR for Children and Infants',
                'AED Usage and Safety'
            ]
        },
        'choking': {
            id: 'choking',
            title: 'Choking Response',
            description: 'Master the techniques to help choking victims, including the Heimlich maneuver for different age groups.',
            icon: 'fa-hand-holding-medical',
            difficulty: 'Beginner',
            duration: '1.5 hours',
            featured: true,
            prerequisites: [],
            topics: [
                'Identifying Choking Signs',
                'Heimlich Maneuver Technique',
                'Helping Children and Infants',
                'Post-choking Care'
            ]
        },
        'bleeding-control': {
            id: 'bleeding-control',
            title: 'Severe Bleeding Control',
            description: 'Learn effective techniques to control severe bleeding and prevent hemorrhage-related complications.',
            icon: 'fa-droplet',
            difficulty: 'Intermediate',
            duration: '2 hours',
            featured: true,
            prerequisites: [],
            topics: [
                'Types of Bleeding',
                'Pressure Application Techniques',
                'Tourniquet Usage',
                'Wound Packing'
            ]
        },
        'seizures': {
            id: 'seizures',
            title: 'Seizure Management',
            description: 'Understand how to safely manage seizures and protect the person from injury.',
            icon: 'fa-brain',
            difficulty: 'Intermediate',
            duration: '1.5 hours',
            featured: false,
            prerequisites: [],
            topics: [
                'Types of Seizures',
                'First Aid During Seizures',
                'Post-seizure Care',
                'When to Call Emergency Services'
            ]
        },
        'asthma': {
            id: 'asthma',
            title: 'Asthma Attack Response',
            description: 'Learn to recognize and respond to asthma attacks, including proper inhaler usage.',
            icon: 'fa-lungs',
            difficulty: 'Intermediate',
            duration: '1.5 hours',
            featured: false,
            prerequisites: [],
            topics: [
                'Asthma Attack Signs',
                'Using Inhalers',
                'Breathing Techniques',
                'Emergency Response'
            ]
        },
        'burns': {
            id: 'burns',
            title: 'Burn Care',
            description: 'Handle different types of burns effectively and prevent complications.',
            icon: 'fa-fire',
            difficulty: 'Intermediate',
            duration: '2 hours',
            featured: true,
            prerequisites: [],
            topics: [
                'Types of Burns',
                'Immediate Burn Care',
                'Preventing Infection',
                'When to Seek Medical Help'
            ]
        },
        'fractures': {
            id: 'fractures',
            title: 'Fractures and Sprains',
            description: 'Learn to identify and provide first aid for bone fractures and sprains.',
            icon: 'fa-bone',
            difficulty: 'Intermediate',
            duration: '2 hours',
            featured: true,
            prerequisites: [],
            topics: [
                'Types of Fractures',
                'RICE Method',
                'Splinting Techniques',
                'Transportation Safety'
            ]
        },
        'stroke': {
            id: 'stroke',
            title: 'Stroke Recognition',
            description: 'Learn to quickly recognize stroke symptoms and provide immediate assistance.',
            icon: 'fa-brain',
            difficulty: 'Intermediate',
            duration: '1.5 hours',
            featured: true,
            prerequisites: [],
            topics: [
                'FAST Method',
                'Stroke Signs',
                'Immediate Response',
                'Recovery Position'
            ]
        },
        'childbirth': {
            id: 'childbirth',
            title: 'Emergency Childbirth',
            description: 'Be prepared to assist in emergency childbirth situations outside medical facilities.',
            icon: 'fa-baby',
            difficulty: 'Advanced',
            duration: '3 hours',
            featured: false,
            prerequisites: [],
            topics: [
                'Labor Signs',
                'Delivery Process',
                'Newborn Care',
                'Maternal Care'
            ]
        },
        'poisoning': {
            id: 'poisoning',
            title: 'Poisoning Response',
            description: 'Learn how to respond to different types of poisoning emergencies.',
            icon: 'fa-skull-crossbones',
            difficulty: 'Advanced',
            duration: '2 hours',
            featured: false,
            prerequisites: [],
            topics: [
                'Types of Poisons',
                'Initial Response',
                'Poison Control',
                'Treatment Methods'
            ]
        },
        'environmental': {
            id: 'environmental',
            title: 'Environmental Emergencies',
            description: 'Handle emergencies related to heat, cold, and other environmental factors.',
            icon: 'fa-temperature-high',
            difficulty: 'Intermediate',
            duration: '2 hours',
            featured: false,
            prerequisites: [],
            topics: [
                'Heat Exhaustion',
                'Hypothermia',
                'Altitude Sickness',
                'Water Safety'
            ]
        }
    },

    // Helper functions
    getFeaturedModules() {
        return Object.values(this.modules).filter(module => module.featured);
    },

    getAllModules() {
        return Object.values(this.modules);
    },

    getModule(moduleId) {
        return this.modules[moduleId];
    },

    checkPrerequisites(moduleId) {
        const module = this.modules[moduleId];
        if (!module) return false;
        
        // In a real app, you'd check user's completed modules
        // For now, we'll just return true
        return true;
    }
};

// Export the configuration
window.moduleConfig = moduleConfig;
