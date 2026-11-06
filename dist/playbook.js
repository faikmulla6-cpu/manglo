// Small progressive enhancements. Articles, links and checklists remain readable
// even if JavaScript is blocked; nothing here contacts a server or stores data.
(() => {
  const grid = document.querySelector('#pb-grid');
  if (grid) {
    const buttons = [...document.querySelectorAll('[data-pb-filter]')];
    const cards = [...grid.querySelectorAll('.pb-card')];
    const search = document.querySelector('#pb-search');
    const count = document.querySelector('#pb-results-count');
    const empty = document.querySelector('#pb-no-results');
    let category = 'All topics';

    const update = () => {
      const query = (search?.value || '').trim().toLocaleLowerCase('en');
      let matches = 0;
      for (const card of cards) {
        const allowed = category === 'All topics' || card.dataset.category === category;
        const searchable = card.dataset.search || '';
        const show = allowed && searchable.includes(query);
        card.hidden = !show;
        if (show) matches++;
      }
      count.textContent = `${matches} guide${matches === 1 ? '' : 's'} ${query || category !== 'All topics' ? 'found' : 'to explore'}`;
      empty.hidden = matches > 0;
    };
    buttons.forEach(button => button.addEventListener('click', () => {
      category = button.dataset.pbFilter;
      buttons.forEach(candidate => {
        const active = candidate === button;
        candidate.classList.toggle('active', active);
        candidate.setAttribute('aria-pressed', String(active));
      });
      update();
    }));
    search?.addEventListener('input', update);
    update();
  }

  const progress = document.querySelector('#pb-progress-bar');
  const article = document.querySelector('#pb-article-body');
  if (progress && article) {
    let pending = false;
    const updateProgress = () => {
      const bounds = article.getBoundingClientRect();
      const scrolled = Math.max(0, -bounds.top + 100);
      const travel = Math.max(1, bounds.height - window.innerHeight * .5);
      progress.style.width = `${Math.min(100, Math.round(scrolled / travel * 100))}%`;
      pending = false;
    };
    window.addEventListener('scroll', () => {
      if (!pending) {
        pending = true;
        window.requestAnimationFrame(updateProgress);
      }
    }, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();

    // Keep the table of contents oriented as the reader moves through the
    // article. It is an enhancement only: anchor links work without JS.
    const tocLinks = [...document.querySelectorAll('.pb-toc nav a[href^="#"]')];
    const tocTargets = tocLinks.map(link => document.getElementById(link.getAttribute('href').slice(1)));
    if (tocLinks.length && tocTargets.every(Boolean)) {
      let sectionPending = false;
      const syncSection = () => {
        let activeIndex = 0;
        tocTargets.forEach((target, index) => {
          if (target.getBoundingClientRect().top < 190) activeIndex = index;
        });
        tocLinks.forEach((link, index) => {
          if (index === activeIndex) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
        sectionPending = false;
      };
      const scheduleSection = () => {
        if (!sectionPending) {
          sectionPending = true;
          requestAnimationFrame(syncSection);
        }
      };
      window.addEventListener('scroll', scheduleSection, { passive: true });
      window.addEventListener('resize', scheduleSection);
      syncSection();
    }
  }

  document.querySelector('#pb-copy-link')?.addEventListener('click', async event => {
    const button = event.currentTarget;
    try {
      await navigator.clipboard.writeText(window.location.href);
      button.textContent = 'Link copied ✓';
    } catch {
      button.textContent = 'Copy URL from your address bar';
    }
  });

  const checklist = document.querySelector('[data-playbook-checklist]');
  if (checklist) {
    const boxes = [...checklist.querySelectorAll('input[type="checkbox"]')];
    const count = checklist.querySelector('[data-checklist-count]');
    const updateCount = () => {
      count.textContent = `${boxes.filter(box => box.checked).length} of ${boxes.length} complete`;
    };
    checklist.addEventListener('change', updateCount);
    checklist.querySelector('[data-print-checklist]')?.addEventListener('click', () => window.print());
    updateCount();
  }
})();
