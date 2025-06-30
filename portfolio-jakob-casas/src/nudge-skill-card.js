//skill card nudge
const skillCardsMobile = document.querySelector('.skill-card-mobile');

const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                skillCardsMobile.classList.add('nudge');

                observer.unobserve(skillCardsMobile);
            }, 2000);
        }
    })
}, {
    threshold: 0.9
});

cardObserver.observe(skillCardsMobile);