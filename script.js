(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const languageButton = document.querySelector('.language-toggle');
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  const readPreference = key => {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  };
  const savePreference = (key, value) => {
    try { localStorage.setItem(key, value); } catch (_) { /* Preferences are optional. */ }
  };
  let language = readPreference('homepage-language') === 'en' ? 'en' : 'zh';
  let savedTheme = readPreference('homepage-theme');
  const chineseTitle = document.title;
  const description = document.querySelector('meta[name="description"]');
  const chineseDescription = description.content;

  // Chinese content stays editable in index.html. English translations live here.
  // All translated markup is authored locally; no remote HTML is inserted.
  const translations = [
    ['.skip-link', 'Skip to content'],
    ['.brand-subtitle', 'Personal website'],
    ['nav a[href="#about"]', 'About'],
    ['nav a[href="#publications"]', 'Publications'],
    ['nav a[href="#research"]', 'Research'],
    ['nav a[href="#projects"]', 'Projects'],
    ['nav a[href="#contact"]', 'Contact'],
    ['.profile h1', 'Boyang Cao'],
    ['.english-name', '曹博洋'],
    ['.profile-summary', 'Computer Architecture<br>AI Infrastructure'],
    ['.profile-contact', 'Get in touch <span aria-hidden="true">↗</span>'],
    ['#about-title', 'About Me'],
    ['.intro', 'I study microelectronics at Sichuan University’s School of Physics. My research interests lie in <strong>computer architecture for AI infrastructure</strong>.'],
    ['#about > p:not(.intro)', 'Where does the time go when large models are trained or served: running operators, moving data, or communicating across GPUs? I use these questions to think about how hardware and systems software work together.'],
    ['#education-title', 'Education'],
    ['.education-record:nth-of-type(1) .education-top strong', 'Beihang University'],
    ['.education-record:nth-of-type(1) .education-top > span', '2027 cohort · PhD'],
    ['.education-record:nth-of-type(1) .education-body > p', 'School of Computer Science and Engineering · Computer Science and Engineering'],
    ['.education-record:nth-of-type(2) .education-top strong', 'Sichuan University'],
    ['.education-record:nth-of-type(2) .education-top > span', '2023 cohort · Undergraduate'],
    ['.education-record:nth-of-type(2) .education-body > p', 'School of Physics · Microelectronics Science and Engineering'],
    ['#publications-title', 'Publications'],
    ['#research-title', 'Research Interests'],
    ['.research-list article:nth-child(1) h3', 'GPU & AI Acceleration'],
    ['.research-list article:nth-child(1) p', 'GPU execution models, parallel computing, and dataflow: how AI workloads map onto hardware, and how compute utilization, throughput, and energy efficiency interact.'],
    ['.research-list article:nth-child(2) h3', 'Memory Architecture & Data Movement'],
    ['.research-list article:nth-child(2) p', 'Memory hierarchies, HBM / DDR, and CXL memory expansion. I am interested in model-parameter and KV-cache placement, and how capacity, bandwidth, latency, and data movement affect inference performance.'],
    ['.research-list article:nth-child(3) h3', 'Multi-Accelerator Interconnect & Scaling'],
    ['.research-list article:nth-child(3) p', 'Multi-GPU interconnect topologies, communication patterns, and compute–communication overlap. Through performance modeling and simulation, I aim to investigate scaling bottlenecks and opportunities for architectural and system-level co-design.'],
    ['#projects-title', 'Projects & Experience'],
    ['.project-meta > span:first-child', '2026 · Integrated Circuit Competition'],
    ['.project-meta > span:last-child', 'Team Lead'],
    ['#riscv-project-title', 'RISC-V CPU Design'],
    ['.project-summary', 'Our team implemented a five-stage pipelined processor on an FPGA. I worked on RISC-V instruction extensions and built a toolchain to compile C programs with LLVM/Clang and run them in RTL simulation to verify processor behavior.'],
    ['#contact-title', 'Contact'],
    ['#contact > p', 'I welcome discussions on AI infrastructure, computer architecture, and system performance.'],
    ['.contact-list > div:first-child dt', 'Email'],
    ['footer > a', 'Back to top <span aria-hidden="true">↑</span>'],
  ].map(([selector, en]) => {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Missing translation target: ${selector}`);
    return { element, zh: element.innerHTML, en };
  });

  const attributes = [
    ['.brand', 'aria-label', 'Boyang Cao personal website'],
    ['nav', 'aria-label', 'Main navigation'],
    ['.profile', 'aria-label', 'Profile'],
    ['.avatar img', 'alt', 'Portrait of Boyang Cao'],
    ['.school-emblem[src*="buaa"]', 'alt', 'Beihang University emblem'],
    ['.school-emblem[src*="scu"]', 'alt', 'Sichuan University emblem'],
  ].map(([selector, attribute, en]) => {
    const element = document.querySelector(selector);
    return { element, attribute, zh: element.getAttribute(attribute), en };
  });

  const updateThemeLabel = () => {
    const dark = root.dataset.theme === 'dark';
    themeButton.setAttribute('aria-label', language === 'en'
      ? (dark ? 'Switch to light mode' : 'Switch to dark mode')
      : (dark ? '切换到浅色模式' : '切换到深色模式'));
  };
  const applyTheme = theme => {
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
    updateThemeLabel();
  };
  const applyLanguage = nextLanguage => {
    language = nextLanguage === 'en' ? 'en' : 'zh';
    root.lang = language === 'en' ? 'en' : 'zh-CN';
    translations.forEach(({ element, zh, en }) => { element.innerHTML = language === 'en' ? en : zh; });
    attributes.forEach(({ element, attribute, zh, en }) => { element.setAttribute(attribute, language === 'en' ? en : zh); });
    document.title = language === 'en' ? 'Boyang Cao | Computer Architecture & AI Infrastructure' : chineseTitle;
    description.content = language === 'en' ? 'Boyang Cao: computer architecture for AI infrastructure, GPU acceleration, memory systems, and multi-accelerator interconnects.' : chineseDescription;
    languageButton.setAttribute('aria-pressed', String(language === 'en'));
    languageButton.setAttribute('aria-label', language === 'en' ? 'Switch to Chinese' : '切换到英文');
    updateThemeLabel();
  };

  applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : preference.matches ? 'dark' : 'light');
  applyLanguage(language);
  themeButton.hidden = false;
  languageButton.hidden = false;
  themeButton.addEventListener('click', () => {
    savedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(savedTheme);
    savePreference('homepage-theme', savedTheme);
  });
  languageButton.addEventListener('click', () => {
    applyLanguage(language === 'zh' ? 'en' : 'zh');
    savePreference('homepage-language', language);
  });
  preference.addEventListener('change', event => {
    if (!savedTheme) applyTheme(event.matches ? 'dark' : 'light');
  });
  document.querySelector('#year').textContent = String(new Date().getFullYear());
  const links = [...document.querySelectorAll('nav a')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of links) {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        }
      }
    }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }
})();
