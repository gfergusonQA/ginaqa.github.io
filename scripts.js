// scripts.js

/// Create a mapping between data-slide values and image filenames
const imageMap = {
    '1': 'assets/images/test-phone.png',
    '2': 'assets/images/test-phone.png',
    '3': 'assets/images/test-phone.png'
    // Add more mappings as needed
};

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

    // Use the mapping to get the correct image filename
    const imageFilename = imageMap[slideIndex];
    if (imageFilename) {
        lightboxImg.src = `images/${imageFilename}`;
    } else {
        console.error('Image not found for slideIndex:', slideIndex);
    }

    lightbox.style.display = 'flex';
}