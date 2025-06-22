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

