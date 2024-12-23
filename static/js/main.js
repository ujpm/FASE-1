// Check if the browser supports service workers for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Geolocation helper function
function getCurrentLocation(callback) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const coordinates = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                callback(null, coordinates);
            },
            error => {
                callback(error, null);
            }
        );
    } else {
        callback(new Error("Geolocation is not supported"), null);
    }
}

// Emergency reporting function
function reportEmergency(type, description) {
    getCurrentLocation((error, coordinates) => {
        if (error) {
            alert("Could not get location. Please describe your location in detail.");
            return;
        }

        const emergencyData = {
            type: type,
            description: description,
            location: `${coordinates.latitude},${coordinates.longitude}`
        };

        fetch('/api/report-emergency', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emergencyData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Emergency reported. Help is on the way!');
            } else {
                alert('Error reporting emergency. Please try again or use SMS.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Network error. Please use SMS emergency reporting.');
        });
    });
}

// Training progress tracking
function updateTrainingProgress(moduleId, progress) {
    fetch('/api/training/progress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            module_id: moduleId,
            progress: progress
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Progress updated:', data);
    })
    .catch(error => {
        console.error('Error updating progress:', error);
    });
}

// Offline content management
function cacheContent(contentId) {
    // Implementation for caching training content offline
    if ('caches' in window) {
        // Cache API implementation
    }
}

// Language selection
function changeLanguage(lang) {
    document.documentElement.lang = lang;
    // Implementation for changing UI language
    // This would typically involve loading different language files
}

// Initialize tooltips and popovers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap components
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
