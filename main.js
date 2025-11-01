// main.js
        // Toggle between forms — using class-based selectors so duplicate buttons inside each form container stay in sync
        const donorSection = document.getElementById('become-donor');
        const requestSection = document.getElementById('request');

        // helper to update all toggle buttons' appearance
        function setActiveButtons(showDonor) {
            document.querySelectorAll('.show-donor-btn').forEach(btn => {
                if (showDonor) {
                    btn.classList.add('btn-primary');
                    btn.classList.remove('btn-secondary');
                } else {
                    btn.classList.add('btn-secondary');
                    btn.classList.remove('btn-primary');
                }
            });
            document.querySelectorAll('.show-request-btn').forEach(btn => {
                if (!showDonor) {
                    btn.classList.add('btn-primary');
                    btn.classList.remove('btn-secondary');
                } else {
                    btn.classList.add('btn-secondary');
                    btn.classList.remove('btn-primary');
                }
            });
        }

        function showDonorForm() {
            donorSection.style.display = 'block';
            requestSection.style.display = 'none';
            setActiveButtons(true);
        }

        function showRequestForm() {
            donorSection.style.display = 'none';
            requestSection.style.display = 'block';
            setActiveButtons(false);
        }

        // attach listeners to all toggle buttons (there are duplicates inside each form container)
        document.querySelectorAll('.show-donor-btn').forEach(btn => btn.addEventListener('click', showDonorForm));
        document.querySelectorAll('.show-request-btn').forEach(btn => btn.addEventListener('click', showRequestForm));

        // Initialize the toggle UI to match the visible form on load
        document.addEventListener('DOMContentLoaded', () => {
            showDonorForm();
        });

        // If user clicks nav links, show correct form
        document.querySelectorAll('a[href="#become-donor"]').forEach(link => {
            link.addEventListener('click', (e) => {
                showDonorForm();
            });
        });
        document.querySelectorAll('a[href="#request"]').forEach(link => {
            link.addEventListener('click', (e) => {
                showRequestForm();
            });
        });
        // Loading Screen
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1000);
        });

        // Mobile Menu Toggle
        const mobileMenu = document.getElementById('mobileMenu');
        const navLinks = document.getElementById('navLinks');

        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Animated blood drops in hero
        const bloodDropsContainer = document.getElementById('bloodDrops');
        for (let i = 0; i < 20; i++) {
            const drop = document.createElement('div');
            drop.className = 'drop';
            drop.style.left = Math.random() * 100 + '%';
            drop.style.animationDuration = (Math.random() * 3 + 2) + 's';
            drop.style.animationDelay = Math.random() * 2 + 's';
            bloodDropsContainer.appendChild(drop);
        }

        // Counter animation
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        const runCounter = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(() => runCounter(), 1);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            });
        };

        // Intersection Observer for counter
        const statsSection = document.querySelector('.stats');
        const observerOptions = {
            threshold: 0.5
        };

        let counterRan = false;
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counterRan) {
                    runCounter();
                    counterRan = true;
                }
            });
        }, observerOptions);

        statsObserver.observe(statsSection);

        // Form submission
        const donationForm = document.getElementById('donationForm');
        donationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                bloodType: document.getElementById('bloodType').value,
                date: document.getElementById('date').value,
                location: document.getElementById('location').value,
                message: document.getElementById('message').value
            };

            // Show success message
            alert('Request submitted — registered donors in the specified area have been notified by email. Please watch for responses and contact donors directly to coordinate.');
            donationForm.reset();
        });

        // Smooth scrolling that offsets the fixed navbar height so targets are not hidden behind the header
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navbarEl = document.getElementById('navbar');
                    const navHeight = navbarEl ? navbarEl.offsetHeight : 0;
                    const padding = 12; // small gap below navbar
                    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight - padding;
                    window.scrollTo({ top: targetTop, behavior: 'smooth' });

                    // close mobile menu if open
                    const navLinksEl = document.getElementById('navLinks');
                    if (navLinksEl && navLinksEl.classList.contains('active')) {
                        navLinksEl.classList.remove('active');
                    }
                }
            });
        });

        // Set minimum date for date picker to today
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);

        // Sample Donors Data
        let allDonors = [
            {
                name: "John Anderson",
                bloodType: "O-",
                phone: "+1 (555) 123-4567",
                location: "New York, NY",
                city: "New York"
            },
            {
                name: "Sarah Martinez",
                bloodType: "A+",
                phone: "+1 (555) 234-5678",
                location: "Los Angeles, CA",
                city: "Los Angeles"
            },
            {
                name: "Michael Chen",
                bloodType: "B+",
                phone: "+1 (555) 345-6789",
                location: "Chicago, IL",
                city: "Chicago"
            },
            {
                name: "Emily Johnson",
                bloodType: "AB+",
                phone: "+1 (555) 456-7890",
                location: "Houston, TX",
                city: "Houston"
            },
            {
                name: "David Brown",
                bloodType: "O+",
                phone: "+1 (555) 567-8901",
                location: "Phoenix, AZ",
                city: "Phoenix"
            },
            {
                name: "Lisa Wilson",
                bloodType: "A-",
                phone: "+1 (555) 678-9012",
                location: "Philadelphia, PA",
                city: "Philadelphia"
            },
            {
                name: "James Taylor",
                bloodType: "B-",
                phone: "+1 (555) 789-0123",
                location: "San Antonio, TX",
                city: "San Antonio"
            },
            {
                name: "Maria Garcia",
                bloodType: "AB-",
                phone: "+1 (555) 890-1234",
                location: "San Diego, CA",
                city: "San Diego"
            },
            {
                name: "Robert Lee",
                bloodType: "O-",
                phone: "+1 (555) 901-2345",
                location: "Dallas, TX",
                city: "Dallas"
            },
            {
                name: "Jennifer White",
                bloodType: "A+",
                phone: "+1 (555) 012-3456",
                location: "San Jose, CA",
                city: "San Jose"
            },
            {
                name: "William Harris",
                bloodType: "B+",
                phone: "+1 (555) 123-5678",
                location: "Austin, TX",
                city: "Austin"
            },
            {
                name: "Amanda Clark",
                bloodType: "O+",
                phone: "+1 (555) 234-6789",
                location: "Jacksonville, FL",
                city: "Jacksonville"
            }
        ];

        // Display donors function
        function displayDonors(donors) {
            const donorsGrid = document.getElementById('donorsGrid');
            const noDonors = document.getElementById('noDonors');
            
            if (donors.length === 0) {
                donorsGrid.innerHTML = '';
                noDonors.style.display = 'block';
                return;
            }
            
            noDonors.style.display = 'none';
            donorsGrid.innerHTML = donors.map(donor => {
                const initials = donor.name.split(' ').map(n => n[0]).join('');
                return `
                    <div class="donor-card">
                        <div class="donor-header">
                            <div class="donor-avatar">${initials}</div>
                            <div>
                                <div class="donor-name">${donor.name}</div>
                                <span class="blood-badge">${donor.bloodType}</span>
                            </div>
                        </div>
                        <div class="donor-info">
                            <div class="donor-info-item">
                                <i class="fas fa-phone"></i>
                                <span>${donor.phone}</span>
                            </div>
                            <div class="donor-info-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${donor.location}</span>
                            </div>
                            <div class="donor-info-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Available to donate</span>
                            </div>
                        </div>
                        <button class="contact-donor-btn" onclick="contactDonor('${donor.name}', '${donor.phone}')">
                            <i class="fas fa-phone-alt"></i> Contact Donor
                        </button>
                    </div>
                `;
            }).join('');
        }

        // Initial display of all donors
        displayDonors(allDonors);

        // Search functionality
        document.getElementById('searchBtn').addEventListener('click', () => {
            const bloodType = document.getElementById('searchBloodType').value;
            const location = document.getElementById('searchLocation').value.toLowerCase();
            
            let filteredDonors = allDonors;
            
            if (bloodType) {
                filteredDonors = filteredDonors.filter(donor => donor.bloodType === bloodType);
            }
            
            if (location) {
                filteredDonors = filteredDonors.filter(donor => 
                    donor.location.toLowerCase().includes(location) ||
                    donor.city.toLowerCase().includes(location)
                );
            }
            
            displayDonors(filteredDonors);
        });

        // Contact donor function
        window.contactDonor = function(name, phone) {
            alert(`Contacting ${name}\n\nYou can reach them at: ${phone}\n\nPlease be respectful and explain your blood requirement clearly.`);
        };

        // Donor Registration Form
        const donorRegistrationForm = document.getElementById('donorRegistrationForm');
        donorRegistrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newDonor = {
                name: document.getElementById('donorFirstName').value + ' ' + document.getElementById('donorLastName').value,
                bloodType: document.getElementById('donorBloodType').value,
                phone: document.getElementById('donorPhone').value,
                location: document.getElementById('donorCity').value + ', ' + document.getElementById('donorState').value,
                city: document.getElementById('donorCity').value
            };
            
            // Add to donors list
            allDonors.unshift(newDonor);
            
            // Show success message
            alert('Thank you for registering as a donor! Your information has been added to our donor directory. You may receive email notifications when requests for your blood type are submitted in your area.');
            
            // Reset form
            donorRegistrationForm.reset();
            
            // Scroll to donors section
            document.getElementById('donors').scrollIntoView({ behavior: 'smooth' });
            
            // Refresh donors display
            displayDonors(allDonors);
        });
