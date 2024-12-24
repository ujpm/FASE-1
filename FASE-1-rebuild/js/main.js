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

// Navigation Helpers
function navigateToEmergency() {
    window.location.href = 'emergency.html';
}

function navigateToTraining() {
    window.location.href = 'training.html';
}

// Initialize tooltips and popovers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

// Handle mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
                navbarCollapse.classList.remove('show');
            }
        });
    }
});

// Add active state to current navigation item
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize page-specific features
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavItem();
});

// Page Navigation System
const pages = {
    home: document.getElementById('homePage'),
    emergency: document.getElementById('emergencyPage')
};

function navigateToPage(pageName) {
    // Hide all pages
    Object.values(pages).forEach(page => {
        if (page) page.style.display = 'none';
    });

    // Show requested page
    if (pages[pageName]) {
        pages[pageName].style.display = 'block';
        // Update URL
        history.pushState({ page: pageName }, '', `${pageName}.html`);
    }
}

// Handle browser back/forward
window.addEventListener('popstate', (event) => {
    const pageName = event.state?.page || 'home';
    navigateToPage(pageName);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial page based on URL
    const path = window.location.pathname;
    const pageName = path.includes('emergency') ? 'emergency' : 'home';
    navigateToPage(pageName);
});
