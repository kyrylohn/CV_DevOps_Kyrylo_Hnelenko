/**
 * NodeList.prototype.forEach() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
 */
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

/**
 * Language switching functionality
 */
class LanguageSwitcher {
  constructor() {
    this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
    this.langButtons = document.querySelectorAll('.lang-btn');
    this.body = document.body;

    this.init();
  }

  init() {
    // Set initial language
    this.setLanguage(this.currentLang);

    // Add event listeners to language buttons
    this.langButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetLang = button.getAttribute('data-lang');
        this.setLanguage(targetLang);
      });
    });
  }

  setLanguage(lang) {
    this.currentLang = lang;

    // Update body class
    this.body.classList.toggle('lang-uk', lang === 'uk');

    // Update button states
    this.langButtons.forEach(button => {
      const buttonLang = button.getAttribute('data-lang');
      button.classList.toggle('active', buttonLang === lang);
    });

    // Save to localStorage
    localStorage.setItem('selectedLanguage', lang);

    // Update document language attribute
    document.documentElement.lang = lang;

    // Update page title based on language
    this.updatePageTitle(lang);

    // Dispatch event so dynamic parts can react
    document.dispatchEvent(new Event('languageChanged'));
  }

  updatePageTitle(lang) {
    const titles = {
      en: 'CV DevOps | Kyrylo Hnelenko',
      uk: 'Резюме DevOps | Кирило Гнеленко'
    };
    document.title = titles[lang] || titles.en;
  }
}

/**
 * Universal "More/Less" toggle button initializer
 */
function initToggleButton({ buttonSelector, hiddenSelector, chevronId }) {
  const btn = document.querySelector(buttonSelector);
  const hidden = document.querySelector(hiddenSelector);
  const chevron = chevronId ? document.getElementById(chevronId) : null;

  if (!btn || !hidden) return;

  btn.addEventListener('click', () => {
    hidden.classList.toggle(hiddenSelector.replace('.', ''));

    if (chevron) chevron.classList.toggle('rotate-icon');

    const isExpanded = !hidden.classList.contains(hiddenSelector.replace('.', ''));
    const buttonTextEn = btn.querySelector('span[data-lang="en"]');
    const buttonTextUk = btn.querySelector('span[data-lang="uk"]');

    if (buttonTextEn && buttonTextUk) {
      buttonTextEn.textContent = isExpanded ? 'Less' : 'More';
      buttonTextUk.textContent = isExpanded ? 'Менше' : 'Більше';
    }

    btn.setAttribute('aria-expanded', isExpanded);
  });
}

/**
 * "Read more" functionality (delegated)
 */
document.addEventListener('click', (event) => {
  const link = event.target.closest('.readmore-link a');
  if (!link) return;

  event.preventDefault();
  const readmoreContainer = link.closest('.readmore');
  if (!readmoreContainer) return;

  readmoreContainer.classList.toggle('open');
  const currentLang = document.body.classList.contains('lang-uk') ? 'uk' : 'en';
  const isExpanded = readmoreContainer.classList.contains('open');

  link.textContent = currentLang === 'uk'
    ? (isExpanded ? 'менше' : '...детальніше')
    : (isExpanded ? 'less' : '...see more');

  link.setAttribute('aria-expanded', isExpanded);
});

/**
 * Update dynamic content on language change
 */
function updateDynamicContent() {
  const currentLang = document.body.classList.contains('lang-uk') ? 'uk' : 'en';
  document.querySelectorAll('.readmore-link a').forEach(link => {
    const container = link.closest('.readmore');
    const isExpanded = container?.classList.contains('open');

    link.textContent = currentLang === 'uk'
      ? (isExpanded ? 'менше' : '...детальніше')
      : (isExpanded ? 'less' : '...see more');
  });
}
document.addEventListener('languageChanged', updateDynamicContent);

/**
 * Initialize when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  new LanguageSwitcher();

  // Initialize toggle buttons
  initToggleButton({ buttonSelector: '.btm-more', hiddenSelector: '.card--hidden', chevronId: 'chevron-icon' });
  initToggleButton({ buttonSelector: '.btm-more-licenses', hiddenSelector: '.card--hidden-licenses', chevronId: 'chevron-icon-licenses' });
  initToggleButton({ buttonSelector: '.btm-more-courses', hiddenSelector: '.card--hidden-courses', chevronId: 'chevron-icon-courses' });

  // Ensure readmore text matches current language
  updateDynamicContent();
});
