/**
 * Paused, Clickable Navigable Dual-Page Brochure Slideshow (2 Images per Screen)
 * Misus Refractories & Allied Industries (MRAI)
 */

export function initBrochureFlipbook(containerId = 'brochure-flipbook') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const totalPages = 16;
  const pageImages = Array.from({ length: totalPages }, (_, i) => `/images/brochure/page-${i + 1}.webp`);

  let currentSpread = 0; // 0 to 7 (8 spreads for 16 pages)
  let currentMobilePage = 1; // 1 to 16

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function mountViewer() {
    container.innerHTML = `
      <div class="brochure-viewer-stage">
        <button class="brochure-nav-btn prev-btn" aria-label="Previous Page">&#10094;</button>
        <button class="brochure-nav-btn next-btn" aria-label="Next Page">&#10095;</button>

        <div class="brochure-spread-box">
          <div class="brochure-spread" id="${containerId}-spread">
            <!-- Dynamic pages rendered here -->
          </div>
        </div>

        <div class="brochure-toolbar">
          <div class="brochure-page-info" id="${containerId}-page-info">
            <!-- Dynamic page info -->
          </div>

          <div class="brochure-actions">
            <button class="btn-icon" id="${containerId}-first-btn" title="First Page">&#124;&#9664;</button>
            <button class="btn-icon" id="${containerId}-last-btn" title="Last Page">&#9654;&#124;</button>
            <a href="/MRAI_Company_Brochure.pdf" download="MRAI_Company_Brochure.pdf" class="btn-download" target="_blank">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download PDF Brochure (8.7 MB)
            </a>
          </div>
        </div>

        <div class="brochure-dots" id="${containerId}-dots"></div>
      </div>
    `;

    renderSpread();
    attachEvents();
  }

  function renderSpread() {
    const spreadEl = document.getElementById(`${containerId}-spread`);
    const infoEl = document.getElementById(`${containerId}-page-info`);
    const dotsEl = document.getElementById(`${containerId}-dots`);
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');

    if (!spreadEl) return;

    if (isMobile()) {
      // Mobile Single Page View
      const pNum = currentMobilePage;
      spreadEl.innerHTML = `
        <div class="brochure-page-card" id="${containerId}-card-mobile" title="Click to view next page">
          <img src="${pageImages[pNum - 1]}" alt="Brochure Page ${pNum}" loading="lazy" />
          <div class="brochure-page-tag">Page ${pNum} of ${totalPages}</div>
        </div>
      `;

      if (infoEl) {
        infoEl.innerHTML = `Showing Page <strong>${pNum}</strong> of ${totalPages}`;
      }

      if (prevBtn) prevBtn.disabled = currentMobilePage <= 1;
      if (nextBtn) nextBtn.disabled = currentMobilePage >= totalPages;

      if (dotsEl) {
        dotsEl.innerHTML = Array.from({ length: totalPages }, (_, i) => `
          <button class="brochure-dot ${i + 1 === currentMobilePage ? 'active' : ''}" data-page="${i + 1}" title="Page ${i + 1}"></button>
        `).join('');
      }

      const mobileCard = document.getElementById(`${containerId}-card-mobile`);
      if (mobileCard) {
        mobileCard.addEventListener('click', () => {
          if (currentMobilePage < totalPages) {
            currentMobilePage++;
            renderSpread();
          }
        });
      }

    } else {
      // Desktop Dual Page View (2 images per screen)
      const leftPageNum = currentSpread * 2 + 1;
      const rightPageNum = currentSpread * 2 + 2;

      spreadEl.innerHTML = `
        <div class="brochure-page-card" id="${containerId}-card-left" title="Page ${leftPageNum} (Click to go previous)">
          <img src="${pageImages[leftPageNum - 1]}" alt="Brochure Page ${leftPageNum}" loading="lazy" />
          <div class="brochure-page-tag">Page ${leftPageNum}</div>
        </div>
        <div class="brochure-page-card" id="${containerId}-card-right" title="Page ${rightPageNum} (Click to go next)">
          <img src="${pageImages[rightPageNum - 1]}" alt="Brochure Page ${rightPageNum}" loading="lazy" />
          <div class="brochure-page-tag">Page ${rightPageNum}</div>
        </div>
      `;

      if (infoEl) {
        infoEl.innerHTML = `Showing Pages <strong>${leftPageNum} &amp; ${rightPageNum}</strong> of ${totalPages} &nbsp;(Spread ${currentSpread + 1} of 8)`;
      }

      if (prevBtn) prevBtn.disabled = currentSpread <= 0;
      if (nextBtn) nextBtn.disabled = currentSpread >= 7;

      if (dotsEl) {
        dotsEl.innerHTML = Array.from({ length: 8 }, (_, i) => `
          <button class="brochure-dot ${i === currentSpread ? 'active' : ''}" data-spread="${i}" title="Pages ${i * 2 + 1} & ${i * 2 + 2}"></button>
        `).join('');
      }

      const leftCard = document.getElementById(`${containerId}-card-left`);
      const rightCard = document.getElementById(`${containerId}-card-right`);

      if (leftCard) {
        leftCard.addEventListener('click', () => {
          if (currentSpread > 0) {
            currentSpread--;
            renderSpread();
          }
        });
      }
      if (rightCard) {
        rightCard.addEventListener('click', () => {
          if (currentSpread < 7) {
            currentSpread++;
            renderSpread();
          }
        });
      }
    }
  }

  function next() {
    if (isMobile()) {
      if (currentMobilePage < totalPages) {
        currentMobilePage++;
        renderSpread();
      }
    } else {
      if (currentSpread < 7) {
        currentSpread++;
        renderSpread();
      }
    }
  }

  function prev() {
    if (isMobile()) {
      if (currentMobilePage > 1) {
        currentMobilePage--;
        renderSpread();
      }
    } else {
      if (currentSpread > 0) {
        currentSpread--;
        renderSpread();
      }
    }
  }

  function attachEvents() {
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');
    const firstBtn = document.getElementById(`${containerId}-first-btn`);
    const lastBtn = document.getElementById(`${containerId}-last-btn`);
    const dotsEl = document.getElementById(`${containerId}-dots`);

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    if (firstBtn) {
      firstBtn.addEventListener('click', () => {
        currentSpread = 0;
        currentMobilePage = 1;
        renderSpread();
      });
    }

    if (lastBtn) {
      lastBtn.addEventListener('click', () => {
        currentSpread = 7;
        currentMobilePage = totalPages;
        renderSpread();
      });
    }

    if (dotsEl) {
      dotsEl.addEventListener('click', (e) => {
        if (e.target.dataset.spread !== undefined) {
          currentSpread = parseInt(e.target.dataset.spread, 10);
          renderSpread();
        } else if (e.target.dataset.page !== undefined) {
          currentMobilePage = parseInt(e.target.dataset.page, 10);
          renderSpread();
        }
      });
    }

    // Keyboard navigation when viewer is visible on screen
    window.addEventListener('keydown', (e) => {
      const rect = container.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });

    // Resize listener to adjust between mobile (1 page) and desktop (2 pages)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        renderSpread();
      }, 150);
    });
  }

  // Mount immediately!
  mountViewer();
}
