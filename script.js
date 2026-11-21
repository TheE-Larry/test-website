// Agency Configuration
const AGENCY_CONFIG = {
  whatsappNumber: "2349015272873",
  agencyName: "ELARRY DZYNS"
};

// Portfolio Data for Lightbox & Details
const portfolioData = {
  "brand-lumina": {
    title: "Lumina Fintech Identity",
    category: "Brand Identity",
    tag: "Fintech",
    description: "A sleek, trustworthy visual identity system for a modern payments platform. Includes geometric logo icon, typography rules, brand guidelines, and app iconography.",
    deliverables: "Logo System, Brand Book, App Icons",
    timeline: "5 Days",
    color: "#10b981"
  },
  "social-solaris": {
    title: "Solaris Coffee Campaign",
    category: "Social Media",
    tag: "Social Media",
    description: "High-impact social media campaign for an artisan coffee roastery. Engineered to stop the scroll with appetizing color grading and bold typographic hierarchy.",
    deliverables: "12 Feed Posts, 6 Story Templates",
    timeline: "3 Days",
    color: "#f59e0b"
  },
  "print-botanica": {
    title: "Botanica Skincare Packaging",
    category: "Print & Packaging",
    tag: "Packaging",
    description: "Minimalist, organic product packaging and unboxing experience for an organic skincare product line. Foil-stamped labels and matte paper craft boxes.",
    deliverables: "Label Die-cuts, Outer Box, Finish Specs",
    timeline: "7 Days",
    color: "#06b6d4"
  },
  "brand-apex": {
    title: "Apex Architectural Studio",
    category: "Brand Identity",
    tag: "Architecture",
    description: "Monolithic, structured brand identity for a high-end luxury architectural studio in Abuja. Features architectural grid-inspired logo marks and corporate stationery.",
    deliverables: "Logo Suite, Embossed Stationery, Signage",
    timeline: "6 Days",
    color: "#8b5cf6"
  },
  "social-cyberpulse": {
    title: "CyberPulse Tech Festival",
    category: "Social Media",
    tag: "Event & Promo",
    description: "Electric cyberpunk-inspired promotional flyer and motion-ready banner series for a major tech conference. Built to drive ticket sales across Instagram & Twitter.",
    deliverables: "Event Posters, Speaker Announcements, Banners",
    timeline: "4 Days",
    color: "#ec4899"
  },
  "print-velvet": {
    title: "Velvet Bistro Menu & Cards",
    category: "Print & Packaging",
    tag: "Hospitality",
    description: "Tactile, sophisticated restaurant branding, foil-embossed menus, coasters, and business cards for a premium fine-dining bistro.",
    deliverables: "Foil Menus, Business Cards, Bill Sleeves",
    timeline: "4 Days",
    color: "#e11d48"
  }
};

// Initialize When DOM is Ready
document.addEventListener('DOMContentLoaded', () => {
  initPortfolioFilters();
  initPortfolioLightbox();
  initWhatsAppDynamicLinks();
});

/**
 * FEATURE 1: Portfolio Category Filtering
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
 * FEATURE 1 (cont): Portfolio Lightbox Modal
 */
function initPortfolioLightbox() {
  const modal = document.getElementById('portfolioModal');
  if (!modal) return;

  const modalClose = modal.querySelector('.modal-close-btn');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalDeliverables = document.getElementById('modalDeliverables');
  const modalTimeline = document.getElementById('modalTimeline');
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
      modalDeliverables.textContent = data.deliverables;
      modalTimeline.textContent = data.timeline;

      // Clone preview graphic into modal
      const previewGraphic = card.querySelector('.card-preview').cloneNode(true);
      const overlay = previewGraphic.querySelector('.preview-overlay');
      if (overlay) overlay.remove();
      modalMedia.innerHTML = '';
      modalMedia.appendChild(previewGraphic);

      // WhatsApp link customized to this specific project
      const customMsg = encodeURIComponent(`Hi ${AGENCY_CONFIG.agencyName}, I saw your work on "${data.title}" and I would like something similar for my business.`);
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
 * FEATURE 3: Pre-filled WhatsApp URLs for Packages
 */
function initWhatsAppDynamicLinks() {
  const packageButtons = document.querySelectorAll('[data-package-name]');
  packageButtons.forEach(btn => {
    const pkgName = btn.getAttribute('data-package-name');
    const msg = encodeURIComponent(`Hello ${AGENCY_CONFIG.agencyName}, I would like to get started with the "${pkgName}" package.`);
    btn.href = `https://wa.me/${AGENCY_CONFIG.whatsappNumber}?text=${msg}`;
  });
}
