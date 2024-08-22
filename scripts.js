// scripts.js

document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('click', () => {
        const slideIndex = item.getAttribute('data-slide');
        showLightbox(slideIndex);
    });
});

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
});

function showLightbox(slideIndex) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    // Update the lightbox image based on the slideIndex
    lightboxImg.src = `fullsize${slideIndex}.jpg`; // Adjust according to your image naming

    lightbox.style.display = 'flex';
}
