//service nav button functionality
const serviceButton = document.getElementById('service-button');
const serviceModal = document.querySelector('.services-modal');

serviceButton.addEventListener('mouseenter', () => {
    serviceModal.classList.add('show');
});

serviceButton.addEventListener('mouseleave', (e) => {
    if (!serviceModal.contains(e.relatedTarget)) {
        serviceModal.classList.remove('show');
    }
});

serviceModal.addEventListener('mouseenter', () => {
    serviceModal.classList.add('show');
});

serviceModal.addEventListener('mouseleave', (e) => {
    if (!serviceModal.contains(e.relatedTarget)) {
        serviceModal.classList.remove('show');
    }
});


//make the about me brief blob graphic move with cursor
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -30% 0px'
});

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    })
})

//transform blob home page functionality
const blobHome = document.getElementById('blob-home');

document.addEventListener('mousemove', e => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = blobHome.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const offsetX = (clientX - centerX) * 0.01;
    const offsetY = (clientY - centerY) * 0.01;

    blobHome.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

//hidding navbar functionality
let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY < lastScrollY) {
        navbar.classList.remove('nav-hidden');
    } else {
        if (window.scrollY > 100) {
            navbar.classList.add('nav-hidden');
        }  
    }
    lastScrollY = window.scrollY;
});

//Nav module functionality
const hamburger = document.getElementById('hamburger-menu');
const navModule = document.getElementById('nav-module');
const servicesLink = document.getElementById('services-link');
const navLinks = document.getElementById('nav-links');

const backdrop = document.getElementById('backdrop');

hamburger.addEventListener('click', () => {
    navModule.classList.toggle('show');
    backdrop.classList.toggle('show');
    showMainLinks();
});

backdrop.addEventListener('click', () => {
    navModule.classList.remove('show');
    backdrop.classList.remove('show');
})

const showMainLinks = () => {
    navLinks.classList.add('fade-out');

    navLinks.addEventListener('transitionend', function handler() {
        navLinks.removeEventListener('transitionend', handler);

        navLinks.innerHTML = `
            <h2 id="services-link" class="module-link text-accent">services</h2>
            <a href="about.html"><h2 class="module-link text-accent">about me</h2></a>
            <a href="portfolio.html"><h2 class="module-link text-accent">portfolio</h2></a>
        `;

        document.getElementById('services-link').addEventListener('click', showServiceLinks);

        requestAnimationFrame(() => {
            navLinks.classList.remove('fade-out');
        })
    })
};

const showServiceLinks = () => {
    navLinks.classList.add('fade-out');

    navLinks.addEventListener('transitionend', function handler() {
        navLinks.removeEventListener('transitionend', handler);

        navLinks.innerHTML = `
            <h4 id="back-to-main" class="module-link text-invert">&lt; back</h4>
            <a href="app-design.html"><h2 class="module-link text-accent">app design</h2></a>
            <a href="brand-design.html"><h2 class="module-link text-accent">brand identity</h2></a>
            <a href="web-design.html"><h2 class="module-link text-accent">web design</h2></a>
        `;

        document.getElementById('back-to-main').addEventListener('click', showMainLinks);

        requestAnimationFrame(() => {
            navLinks.classList.remove('fade-out');
        });

    });
};

//setting text for about me description
fetch('src/text/about-me-description.txt')
    .then(response => response.text())
    .then(text => {
        const descriptionElement = document.getElementById('about-me-description');
        descriptionElement.setAttribute('data-description', text);

        const paragraphs = text.split(/\n\s*\n/);

        descriptionElement.innerHTML = '';

        paragraphs.forEach(paragraph => {
            paragraph = paragraph.replace(/\*\*\*(.*?)\*\*\*/g,'<strong><em>$1</em></strong>')
            const p = document.createElement('p');
            p.innerHTML = paragraph.trim();
            descriptionElement.appendChild(p);
        })
    })
    .catch(error => console.error('Error loading description', error));

