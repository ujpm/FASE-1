class ModuleNavigation {
    constructor() {
        this.currentSection = 'intro';
        this.sections = [];
        this.progressBar = null;
        this.prevButton = null;
        this.nextButton = null;
    }

    initialize() {
        // Get all section IDs from nav links
        this.sections = Array.from(document.querySelectorAll('.nav-link'))
            .map(link => link.getAttribute('href').substring(1));

        // Get UI elements
        this.progressBar = document.getElementById('moduleProgress');
        this.prevButton = document.getElementById('prevSection');
        this.nextButton = document.getElementById('nextSection');

        // Set up navigation event listeners
        this.setupNavigation();
        
        // Initialize first section
        this.showSection(this.currentSection);
    }

    setupNavigation() {
        // Handle nav link clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.showSection(targetId);
            });
        });

        // Handle prev/next buttons
        this.prevButton.addEventListener('click', () => {
            const currentIndex = this.sections.indexOf(this.currentSection);
            if (currentIndex > 0) {
                this.showSection(this.sections[currentIndex - 1]);
            }
        });

        this.nextButton.addEventListener('click', () => {
            const currentIndex = this.sections.indexOf(this.currentSection);
            if (currentIndex < this.sections.length - 1) {
                this.showSection(this.sections[currentIndex + 1]);
            }
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && !this.prevButton.disabled) {
                this.prevButton.click();
            } else if (e.key === 'ArrowRight' && !this.nextButton.disabled) {
                this.nextButton.click();
            }
        });
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.module-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;

            // Update URL hash without scrolling
            history.replaceState(null, null, `#${sectionId}`);
        }

        // Update navigation
        this.updateNavigation(sectionId);
    }

    updateNavigation(sectionId) {
        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });

        // Update buttons
        const currentIndex = this.sections.indexOf(sectionId);
        this.prevButton.disabled = currentIndex === 0;
        this.nextButton.disabled = currentIndex === this.sections.length - 1;

        // Update progress bar
        const progress = ((currentIndex + 1) / this.sections.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }

    // Handle browser back/forward
    handlePopState() {
        const hash = window.location.hash.substring(1);
        if (hash && this.sections.includes(hash)) {
            this.showSection(hash);
        }
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    const moduleNav = new ModuleNavigation();
    moduleNav.initialize();

    // Handle browser back/forward
    window.addEventListener('popstate', () => moduleNav.handlePopState());
});
