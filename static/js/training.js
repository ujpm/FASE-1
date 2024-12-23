// Training module content
const trainingModules = {
    basic: {
        lessons: [
            {
                title: "Safety Assessment",
                content: `
                    <h3>Scene Safety Assessment</h3>
                    <p>Before helping others, ensure your own safety:</p>
                    <ul>
                        <li>Check for environmental hazards</li>
                        <li>Look for dangerous materials or situations</li>
                        <li>Ensure the scene is secure</li>
                    </ul>
                    <div class="mt-3">
                        <img src="/static/images/safety-assessment.jpg" alt="Safety Assessment" class="img-fluid">
                    </div>
                `
            },
            {
                title: "Emergency Calls",
                content: `
                    <h3>Making Emergency Calls</h3>
                    <p>Key information to provide:</p>
                    <ul>
                        <li>Your location (be as specific as possible)</li>
                        <li>Nature of the emergency</li>
                        <li>Number of people affected</li>
                        <li>Your contact information</li>
                    </ul>
                `
            }
        ]
    },
    emergency: {
        lessons: [
            {
                title: "Heart Attack Response",
                content: `
                    <h3>Recognizing and Responding to Heart Attacks</h3>
                    <p>Common symptoms:</p>
                    <ul>
                        <li>Chest pain or pressure</li>
                        <li>Shortness of breath</li>
                        <li>Pain in arms, neck, or jaw</li>
                        <li>Cold sweat</li>
                    </ul>
                    <p>Immediate actions:</p>
                    <ol>
                        <li>Call emergency services immediately</li>
                        <li>Have the person sit or lie down</li>
                        <li>Loosen tight clothing</li>
                        <li>Monitor breathing and consciousness</li>
                    </ol>
                `
            }
        ]
    }
};

let currentModule = null;
let currentLesson = 0;

// Initialize training interface
document.addEventListener('DOMContentLoaded', function() {
    const startButtons = document.querySelectorAll('.start-module');
    const nextButton = document.getElementById('next-lesson');
    const trainingModal = new bootstrap.Modal(document.getElementById('trainingModal'));

    // Handle module start
    startButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moduleId = this.dataset.module;
            startTrainingModule(moduleId);
            trainingModal.show();
        });
    });

    // Handle next lesson
    nextButton.addEventListener('click', function() {
        loadNextLesson();
    });

    // Load saved progress
    loadProgress();
});

// Start a training module
function startTrainingModule(moduleId) {
    currentModule = moduleId;
    currentLesson = 0;
    loadLesson();
}

// Load current lesson
function loadLesson() {
    const module = trainingModules[currentModule];
    if (!module || !module.lessons[currentLesson]) {
        return;
    }

    const lesson = module.lessons[currentLesson];
    const contentDiv = document.getElementById('training-content');
    
    // Add speak button to lesson content
    const speakButton = `
        <button class="btn btn-secondary mt-3" onclick="speakText('${lesson.title}. ${lesson.content}')">
            <i class="fas fa-volume-up"></i> Listen to Lesson
        </button>
    `;
    
    contentDiv.innerHTML = lesson.content + speakButton;

    // Update progress
    updateProgress();
}

// Load next lesson
function loadNextLesson() {
    currentLesson++;
    const module = trainingModules[currentModule];
    
    if (!module || !module.lessons[currentLesson]) {
        // Module complete
        const modal = bootstrap.Modal.getInstance(document.getElementById('trainingModal'));
        modal.hide();
        saveProgress();
        return;
    }

    loadLesson();
}

// Update progress bar
function updateProgress() {
    const module = trainingModules[currentModule];
    if (!module) return;

    const progress = ((currentLesson + 1) / module.lessons.length) * 100;
    const progressBar = document.getElementById('training-progress');
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

// Save progress to localStorage
function saveProgress() {
    const progress = {
        module: currentModule,
        lesson: currentLesson,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('trainingProgress', JSON.stringify(progress));
}

// Load progress from localStorage
function loadProgress() {
    const progress = localStorage.getItem('trainingProgress');
    if (progress) {
        const { module, lesson } = JSON.parse(progress);
        currentModule = module;
        currentLesson = lesson;
        updateProgress();
    }
}

// Text-to-speech functionality
const speechSynthesis = window.speechSynthesis;

function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    }
}
