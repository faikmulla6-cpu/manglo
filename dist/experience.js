/* Progressive polish. All page content and navigation work without this file. */
(() => {
  const header = document.querySelector('.mg-site-header');
  const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 16);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  // The search and category controls only filter existing links. No request,
  // analytics event, or customer data leaves the browser.
  const search = document.querySelector('#tool-search');
  const cards = [...document.querySelectorAll('.mg-tool-card[data-group]')];
  if (search && cards.length) {
    let category = 'all';
    const filters = [...document.querySelectorAll('[data-filter]')];
    const status = document.querySelector('#tool-count');
    const empty = document.querySelector('#search-empty');
    function apply() {
      const query = search.value.trim().toLowerCase();
      let found = 0;
      for (const card of cards) {
        const matches = (category === 'all' || card.dataset.group === category)
          && (!query || card.dataset.search.includes(query));
        card.hidden = !matches;
        if (matches) found++;
      }
      if (status) status.textContent = `${found} ${found === 1 ? 'tool' : 'tools'} ${query ? 'found' : 'ready to use'}.`;
      if (empty) empty.hidden = found !== 0;
    }
    filters.forEach(filter => filter.addEventListener('click', () => {
      category = filter.dataset.filter;
      filters.forEach(button => {
        button.classList.toggle('active', button === filter);
        button.setAttribute('aria-pressed', String(button === filter));
      });
      apply();
    }));
    search.addEventListener('input', apply);
    document.querySelector('#clear-search')?.addEventListener('click', () => {
      search.value = '';
      filters.find(button => button.dataset.filter === 'all')?.click();
      search.focus();
    });
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll('.mg-section-intro, .mg-tool-card, .mg-vision-copy, .mg-process-grid > *, .pb-card, .mg-about-block, .mg-policy-content');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('mg-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.05, rootMargin: '0px 0px -18px 0px' });
    targets.forEach(target => { target.classList.add('mg-reveal'); observer.observe(target); });
  }
})();
