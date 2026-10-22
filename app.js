// Minimalist Art Portfolio — Front Page & Oil Painting Gallery Logic
document.addEventListener('DOMContentLoaded', () => {
  const artistName = document.querySelector('.artist-name');
  const scrollTrigger = document.getElementById('scrollTrigger');
  const oilPaintingsSection = document.getElementById('oil-paintings');

  // Load custom name if previously saved (ignoring legacy placeholder)
  const savedName = localStorage.getItem('artist_portfolio_name');
  if (savedName && savedName !== 'Portfolio' && artistName) {
    artistName.textContent = savedName;
  }

  // Save customized name on edit
  if (artistName) {
    artistName.addEventListener('blur', () => {
      const name = artistName.textContent.trim();
      if (name) {
        localStorage.setItem('artist_portfolio_name', name);
      }
    });

    artistName.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        artistName.blur();
      }
    });
  }

  // Smooth scroll down to Oil Painting section when clicking the scroll arrow
  if (scrollTrigger && oilPaintingsSection) {
    scrollTrigger.addEventListener('click', () => {
      oilPaintingsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  // Keep photo visible right down to the oil painting line with subtle parallax only
  const mainHeroImage = document.getElementById('mainHeroImage');
  
  if (mainHeroImage) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      if (scrollY <= heroHeight) {
        const progress = scrollY / heroHeight;
        mainHeroImage.style.transform = `translateY(${progress * 15}px)`;
      }
    }, { passive: true });
  }

  // Lightbox Modal for enlarged view of paintings
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalIndex = document.getElementById('modalIndex');

  const paintingCards = document.querySelectorAll('.free-flow-card, .painting-card');

  paintingCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-src');
      const title = card.getAttribute('data-title');
      const index = card.getAttribute('data-index');

      modalImage.src = src;
      modalTitle.textContent = title;
      modalIndex.textContent = `[ ${index} ]`;

      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });
});
