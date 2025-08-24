// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initInteractiveFeatures();
    initFestivalCountdown();
    initClothingShowcase();
    initValuesShowcase();
    initAudioPlayer();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Interactive features
function initInteractiveFeatures() {
    // Traditional greeting button
    const greetingButton = document.querySelector('.btn-traditional');
    if (greetingButton) {
        greetingButton.addEventListener('click', showGreeting);
    }

    // Newsletter subscription
    const newsletterBtn = document.querySelector('.btn-newsletter');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', subscribeNewsletter);
    }

    // Image gallery lightbox effect
    const galleryImages = document.querySelectorAll('.gallery-img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            showLightbox(this.src, this.alt);
        });
    });
}

// Festival countdown timer
function initFestivalCountdown() {
    // Set next major festival date (example: New Year)
    const nextFestival = new Date('2025-01-01T00:00:00');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = nextFestival.getTime() - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        // Update countdown display
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        
        // Add animation when countdown changes
        if (daysElement) daysElement.style.transform = 'scale(1.2)';
        if (hoursElement) hoursElement.style.transform = 'scale(1.2)';
        if (minutesElement) minutesElement.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
            if (daysElement) daysElement.style.transform = 'scale(1)';
            if (hoursElement) hoursElement.style.transform = 'scale(1)';
            if (minutesElement) minutesElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Update countdown every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
}

// Clothing showcase functionality
function initClothingShowcase() {
    const clothingItems = document.querySelectorAll('.clothing-item');
    const clothingDetails = document.getElementById('clothing-details');
    
    if (!clothingDetails) return;
    
    const clothingData = {
        kimono: {
            title: 'Kimono (着物)',
            description: 'The kimono is a traditional Japanese garment worn by both men and women. It features a T-shaped, straight-lined robe with collars and long, wide sleeves, secured with a sash called an obi.',
            features: [
                'Made from silk or synthetic materials',
                'Worn for formal occasions and ceremonies',
                'Different patterns and colors for different seasons',
                'Requires specific techniques to wear properly'
            ]
        },
        yukata: {
            title: 'Yukata (浴衣)',
            description: 'A casual summer kimono made of cotton, typically worn during summer festivals and hot spring visits. It\'s lighter and more comfortable than formal kimono.',
            features: [
                'Made from lightweight cotton material',
                'Worn during summer festivals and events',
                'Simpler design than formal kimono',
                'Easy to wear and maintain'
            ]
        },
        hakama: {
            title: 'Hakama (袴)',
            description: 'Traditional Japanese trousers worn over kimono, originally designed for horseback riding. Now commonly worn by martial artists and during formal ceremonies.',
            features: [
                'Worn over kimono as outer garment',
                'Common in martial arts and ceremonies',
                'Seven pleats represent virtues',
                'Available in various colors and patterns'
            ]
        }
    };
    
    clothingItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            clothingItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get clothing type from the item
            const clothingType = this.querySelector('h4').textContent.toLowerCase();
            const data = clothingData[clothingType];
            
            if (data) {
                // Update details section
                clothingDetails.innerHTML = `
                    <h3>${data.title}</h3>
                    <p>${data.description}</p>
                    <ul>
                        ${data.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                `;
                
                // Add animation
                clothingDetails.style.opacity = '0';
                clothingDetails.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    clothingDetails.style.opacity = '1';
                    clothingDetails.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    });
}

