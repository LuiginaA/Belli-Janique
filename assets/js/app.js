let next = document.getElementById('next');
let prev = document.getElementById('prev');
let carouselTech = document.querySelector('.carousel-tech');
let items = document.querySelectorAll('.carousel-tech .item');
let countItem = items.length;
let active = 0;
let other_1 = 8;
let other_2 = 1;
let autoPlay;
let isMobile = false;

// Check if mobile
function checkMobile() {
    isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Show all items on mobile
        items.forEach(item => {
            item.style.display = 'flex';
            item.classList.remove('active', 'other_1', 'other_2');
        });
        // Stop autoplay on mobile
        clearInterval(autoPlay);
    } else {
        // Desktop: Initialize carousel
        initCarousel();
        startAutoPlay();
    }
}

function initCarousel() {
    // Hide all items first
    items.forEach((item, index) => {
        item.style.display = 'none';
        item.classList.remove('active', 'other_1', 'other_2');
    });
    
    // Show the 3 active items
    if (items[active]) {
        items[active].classList.add('active');
        items[active].style.display = 'block';
    }
    
    if (items[other_1]) {
        items[other_1].classList.add('other_1');
        items[other_1].style.display = 'block';
    }
    
    if (items[other_2]) {
        items[other_2].classList.add('other_2');
        items[other_2].style.display = 'block';
    }
}

if (next) {
    next.onclick = () => {
        if (isMobile) return;
        
        carouselTech.classList.remove('prev');
        carouselTech.classList.add('next');
        
        active = active + 1 >= countItem ? 0 : active + 1;
        other_1 = active - 1 < 0 ? countItem - 1 : active - 1;
        other_2 = active + 1 >= countItem ? 0 : active + 1;
        
        changeSlider();
    }
}

if (prev) {
    prev.onclick = () => {
        if (isMobile) return;
        
        carouselTech.classList.remove('next');
        carouselTech.classList.add('prev');
        
        active = active - 1 < 0 ? countItem - 1 : active - 1;
        other_1 = active + 1 >= countItem ? 0 : active + 1;
        other_2 = other_1 + 1 >= countItem ? 0 : other_1 + 1;
        
        changeSlider();
    }
}

const changeSlider = () => {
    // Remove all classes and hide all items
    items.forEach(item => {
        item.classList.remove('active', 'other_1', 'other_2');
        item.style.display = 'none';
    });

    // Reset animations
    items.forEach(e => {
        const img = e.querySelector('.image img');
        const figcaption = e.querySelector('.image figcaption');
        
        if (img && figcaption) {
            img.style.animation = 'none';
            figcaption.style.animation = 'none';
            void e.offsetWidth; // Trigger reflow
            img.style.animation = '';
            figcaption.style.animation = '';
        }
    });

    // Show and add classes to new active items
    if (items[active]) {
        items[active].classList.add('active');
        items[active].style.display = 'block';
    }
    
    if (items[other_1]) {
        items[other_1].classList.add('other_1');
        items[other_1].style.display = 'block';
    }
    
    if (items[other_2]) {
        items[other_2].classList.add('other_2');
        items[other_2].style.display = 'block';
    }

    // Restart autoplay
    clearInterval(autoPlay);
    startAutoPlay();
}

function startAutoPlay() {
    // Only start autoplay if NOT mobile AND modal is NOT open
    if (!isMobile && !modalOpen) {
        clearInterval(autoPlay); // Clear any existing interval
        autoPlay = setInterval(() => {
            if (next) next.click();
        }, 5000);
    }
}

// Pause autoplay when hovering over carousel (desktop only)
if (carouselTech) {
    carouselTech.addEventListener('mouseenter', () => {
        if (!isMobile) {
            clearInterval(autoPlay);
        }
    });

    // Resume autoplay when mouse leaves carousel (desktop only)
    carouselTech.addEventListener('mouseleave', () => {
        if (!isMobile) {
            startAutoPlay();
        }
    });
}

// Initialize on load
window.addEventListener('load', () => {
    checkMobile();
});

// Check on resize
window.addEventListener('resize', () => {
    checkMobile();
});

// 🔲 MODAL FUNCTIONALITY

const modal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.querySelector('.modal-close');
let modalOpen = false;

// Open modal when "Learn More" is clicked
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('learn-more-btn')) {
        e.stopPropagation(); // Prevent carousel from advancing
        
        const article = e.target.closest('article');
        if (!article) return;
        
        const title = article.querySelector('h2') ? article.querySelector('h2').textContent : '';
        const subtitle = article.querySelector('h4') ? article.querySelector('h4').textContent : '';
        const fullContentDiv = article.querySelector('.full-content');
        const fullContent = fullContentDiv ? fullContentDiv.innerHTML : '';
        
        if (modalTitle) modalTitle.textContent = title;
        if (modalSubtitle) modalSubtitle.textContent = subtitle;
        if (modalDescription) modalDescription.innerHTML = fullContent;
        
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            modalOpen = true;
            
            // STOP AUTOPLAY WHEN MODAL OPENS
            clearInterval(autoPlay);
        }
    }
});

// Close modal when X is clicked
if (modalClose) {
    modalClose.addEventListener('click', function() {
        closeModal();
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal && modal.style.display === 'block') {
        closeModal();
    }
});

// Unified close modal function
function closeModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modalOpen = false;
        
        // RESTART AUTOPLAY WHEN MODAL CLOSES (only on desktop)
        if (!isMobile) {
            startAutoPlay();
        }
    }
}

