document.addEventListener('DOMContentLoaded', function() {
    const emergencyBtn = document.getElementById('emergency-btn');
    const emergencyForm = document.getElementById('emergency-form');
    const reportForm = document.getElementById('report-form');
    const cancelBtn = document.getElementById('cancel-report');
    const getLocationBtn = document.getElementById('get-location');
    const locationInput = document.getElementById('location-input');
    const responseModal = new bootstrap.Modal(document.getElementById('responseModal'));

    // Show emergency form
    emergencyBtn.addEventListener('click', function() {
        emergencyBtn.style.display = 'none';
        emergencyForm.style.display = 'block';
    });

    // Cancel report
    cancelBtn.addEventListener('click', function() {
        emergencyForm.style.display = 'none';
        emergencyBtn.style.display = 'block';
        reportForm.reset();
    });

    // Get location
    getLocationBtn.addEventListener('click', function() {
        if ("geolocation" in navigator) {
            getLocationBtn.disabled = true;
            getLocationBtn.textContent = 'Getting location...';

            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const coords = position.coords;
                    locationInput.value = `${coords.latitude}, ${coords.longitude}`;
                    getLocationBtn.textContent = 'Location Found';
                    
                    // Reverse geocoding using OpenStreetMap Nominatim
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.display_name) {
                                locationInput.value = data.display_name;
                            }
                        })
                        .catch(error => console.error('Error:', error))
                        .finally(() => {
                            getLocationBtn.disabled = false;
                            getLocationBtn.textContent = 'Get My Location';
                        });
                },
                function(error) {
                    console.error("Error getting location:", error);
                    getLocationBtn.disabled = false;
                    getLocationBtn.textContent = 'Get My Location';
                    alert('Could not get your location. Please enter it manually.');
                }
            );
        } else {
            alert('Location services are not available in your browser.');
        }
    });

    // Submit emergency report
    reportForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const emergencyData = {
            type: document.getElementById('emergency-type').value,
            description: document.getElementById('emergency-description').value,
            location: locationInput.value,
            contact: document.getElementById('contact-number').value
        };

        // Show loading state
        const submitBtn = reportForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Report...';

        // Send emergency report
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
                // Update response details
                const responseDetails = document.getElementById('response-details');
                responseDetails.innerHTML = `
                    <div class="alert alert-info">
                        <h6>Emergency Details:</h6>
                        <p><strong>Type:</strong> ${emergencyData.type}</p>
                        <p><strong>Location:</strong> ${emergencyData.location}</p>
                        <p><strong>Reference ID:</strong> ${data.reference || 'N/A'}</p>
                    </div>
                    <div class="alert alert-success">
                        <h6>Next Steps:</h6>
                        <ol>
                            <li>Stay calm and with the patient</li>
                            <li>Keep your phone nearby</li>
                            <li>Follow any first aid procedures you've learned</li>
                            <li>Wait for emergency responders to arrive</li>
                        </ol>
                    </div>
                `;

                // Show response modal
                responseModal.show();

                // Reset form and show emergency button
                reportForm.reset();
                emergencyForm.style.display = 'none';
                emergencyBtn.style.display = 'block';
            } else {
                alert('Error reporting emergency. Please try again or use SMS reporting.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Network error. Please use SMS emergency reporting.');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        });
    });

    // Handle offline functionality
    window.addEventListener('online', function() {
        document.querySelector('.emergency-container').classList.remove('offline');
    });

    window.addEventListener('offline', function() {
        document.querySelector('.emergency-container').classList.add('offline');
    });
});
