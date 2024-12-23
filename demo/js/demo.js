// Demo functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
}

// Emergency reporting functionality
function showEmergencyForm(type) {
    const formHtml = `
        <h3>${type.charAt(0).toUpperCase() + type.slice(1)} Emergency</h3>
        <form id="emergency-report-form" onsubmit="handleEmergencySubmit(event)">
            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" rows="3" required
                    placeholder="Describe the emergency situation..."></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Location</label>
                <div class="input-group">
                    <input type="text" class="form-control" required
                        placeholder="Your location...">
                    <button class="btn btn-outline-secondary" type="button"
                        onclick="getCurrentLocation()">
                        Get Location
                    </button>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Contact Number</label>
                <input type="tel" class="form-control" required
                    placeholder="Your phone number">
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-danger">Submit Report</button>
                <button type="button" class="btn btn-secondary" 
                    onclick="hideEmergencyForm()">Cancel</button>
            </div>
        </form>
    `;

    const formContainer = document.getElementById('emergency-form');
    formContainer.innerHTML = formHtml;
    formContainer.style.display = 'block';
}

function hideEmergencyForm() {
    document.getElementById('emergency-form').style.display = 'none';
}

function handleEmergencySubmit(event) {
    event.preventDefault();
    // In demo, just show success message
    alert('Emergency reported! Help is on the way.');
    hideEmergencyForm();
}

// Training module functionality
function startTraining(moduleType) {
    const trainingContent = getTrainingContent(moduleType);
    document.getElementById('training-content').innerHTML = trainingContent;
    new bootstrap.Modal(document.getElementById('trainingModal')).show();
}

function getTrainingContent(moduleType) {
    const content = {
        basic: `
            <div class="training-module">
                <h4>Basic Life Support</h4>
                <div class="progress mb-3">
                    <div class="progress-bar" role="progressbar" style="width: 0%"></div>
                </div>
                <div class="lesson">
                    <h5>1. Check Response</h5>
                    <p>Learn how to check if a person is responsive:</p>
                    <ul>
                        <li>Ensure the area is safe</li>
                        <li>Check for response by gently shaking shoulders</li>
                        <li>Call out to the person</li>
                    </ul>
                    <button class="btn btn-primary" onclick="nextLesson()">Next</button>
                </div>
            </div>
        `,
        emergency: `
            <div class="training-module">
                <h4>Emergency Response</h4>
                <div class="progress mb-3">
                    <div class="progress-bar" role="progressbar" style="width: 0%"></div>
                </div>
                <div class="lesson">
                    <h5>1. Assess the Situation</h5>
                    <p>Learn how to assess emergency situations:</p>
                    <ul>
                        <li>Identify potential hazards</li>
                        <li>Determine number of casualties</li>
                        <li>Call for professional help</li>
                    </ul>
                    <button class="btn btn-primary" onclick="nextLesson()">Next</button>
                </div>
            </div>
        `,
        advanced: `
            <div class="training-module">
                <h4>Advanced Care</h4>
                <div class="progress mb-3">
                    <div class="progress-bar" role="progressbar" style="width: 0%"></div>
                </div>
                <div class="lesson">
                    <h5>1. Advanced Life Support</h5>
                    <p>Learn advanced life support techniques:</p>
                    <ul>
                        <li>CPR with proper compression technique</li>
                        <li>Using an AED</li>
                        <li>Advanced airway management</li>
                    </ul>
                    <button class="btn btn-primary" onclick="nextLesson()">Next</button>
                </div>
            </div>
        `
    };
    return content[moduleType] || '';
}

function nextLesson() {
    const progressBar = document.querySelector('.progress-bar');
    const currentWidth = parseInt(progressBar.style.width) || 0;
    progressBar.style.width = Math.min(currentWidth + 25, 100) + '%';
}

// Geolocation
function getCurrentLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const locationInput = document.querySelector('input[placeholder="Your location..."]');
            locationInput.value = `${position.coords.latitude}, ${position.coords.longitude}`;
        }, function(error) {
            alert("Could not get your location. Please enter it manually.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Service Worker Registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