// Values showcase functionality
function initValuesShowcase() {
    const valueCircles = document.querySelectorAll('.value-circle');
    const valueDetails = document.getElementById('value-details');
    
    if (!valueDetails) return;
    
    const valuesData = {
        wa: {
            title: '和 (Wa) - Harmony',
            description: 'Wa represents the Japanese concept of harmony, emphasizing peaceful coexistence and group unity. It\'s reflected in social interactions, business practices, and daily life.',
            examples: [
                'Group decision-making processes',
                'Social etiquette and manners',
                'Business relationships',
                'Community cooperation'
            ]
        },
        gaman: {
            title: '我慢 (Gaman) - Endurance',
            description: 'Gaman is the Japanese virtue of persevering through difficult times with patience and dignity. It emphasizes self-control and emotional restraint.',
            examples: [
                'Working through challenges',
                'Maintaining composure under stress',
                'Long-term goal achievement',
                'Resilience in adversity'
            ]
        },
        omotenashi: {
            title: 'おもてなし (Omotenashi) - Hospitality',
            description: 'Omotenashi is the Japanese spirit of selfless hospitality, anticipating guests\' needs and providing exceptional service without expecting anything in return.',
            examples: [
                'Tea ceremony traditions',
                'Customer service excellence',
                'Guest accommodation',
                'Cultural exchange programs'
            ]
        },
        kaizen: {
            title: '改善 (Kaizen) - Continuous Improvement',
            description: 'Kaizen is the philosophy of continuous improvement in all aspects of life, from personal development to business processes and manufacturing.',
            examples: [
                'Workplace efficiency',
                'Personal skill development',
                'Quality management',
                'Innovation processes'
            ]
        }
    };
    
    valueCircles.forEach(circle => {
        circle.addEventListener('click', function() {
            // Get value type from the circle
            const valueType = this.querySelector('span').textContent.split(' ')[0].toLowerCase();
            const data = valuesData[valueType];
            
            if (data) {
                // Update details section
                valueDetails.innerHTML = `
                    <h3>${data.title}</h3>
                    <p>${data.description}</p>
                    <h4>Examples in Practice:</h4>
                    <ul>
                        ${data.examples.map(example => `<li>${example}</li>`).join('')}
                    </ul>
                `;
                
                // Add animation
                valueDetails.style.opacity = '0';
                valueDetails.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    valueDetails.style.opacity = '1';
                    valueDetails.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    });
}

// Audio player functionality
function initAudioPlayer() {
    const audioPlayers = document.querySelectorAll('audio');
    
    audioPlayers.forEach(audio => {
        // Add custom controls styling
        audio.style.width = '100%';
        audio.style.height = '40px';
        
        // Add event listeners for better user experience
        audio.addEventListener('play', function() {
            this.parentElement.style.opacity = '1';
        });
        
        audio.addEventListener('pause', function() {
            this.parentElement.style.opacity = '0.8';
        });
    });
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function playBackgroundMusic() {
    const audio = document.getElementById('background-music');
    if (audio) {
        if (audio.paused) {
            audio.play();
            // Update button text
            const button = event.target.closest('button');
            if (button) {
                button.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
            }
        } else {
            audio.pause();
            // Update button text
            const button = event.target.closest('button');
            if (button) {
                button.innerHTML = '<i class="fas fa-music"></i> Play Traditional Music';
            }
        }
    }
}

function showGreeting() {
    const resultDiv = document.getElementById('greeting-result');
    if (resultDiv) {
        const greetings = [
            'こんにちは (Konnichiwa) - Hello!',
            'おはようございます (Ohayou gozaimasu) - Good morning!',
            'こんばんは (Konbanwa) - Good evening!',
            'ありがとうございます (Arigatou gozaimasu) - Thank you very much!'
        ];
        
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        
        resultDiv.textContent = randomGreeting;
        resultDiv.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            resultDiv.style.display = 'none';
        }, 5000);
    }
}

function showClothingDetails(type) {
    // This function is now handled by initClothingShowcase()
    // Keeping for backward compatibility
}

function showValueDetails(type) {
    // This function is now handled by initValuesShowcase()
    // Keeping for backward compatibility
}

function subscribeNewsletter() {
    const button = event.target;
    const originalText = button.textContent;
    
    // Show loading state
    button.textContent = 'Subscribing...';
    button.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        button.textContent = 'Subscribed!';
        button.classList.remove('loading');
        button.classList.add('success');
        
        // Reset after 3 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('success');
        }, 3000);
    }, 2000);
}

function showLightbox(imageSrc, imageAlt) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
    `;
    
    // Create image element
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 10px;
    `;
    
    // Add to lightbox
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    
    // Close on click
    lightbox.addEventListener('click', function() {
        document.body.removeChild(lightbox);
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.body.contains(lightbox)) {
            document.body.removeChild(lightbox);
        }
    });
}

// Add CSS for lightbox
const lightboxCSS = `
    .lightbox {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

// Inject lightbox CSS
const style = document.createElement('style');
style.textContent = lightboxCSS;
document.head.appendChild(style);

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill for smooth scrolling
    function smoothScrollTo(element, to, duration) {
        const start = element.scrollTop;
        const change = to - start;
        const startTime = performance.now();
        
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }
        
        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            element.scrollTop = start + change * easeInOutQuad(progress);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }
        
        requestAnimationFrame(animateScroll);
    }
    
    // Override scrollIntoView for older browsers
    Element.prototype.scrollIntoView = function(options) {
        if (options && options.behavior === 'smooth') {
            smoothScrollTo(document.documentElement, this.offsetTop, 800);
        } else {
            // Default behavior
            this.scrollIntoView();
        }
    };
}

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    initLazyLoading();
}

// Add loading animation for interactive elements
function addLoadingStates() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('btn-newsletter')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
}

// Initialize loading states
addLoadingStates();

// Add keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Navigate sections with arrow keys
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const sections = Array.from(document.querySelectorAll('.section'));
            const currentSection = sections.find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            });
            
            if (currentSection) {
                const currentIndex = sections.indexOf(currentSection);
                let targetIndex;
                
                if (e.key === 'ArrowDown') {
                    targetIndex = Math.min(currentIndex + 1, sections.length - 1);
                } else {
                    targetIndex = Math.max(currentIndex - 1, 0);
                }
                
                sections[targetIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// Initialize keyboard navigation
initKeyboardNavigation();

// Add touch gestures for mobile
function initTouchGestures() {
    let startY = 0;
    let startX = 0;
    
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
    });
    
    document.addEventListener('touchend', function(e) {
        const endY = e.changedTouches[0].clientY;
        const endX = e.changedTouches[0].clientX;
        const diffY = startY - endY;
        const diffX = startX - endX;
        
        // Swipe up/down for section navigation
        if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
            const sections = Array.from(document.querySelectorAll('.section'));
            const currentSection = sections.find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            });
            
            if (currentSection) {
                const currentIndex = sections.indexOf(currentSection);
                let targetIndex;
                
                if (diffY > 0) { // Swipe up
                    targetIndex = Math.max(currentIndex - 1, 0);
                } else { // Swipe down
                    targetIndex = Math.min(currentIndex + 1, sections.length - 1);
                }
                
                sections[targetIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// Initialize touch gestures if touch is supported
if ('ontouchstart' in window) {
    initTouchGestures();
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.playBackgroundMusic = playBackgroundMusic;
window.showGreeting = showGreeting;
window.showClothingDetails = showClothingDetails;
window.showValueDetails = showValueDetails;
