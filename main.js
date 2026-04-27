// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Logic
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.custom-cursor-follower');
const links = document.querySelectorAll('a, button, .service-item, .portfolio-item');

// Detect touch device
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
        // Move inner cursor instantly
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Move follower with a slight delay using GSAP
        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
        follower.style.display = 'block';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        follower.style.display = 'none';
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        link.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

// Force scroll to top on reload
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Preloader & Initial Animations
const tl = gsap.timeline();

window.addEventListener('load', () => {
    // Hide Scrollbar initially
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const loaderObj = { val: 0 };
    
    tl.to('.preloader-logo-text', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out"
    })
    .to(loaderObj, {
        val: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
            document.querySelector('.loader-percentage').innerText = Math.floor(loaderObj.val) + "%";
            document.querySelector('.loader-bar').style.width = loaderObj.val + "%";
        }
    }, "-=0.2")
    .to('.preloader-content', {
        opacity: 0,
        duration: 0.2,
    })
    .to('.preloader', {
        yPercent: -100,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
            document.body.style.overflow = 'auto'; // Restore scroll
        }
    })
    // Hero Animations
    .from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.1")
    .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6")
    .from('.hero-actions', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6");
});

// Sticky Navigation
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll Animations with ScrollTrigger
const revealTexts = document.querySelectorAll('.reveal-text');
revealTexts.forEach(text => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

const revealFades = document.querySelectorAll('.reveal-fade');
revealFades.forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out"
    });
});

const revealUps = document.querySelectorAll('.reveal-up');
revealUps.forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

const revealScales = document.querySelectorAll('.reveal-scale');
revealScales.forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Parallax effect for Hero background glows
gsap.to('.hero-bg-elements', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 100,
    ease: "none"
});

// Counter Animation for Stats
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const target = parseInt(counter.innerText);
    const span = counter.querySelector('span');
    const symbol = span ? span.outerHTML : '';
    
    ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        once: true,
        onEnter: () => {
            gsap.to({ val: 0 }, {
                val: target,
                duration: 2,
                ease: "power3.out",
                onUpdate: function() {
                    counter.innerHTML = Math.floor(this.targets()[0].val) + symbol;
                }
            });
        }
    });
});
