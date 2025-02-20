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
 * 1. "Read more" functionality for Work Experience blocks
 */
const readmoreLinks = document.querySelectorAll('.readmore-link a');

readmoreLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();

    const readmoreContainer = link.closest('.readmore');
    if (!readmoreContainer) return;

    readmoreContainer.classList.toggle('open');

    const currentText = link.textContent.trim();
    link.textContent = (currentText === '...see more') ? 'less' : '...see more';
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
    buttonText.textContent = (buttonText.textContent === 'More') ? 'Less' : 'More';
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
    buttonText.textContent = (buttonText.textContent === 'More') ? 'Less' : 'More';
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
    buttonText.textContent = (buttonText.textContent === 'More') ? 'Less' : 'More';
  });
}
