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
 * Global object for translations
 */
let translations = {};

/**
 * Fetches and applies translations to the page.
 */
async function setLanguage(lang) {
  try {
    const response = await fetch(`./lang/${lang}.json`);
    translations = await response.json();

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key in translations) {
        element.textContent = translations[key];
      }
    });

    // Update innerHTML content (for text with HTML tags like <br>)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      if (key in translations) {
        element.innerHTML = translations[key];
      }
    });

    // Update meta tags for SEO
    document.querySelectorAll('[data-i18n-meta]').forEach(element => {
      const key = element.getAttribute('data-i18n-meta');
      if (key in translations) {
        element.setAttribute('content', translations[key]);
      }
    });

    // Update title tag
    const title = document.querySelector('title');
    if (title && 'title' in translations) {
      title.textContent = translations.title;
    }

    // Update dynamic button texts
    updateButtonTexts();

    // Update 'Read more' link texts
    updateReadMoreLinks();

    // Save selected language to localStorage
    localStorage.setItem('lang', lang);

  } catch (error) {
    console.error('Error loading language file:', error);
  }
}

/**
 * Updates the text for "More/Less" buttons based on the current language.
 */
function updateButtonTexts() {
  document.querySelectorAll('.btm-more span').forEach(span => {
    const isExpanded = span.textContent === translations.less_work;
    span.textContent = isExpanded ? translations.less_work : translations.more_work;
  });

  document.querySelectorAll('.btm-more-licenses span').forEach(span => {
    const isExpanded = span.textContent === translations.less_licenses;
    span.textContent = isExpanded ? translations.less_licenses : translations.more_licenses;
  });

  document.querySelectorAll('.btm-more-courses span').forEach(span => {
    const isExpanded = span.textContent === translations.less_courses;
    span.textContent = isExpanded ? translations.less_courses : translations.more_courses;
  });
}

/**
 * Updates the text for "Read more/less" links based on the current language and state.
 */
function updateReadMoreLinks() {
  readmoreLinks.forEach(link => {
    const readmoreContainer = link.closest('.readmore');
    const isExpanded = readmoreContainer.classList.contains('open');
    link.textContent = isExpanded ? translations.less : translations.see_more;
  });
}

/**
 * 1. "Read more" functionality for Work Experience blocks
 */
const readmoreLinks = document.querySelectorAll('.readmore-link a');

readmoreLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();

    const readmoreContainer = link.closest('.readmore');
    if (!readmoreContainer) return;

    readmoreContainer.classList.toggle('open');

    // Now, update text based on the container's class, not the text content
    const isExpanded = readmoreContainer.classList.contains('open');
    link.textContent = isExpanded ? translations.less : translations.see_more;
  });
});

/**
 * 2. "More" button for hidden Work Experience cards
 */
const btnShowMoreCards = document.querySelector('.btm-more');
const hiddenCards = document.querySelectorAll('.card--hidden');
const chevronIcon = document.getElementById('chevron-icon');

if (btnShowMoreCards) {
  btnShowMoreCards.addEventListener('click', () => {
    hiddenCards.forEach(card => {
      card.classList.toggle('card--hidden');
    });

    if (chevronIcon) {
      chevronIcon.classList.toggle('rotate-icon');
    }

    const buttonText = btnShowMoreCards.querySelector('span');
    if (!buttonText) return;
    const isExpanded = !hiddenCards[0].classList.contains('card--hidden');
    buttonText.textContent = isExpanded ? translations.less_work : translations.more_work;
  });
}

/**
 * 3. "More" button for Licenses and Certificates
 */
const btnShowMoreLicenses = document.querySelector('.btm-more-licenses');
const hiddenLicenses = document.querySelector('.card--hidden-licenses');
const chevronIconLicenses = document.getElementById('chevron-icon-licenses');

if (btnShowMoreLicenses && hiddenLicenses) {
  btnShowMoreLicenses.addEventListener('click', () => {
    hiddenLicenses.classList.toggle('card--hidden-licenses');

    if (chevronIconLicenses) {
      chevronIconLicenses.classList.toggle('rotate-icon');
    }

    const buttonText = btnShowMoreLicenses.querySelector('span');
    if (!buttonText) return;
    const isExpanded = !hiddenLicenses.classList.contains('card--hidden-licenses');
    buttonText.textContent = isExpanded ? translations.less_licenses : translations.more_licenses;
  });
}

/**
 * 4. "More" button for Courses
 */
const btnShowMoreCourses = document.querySelector('.btm-more-courses');
const hiddenCourses = document.querySelector('.card--hidden-courses');
const chevronIconCourses = document.getElementById('chevron-icon-courses');

if (btnShowMoreCourses && hiddenCourses) {
  btnShowMoreCourses.addEventListener('click', () => {
    hiddenCourses.classList.toggle('card--hidden-courses');

    if (chevronIconCourses) {
      chevronIconCourses.classList.toggle('rotate-icon');
    }

    const buttonText = btnShowMoreCourses.querySelector('span');
    if (!buttonText) return;
    const isExpanded = !hiddenCourses.classList.contains('card--hidden-courses');
    buttonText.textContent = isExpanded ? translations.less_courses : translations.more_courses;
  });
}

// Event listeners for language buttons
document.querySelectorAll('.lang-btn').forEach(button => {
  button.addEventListener('click', () => {
    const lang = button.getAttribute('data-lang');
    setLanguage(lang);
  });
});

// Load saved language on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'en'; // Default to English
  setLanguage(savedLang);
});