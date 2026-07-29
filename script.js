// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// Close menu when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section, footer');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Scroll to top button
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
});

// Animate stats counter
const statsSection = document.querySelector('.stats');
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const isDecimal = stat.getAttribute('data-decimal') === 'true';
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
            }
        };

        updateCounter();
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            animateStats();
            statsAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .feature-card, .gallery-item, .contact-item');

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;

        if (isVisible) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.querySelectorAll('.service-card, .feature-card, .gallery-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('KIAAN ETO Website Loaded Successfully!');

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  // Get data from your HTML form
  let formData = {
    "data": [
      {
        "Name": document.getElementById("name").value,
        "Email": document.getElementById("email").value,
        "Message": document.getElementById("message").value
      }
    ]
  };

  // Send it to your Google Sheet
  fetch("YOUR_SHEETDB_API_URL", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => alert("Message sent successfully!"));
});

// Stats Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    const statsSection = document.querySelector('.stats-bar');
    if (!statsSection) return;
    
    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100 && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.dataset.target);
            const suffix = stat.dataset.suffix || '';
            const isDecimal = target % 1 !== 0;
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = target * easeOut;

                if (isDecimal) {
                    stat.textContent = current.toFixed(1) + suffix;
                } else {
                    stat.textContent = Math.floor(current).toLocaleString() + suffix;
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    if (isDecimal) {
                        stat.textContent = target.toFixed(1) + suffix;
                    } else {
                        stat.textContent = target.toLocaleString() + suffix;
                    }
                }
            }
            requestAnimationFrame(updateCounter);
        });
    }
}

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);
