(() => {
  const STORAGE_KEY = 'portfolio_theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function toggleTheme() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  function toggleMobileMenu() {
    const btn = document.querySelector('.nav__toggle');
    const links = document.querySelector('#nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  function setupIntersectionEffects() {
    const items = document.querySelectorAll('.card, .chipcard, .callout');
    if (!items.length) return;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    items.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
    });

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.style.transition = 'opacity .4s ease, transform .4s ease';
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1 }
    );

    items.forEach((el) => obs.observe(el));
  }

  function setupSectionTransitions() {
    const sections = document.querySelectorAll('.sec');
    if (!sections.length) return;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      sections.forEach(s => s.classList.add('visible'));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        }
      },
      { threshold: 0.1 }
    );

    sections.forEach((el) => obs.observe(el));
  }

  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;

      switch(e.key) {
        case '1':
          document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case '2':
          document.querySelector('#projetos')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case '3':
          document.querySelector('#habilidades')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case '4':
          document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 't':
        case 'T':
          const current = document.documentElement.dataset.theme || 'dark';
          const next = current === 'dark' ? 'light' : 'dark';
          applyTheme(next);
          break;
      }
    });
  }

  function init() {
    applyTheme(getPreferredTheme());
    toggleTheme();
    toggleMobileMenu();
    setupIntersectionEffects();
    setupSectionTransitions();
    setupKeyboardShortcuts();
  }

  init();
})();
