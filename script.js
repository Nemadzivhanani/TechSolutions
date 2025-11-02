document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- NEW MOBILE DROPDOWN TOGGLE ---
    document.querySelectorAll('.dropdown > a').forEach(dropbtn => {
        dropbtn.addEventListener('click', function(e) {
            // Check if we are in mobile view
            if (window.innerWidth <= 768) {
                // Only prevent default if it's the main dropdown link
                if (e.target.classList.contains('dropbtn')) {
                    e.preventDefault(); // Stop the link from navigating
                    // Toggle 'active' on the parent <li>
                    this.parentElement.classList.toggle('active');
                }
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);

            fetch('send_email.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert(data.message);
                    contactForm.reset();
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });
    }

    // Service Modal Functionality
    const serviceModal = document.getElementById('serviceModal');
    if (serviceModal) {
        const serviceData = {
            'web-development': {
                title: 'Web Development',
                description: 'Our web development team creates custom websites and web applications that are fast, secure, and scalable.',
                features: ['Responsive design for all devices', 'Secure coding practices', 'Performance optimization', 'SEO-friendly structure']
            },
            'mobile-app': {
                title: 'Mobile App Development',
                description: 'We build native and cross-platform mobile applications that provide seamless user experiences across iOS and Android.',
                features: ['Native iOS and Android development', 'User-centered design', 'Backend integration', 'App store submission']
            },
            'cloud-solutions': {
                title: 'Cloud Solutions',
                description: 'Migrate to the cloud with our comprehensive solutions that optimize your business operations and reduce costs.',
                features: ['Cloud migration strategy', 'Infrastructure as a Service', 'Security and compliance', '24/7 monitoring']
            }
        };

        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', function() {
                const serviceId = this.getAttribute('data-service');
                const service = serviceData[serviceId];
                if (service) {
                    serviceModal.innerHTML = `
                        <div class="service-modal-content">
                            <div class="service-modal-header">
                                <h3>${service.title}</h3>
                                <button class="close-modal">&times;</button>
                            </div>
                            <div class="service-modal-body">
                                <p>${service.description}</p>
                                <h4>What to Expect:</h4>
                                <ul>${service.features.map(f => `<li>${f}</li>`).join('')}</ul>
                            </div>
                        </div>
                    `;
                    serviceModal.classList.add('active');
                }
            });
        });

        serviceModal.addEventListener('click', function(e) {
            if (e.target.classList.contains('service-modal') || e.target.classList.contains('close-modal')) {
                serviceModal.classList.remove('active');
            }
        });
    }
});