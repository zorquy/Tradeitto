const navbar = document.getElementById('navbar');

function updateNavbarState() {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}

updateNavbarState();
window.addEventListener('scroll', updateNavbarState, { passive: true });

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const buyBtn = document.getElementById('buy-ticket-btn');

function openModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (buyBtn) {
  buyBtn.addEventListener('click', event => {
    const href = buyBtn.getAttribute('href');
    if (href && href !== '#') return;
    event.preventDefault();
    openModal();
  });
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', event => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modalOverlay?.classList.contains('open')) {
    closeModal();
  }
});

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq-question').forEach(item => {
      item.setAttribute('aria-expanded', 'false');
      item.nextElementSibling?.classList.remove('open');
    });

    if (!isOpen) {
      button.setAttribute('aria-expanded', 'true');
      button.nextElementSibling?.classList.add('open');
    }
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
);

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${index * 0.05}s`;
  observer.observe(element);
});
