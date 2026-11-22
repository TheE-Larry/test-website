// Agency Configuration
const AGENCY_CONFIG = {
  whatsappNumber: "2349015272873",
  agencyName: "ELARRY DZYNS"
};

// Portfolio Data for Lightbox & Details
const portfolioData = {
  "zuri-teaser": {
    title: "Zuri Naturals: Clear Skin, Naturally",
    category: "Campaigns",
    image: "portfolio/zuri-teaser.jpeg",
    description: "Skincare benefit post for Zuri Naturals: a close-up portrait with a leaf accent, a soft cream background and an elegant serif headline."
  },
  "nigeria-66": {
    title: "Nigeria @ 66: Independence Day",
    category: "Social Media",
    image: "portfolio/nigeria-66.jpeg",
    description: "Independence Day post that uses the number 66 as a window into a city skyline."
  },
  "zuri-countdown": {
    title: "Zuri Naturals: 7-Day Countdown",
    category: "Campaigns",
    image: "portfolio/zuri-countdown.jpeg",
    description: "Countdown post with a portrait cut into the numeral 7, building anticipation ahead of launch day."
  },
  "suzion-birthday": {
    title: "Happy Birthday Suzion",
    category: "Social Media",
    image: "portfolio/suzion-birthday.jpeg",
    description: "Birthday feature with glowing script typography and a layered purple background."
  },
  "zuri-shea-butter": {
    title: "Zuri Naturals: Shea Butter Product Ad",
    category: "Campaigns",
    image: "portfolio/zuri-shea-butter.jpeg",
    description: "Product ad with a floating jar, a warm gold glow, and price and benefits laid out so they're easy to scan."
  },
  "kingdom-training": {
    title: "Kingdom Content Creation Training",
    category: "Events & Flyers",
    image: "portfolio/kingdom-training.jpeg",
    description: "Event flyer with the speaker lineup, price, start date and course outline organized in a clear hierarchy."
  },
  "zuri-brand-identity": {
    title: "Zuri Naturals: Brand Identity",
    category: "Brand Identity",
    image: "portfolio/zuri-brand-identity.jpeg",
    description: "Logo and jar packaging for Zuri Naturals, applied across its whole launch campaign."
  }
};

// Initialize When DOM is Ready
document.addEventListener('DOMContentLoaded', () => {
  initPortfolioFilters();
  initPortfolioLightbox();
  initWhatsAppDynamicLinks();
});

/**
 * PORTFOLIO: Category Filtering
 */
function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('is-hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/**
 * PORTFOLIO: Lightbox Modal
 */
function initPortfolioLightbox() {
  const modal = document.getElementById('portfolioModal');
  if (!modal) return;

  const modalClose = modal.querySelector('.modal-close-btn');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalMedia = document.getElementById('modalMedia');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');

  // Open modal on card click
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      const data = portfolioData[projectId];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalCategory.textContent = data.category;
      modalDesc.textContent = data.description;

      // Show full uncropped image
      modalMedia.innerHTML = `<img src="${data.image}" alt="${data.title}">`;

      // WhatsApp link customized to this specific project
      const customMsg = encodeURIComponent(`Hello ${AGENCY_CONFIG.agencyName}, I saw your ${data.title} work and I'd like a similar design.`);
      modalWhatsAppBtn.href = `https://wa.me/${AGENCY_CONFIG.whatsappNumber}?text=${customMsg}`;

      // Show modal
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close handlers
  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/**
 * Pre-filled WhatsApp URLs for Packages
 */
function initWhatsAppDynamicLinks() {
  const packageButtons = document.querySelectorAll('[data-package-name]');
  packageButtons.forEach(btn => {
    const pkgName = btn.getAttribute('data-package-name');
    const msg = encodeURIComponent(`Hello ${AGENCY_CONFIG.agencyName}, I would like to get started with the "${pkgName}" package.`);
    btn.href = `https://wa.me/${AGENCY_CONFIG.whatsappNumber}?text=${msg}`;
  });
}
