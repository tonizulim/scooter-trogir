/* ============================================
   ScooterTrogir — Main JS
   ============================================ */

// ---- Mobile Nav ----
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

// ---- Scroll Reveal ----
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
}

// ---- Fleet Carousel ----
const fleetScroll = document.getElementById('fleet-scroll');
const btnLeft = document.getElementById('fleet-left');
const btnRight = document.getElementById('fleet-right');
if (fleetScroll) {
  const scroll = (dir) => {
    fleetScroll.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };
  btnLeft && btnLeft.addEventListener('click', () => scroll(-1));
  btnRight && btnRight.addEventListener('click', () => scroll(1));
}

// ---- Tour Filter ----
const filterChips = document.querySelectorAll('.filter-chip');
const tourCards = document.querySelectorAll('.tour-card');
if (filterChips.length && tourCards.length) {
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      tourCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = '';
        } else if (filter === 'few-hours') {
          const dur = card.dataset.duration || '';
          card.style.display = (dur.includes('full') || dur.includes('6') || dur.includes('7') || dur.includes('8') || dur.includes('9')) ? 'none' : '';
        } else if (filter === 'full-day') {
          const dur = card.dataset.duration || '';
          card.style.display = (dur.includes('6') || dur.includes('7') || dur.includes('8') || dur.includes('9') || dur.includes('full')) ? '' : 'none';
        } else if (filter === '50cc') {
          card.style.display = card.dataset.scooter === '50cc' ? '' : 'none';
        } else if (filter === '125cc') {
          card.style.display = card.dataset.scooter !== '50cc' ? '' : 'none';
        }
      });
    });
  });
}

// ---- Active Nav Link ----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar__links a, .navbar__mobile a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});
