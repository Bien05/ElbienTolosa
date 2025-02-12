// Enhanced Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    // Hide content initially
    document.body.style.overflow = 'hidden';
    
    // Function to hide loader and show content
    const hideLoader = () => {
        const loader = document.getElementById('loader');
        const body = document.body;
        
        // Add fade-out class to loader
        loader.classList.add('fade-out');
        
        // After fade animation completes
        setTimeout(() => {
            loader.style.display = 'none';
            body.style.overflow = '';
            
            // Trigger entrance animations for content
            document.querySelectorAll('.fade-in').forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            });
        }, 500); // Match this with the CSS transition time
    };

    // Hide loader when everything is loaded
    window.onload = () => {
        // Add a minimum delay to prevent flash on fast connections
        setTimeout(hideLoader, 800);
    };

    // Fallback if loading takes too long
    setTimeout(hideLoader, 5000);
});

// Add fade-in animation class to elements
document.querySelectorAll('section, .portfolio-item').forEach(element => {
    element.classList.add('fade-in');
});

// Initialize fade-in elements
const fadeInElements = document.querySelectorAll('.fade-in');
fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

// Enhanced Navigation Functionality
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    // Function to update active section
    const updateActiveSection = () => {
        let scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Update navbar background based on scroll position
        if (scrollPosition > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    // Smooth scroll to section
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            // Smooth scroll to target
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Update active section on scroll
    window.addEventListener('scroll', updateActiveSection);
    
    // Initial call to set active section
    updateActiveSection();
});

// Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalLiveLink = document.getElementById('modalLiveLink');
    const modalGithubLink = document.getElementById('modalGithubLink');
    const closeModal = document.querySelector('.close-modal');

    // Function to open modal
    function openModal(projectData) {
        modalImage.src = projectData.image;
        modalTitle.textContent = projectData.title;
        modalDescription.textContent = projectData.description;
        modalLiveLink.href = projectData.liveLink;
        modalGithubLink.href = projectData.githubLink;
        
        modal.classList.add('show');
        document.body.classList.add('modal-open');
        
        // Animate modal content
        modal.querySelector('.modal-content').style.animation = 'modalIn 0.3s ease forwards';
    }

    // Function to close modal
    function closeModalFunction() {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'modalOut 0.3s ease forwards';
        
        setTimeout(() => {
            modal.classList.remove('show');
            document.body.classList.remove('modal-open');
            modalContent.style.animation = '';
        }, 300);
    }

    // Event listeners for opening modal
    document.querySelectorAll('.view-project').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectItem = button.closest('.portfolio-item');
            const projectData = {
                image: projectItem.dataset.image,
                title: projectItem.dataset.title,
                description: projectItem.dataset.description,
                liveLink: projectItem.dataset.liveLink,
                githubLink: projectItem.dataset.githubLink
            };
            openModal(projectData);
        });
    });

    // Event listeners for closing modal
    closeModal.addEventListener('click', closeModalFunction);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunction();
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalFunction();
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.modal');
    const modalContent = modal.querySelector('.modal-content');
    
    document.querySelectorAll('.view-project').forEach(button => {
        button.addEventListener('click', function(e) {
            const portfolioItem = this.closest('.portfolio-item');
            if(portfolioItem.dataset.video === 'true') {
                const video = portfolioItem.querySelector('video').cloneNode(true);
                video.muted = false;
                video.controls = true;
                modalContent.innerHTML = '';
                modalContent.appendChild(video);
                video.play();
            }
        });
    });
});
