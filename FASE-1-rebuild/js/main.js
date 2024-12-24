// Module content data
const moduleContent = {
    'heart-attack': {
        title: 'Heart Attack Response',
        sections: [
            {
                title: 'Recognizing Symptoms',
                content: `
                    <ul>
                        <li>Chest pain or pressure</li>
                        <li>Pain in arms, neck, jaw, or back</li>
                        <li>Shortness of breath</li>
                        <li>Cold sweat</li>
                        <li>Nausea</li>
                        <li>Lightheadedness</li>
                    </ul>
                `
            },
            {
                title: 'Immediate Actions',
                content: `
                    <ol>
                        <li>Call emergency services immediately</li>
                        <li>Help the person sit or lie down</li>
                        <li>Loosen any tight clothing</li>
                        <li>Ask if they take heart medication</li>
                        <li>Stay with them until help arrives</li>
                    </ol>
                `
            }
        ]
    },
    'asthma': {
        title: 'Asthma Emergency',
        sections: [
            {
                title: 'Identifying an Asthma Attack',
                content: `
                    <ul>
                        <li>Severe shortness of breath</li>
                        <li>Wheezing when breathing</li>
                        <li>Tight chest</li>
                        <li>Coughing</li>
                        <li>Difficulty speaking</li>
                    </ul>
                `
            },
            {
                title: 'Emergency Response',
                content: `
                    <ol>
                        <li>Help them sit upright</li>
                        <li>Help them use their inhaler if available</li>
                        <li>Keep them calm</li>
                        <li>Open windows for fresh air</li>
                        <li>Call for help if symptoms worsen</li>
                    </ol>
                `
            }
        ]
    },
    'bleeding': {
        title: 'Bleeding Control',
        sections: [
            {
                title: 'Initial Assessment',
                content: `
                    <ul>
                        <li>Identify the source of bleeding</li>
                        <li>Assess severity</li>
                        <li>Check for embedded objects</li>
                        <li>Look for signs of shock</li>
                    </ul>
                `
            },
            {
                title: 'Control Methods',
                content: `
                    <ol>
                        <li>Apply direct pressure with clean cloth</li>
                        <li>Elevate the injured area if possible</li>
                        <li>Use pressure points if necessary</li>
                        <li>Apply bandage firmly but not too tight</li>
                        <li>Monitor for shock symptoms</li>
                    </ol>
                `
            }
        ]
    }
};

// Function to start a training module
function startModule(moduleId) {
    const module = moduleContent[moduleId];
    if (!module) return;

    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'module-modal';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => modal.remove();
    
    // Add title
    const title = document.createElement('h2');
    title.textContent = module.title;
    
    // Add sections
    const sectionsContainer = document.createElement('div');
    module.sections.forEach(section => {
        const sectionElement = document.createElement('div');
        sectionElement.className = 'module-section';
        
        const sectionTitle = document.createElement('h3');
        sectionTitle.textContent = section.title;
        
        const sectionContent = document.createElement('div');
        sectionContent.innerHTML = section.content;
        
        sectionElement.appendChild(sectionTitle);
        sectionElement.appendChild(sectionContent);
        sectionsContainer.appendChild(sectionElement);
    });
    
    // Assemble modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(title);
    modalContent.appendChild(sectionsContainer);
    modal.appendChild(modalContent);
    
    // Add modal to page
    document.body.appendChild(modal);
    
    // Add modal styles dynamically
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .module-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .close-button {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }
        
        .module-section {
            margin: 2rem 0;
        }
        
        .module-section h3 {
            color: var(--secondary-color);
            margin-bottom: 1rem;
        }
        
        .module-section ul, .module-section ol {
            padding-left: 2rem;
        }
        
        .module-section li {
            margin: 0.5rem 0;
        }
    `;
    document.head.appendChild(styleSheet);
}

// Track module progress
class ModuleProgress {
    constructor() {
        this.progress = this.loadProgress();
        this.initializeProgress();
        this.trackScroll();
    }

    loadProgress() {
        const savedProgress = localStorage.getItem('moduleProgress');
        return savedProgress ? JSON.parse(savedProgress) : {};
    }

    saveProgress(moduleId, progress) {
        this.progress[moduleId] = progress;
        localStorage.setItem('moduleProgress', JSON.stringify(this.progress));
        this.updateProgressBar(progress);
    }

    updateProgressBar(progress) {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);
        }
    }

    initializeProgress() {
        const currentModule = this.getCurrentModule();
        if (currentModule) {
            const progress = this.progress[currentModule] || 0;
            this.updateProgressBar(progress);
        }
    }

    getCurrentModule() {
        const path = window.location.pathname;
        const moduleMatch = path.match(/modules\/(\w+)\.html/);
        return moduleMatch ? moduleMatch[1] : null;
    }

    trackScroll() {
        if (!this.getCurrentModule()) return;

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.calculateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    calculateProgress() {
        const sections = document.querySelectorAll('.module-section');
        if (!sections.length) return;

        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        
        let progress = Math.min(Math.round((scrolled / documentHeight) * 100), 100);
        this.saveProgress(this.getCurrentModule(), progress);
    }
}

// Smooth scroll for navigation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize module progress tracking
    new ModuleProgress();

    // Smooth scroll for in-page navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle video playback
    const videoFrames = document.querySelectorAll('iframe[src*="youtube"]');
    videoFrames.forEach(frame => {
        frame.addEventListener('load', () => {
            // Add YouTube API parameters
            if (frame.src.indexOf('enablejsapi=1') === -1) {
                frame.src += (frame.src.indexOf('?') === -1 ? '?' : '&') + 'enablejsapi=1';
            }
        });
    });

    // Handle sidebar navigation highlighting
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link');
    if (sidebarLinks.length) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    sidebarLinks.forEach(link => {
                        if (link.getAttribute('href') === '#' + entry.target.id) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('.module-section').forEach(section => {
            observer.observe(section);
        });
    }
});

// Handle downloads
function handleDownload(event, resourceType) {
    event.preventDefault();
    const currentModule = new ModuleProgress().getCurrentModule();
    
    // Log download activity
    console.log(`Downloading ${resourceType} for module: ${currentModule}`);
    
    // Here you would typically trigger the actual download
    // For now, we'll just show an alert
    alert(`Downloading ${resourceType}... This feature will be implemented soon.`);
}
