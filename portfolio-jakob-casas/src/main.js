//setting text for about me description
fetch('../text/about-me-description.txt')
    .then(response => response.text())
    .then(text => {
        const descriptionElement = document.getElementById('about-me-description');
        descriptionElement.setAttribute('data-description', text);

        const paragraphs = text.split(/\n\s*\n/);

        descriptionElement.innerHTML = '';

        paragraphs.forEach(paragraph => {
            paragraph = paragraph.replace(/\*\*\*(.*?)\*\*\*/g,'<strong><em>$1</em></strong>')
            const p = document.createElement('p');
            p.textContent = paragraph.trim();
            descriptionElement.appendChild(p);
        })
    })
    .catch(error => console.error('Error loading description', error));