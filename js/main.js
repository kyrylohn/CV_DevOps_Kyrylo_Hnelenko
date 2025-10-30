/**
 * CV DevOps - Optimized Main JavaScript
 * Author: Kyrylo Hnelenko
 * Description: Main functionality for CV website with hamburger menu, contact form, and interactive elements
 */

/* ==========================================================================
   Configuration Constants
   ========================================================================== */

const CONFIG = {
  TELEGRAM: {
    BOT_TOKEN: '8472754597:AAHCkQVxbosnVu6RM0U4HyL63DWlurjEziY',
    CHAT_ID: '-4896754848',
    API_URL: 'https://api.telegram.org/bot'
  },
  SELECTORS: {
    // Readmore functionality
    readmoreLinks: '.readmore-link a',
    readmoreContainers: '.readmore',
    
    // More buttons
    btnShowMore: '.btm-more',
    btnShowMoreLicenses: '.btm-more-licenses',
    btnShowMoreCourses: '.btm-more-courses',
    
    // Hidden content
    hiddenCards: '.card--hidden',
    hiddenLicenses: '.card--hidden-licenses',
    hiddenCourses: '.card--hidden-courses',
    
    // Icons
    chevronIcon: '#chevron-icon',
    chevronIconLicenses: '#chevron-icon-licenses',
    chevronIconCourses: '#chevron-icon-courses',
    
    // Hamburger menu
    hamburgerToggle: '.hamburger-toggle',
    hamburgerMenu: '.hamburger-menu',
    langOptions: '.lang-option',
    themeOptions: '.theme-option',
    
    // Contact form
    contactFormToggle: '.contact-form-toggle',
    contactFormModal: '.contact-form-modal',
    contactFormClose: '.contact-form-close',
    contactForm: '#contactForm',
    formStatus: '#formStatus'
  },
  CLASSES: {
    active: 'active',
    open: 'open',
    darkTheme: 'dark-theme',
    rotateIcon: 'rotate-icon'
  },
  STORAGE_KEYS: {
    theme: 'theme',
    language: 'cv-language'
  },
  ANIMATIONS: {
    duration: 300,
    easing: 'ease-in-out'
  }
};

/* ==========================================================================
   Utility Functions
   ========================================================================== */

/**
 * Polyfill for NodeList.forEach()
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
 * Utility functions for DOM manipulation and common operations
 */
const Utils = {
  /**
   * Safe querySelector that returns null if not found
   */
  qs: (selector, parent = document) => parent.querySelector(selector),

  /**
   * Safe querySelectorAll that returns empty NodeList if not found
   */
  qsa: (selector, parent = document) => parent.querySelectorAll(selector),

  /**
   * Add event listener with error handling
   */
  addEvent: (element, event, handler, options = {}) => {
    if (!element) {
      console.warn(`Element not found for event: ${event}`);
      return;
    }
    
    try {
      element.addEventListener(event, handler, options);
    } catch (error) {
      console.error(`Error adding event listener: ${error.message}`);
    }
  },

  /**
   * Toggle class with optional force parameter
   */
  toggleClass: (element, className, force) => {
    if (!element) return false;
    return element.classList.toggle(className, force);
  },

  /**
   * Debounce function to limit rapid function calls
   */
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Get browser information from user agent
   */
  getBrowserInfo: (userAgent = navigator.userAgent) => {
    let browser = 'Unknown';
    
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
      browser = 'Chrome';
    } else if (userAgent.includes('Firefox')) {
      browser = 'Firefox';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      browser = 'Safari';
    } else if (userAgent.includes('Edg')) {
      browser = 'Edge';
    } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
      browser = 'Opera';
    }
    
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    return `${browser}${isMobile ? ' (Mobile)' : ' (Desktop)'}`;
  },

  /**
   * Validate email address
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Sanitize input to prevent XSS
   */
  sanitizeInput: (input) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }
};

/* ==========================================================================
   Core Application Class
   ========================================================================== */

class CVApp {
  constructor() {
    this.visitorData = {};
    this.isInitialized = false;
    
    // Bind methods to maintain context
    this.handleReadmoreClick = this.handleReadmoreClick.bind(this);
    this.handleMoreButtonClick = this.handleMoreButtonClick.bind(this);
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleContactFormSubmit = this.handleContactFormSubmit.bind(this);
    
    this.init();
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      await this.waitForDOM();
      
      this.initReadmoreFunctionality();
      this.initMoreButtons();
      this.initHamburgerMenu();
      this.initContactForm();
      this.initTheme();
      
      // Initialize visitor tracking after a delay
      setTimeout(() => this.initVisitorTracking(), 1000);
      
      this.isInitialized = true;
      console.log('CV App initialized successfully');
    } catch (error) {
      console.error('Failed to initialize CV App:', error);
    }
  }

  /**
   * Wait for DOM to be ready
   */
  waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      } else {
        resolve();
      }
    });
  }

  /* ========================================================================
     Readmore Functionality
     ======================================================================== */

  initReadmoreFunctionality() {
    const readmoreLinks = Utils.qsa(CONFIG.SELECTORS.readmoreLinks);
    
    readmoreLinks.forEach(link => {
      Utils.addEvent(link, 'click', this.handleReadmoreClick);
    });
  }

  handleReadmoreClick(event) {
    event.preventDefault();
    
    const link = event.target;
    const readmoreContainer = link.closest('.readmore');
    
    if (!readmoreContainer) return;

    Utils.toggleClass(readmoreContainer, CONFIG.CLASSES.open);
    
    const isOpen = readmoreContainer.classList.contains(CONFIG.CLASSES.open);
    const currentText = link.textContent.trim();
    
    // Update text based on current language
    if (window.i18n) {
      link.textContent = isOpen ? window.i18n.t('ui.less') : window.i18n.t('ui.seeMore');
    } else {
      link.textContent = isOpen ? 'less' : '...see more';
    }
  }

  /* ========================================================================
     More Buttons Functionality
     ======================================================================== */

  initMoreButtons() {
    this.initMoreButton(CONFIG.SELECTORS.btnShowMore, CONFIG.SELECTORS.hiddenCards, CONFIG.SELECTORS.chevronIcon);
    this.initMoreButton(CONFIG.SELECTORS.btnShowMoreLicenses, CONFIG.SELECTORS.hiddenLicenses, CONFIG.SELECTORS.chevronIconLicenses);
    this.initMoreButton(CONFIG.SELECTORS.btnShowMoreCourses, CONFIG.SELECTORS.hiddenCourses, CONFIG.SELECTORS.chevronIconCourses);
  }

  initMoreButton(buttonSelector, hiddenSelector, iconSelector) {
    const button = Utils.qs(buttonSelector);
    const hiddenElements = hiddenSelector.includes('card--hidden-') ? 
      Utils.qs(hiddenSelector) : Utils.qsa(hiddenSelector);
    const icon = Utils.qs(iconSelector);

    if (!button) return;

    Utils.addEvent(button, 'click', () => {
      this.handleMoreButtonClick(hiddenElements, icon, button);
    });
  }

  handleMoreButtonClick(hiddenElements, icon, button) {
    const buttonText = button.querySelector('span');
    if (!buttonText) return;

    const isExpanded = buttonText.textContent.trim() === 'Less' || 
                     buttonText.textContent.trim() === 'Менше';

    // Toggle visibility
    if (NodeList.prototype.isPrototypeOf(hiddenElements)) {
      // Multiple elements (cards)
      hiddenElements.forEach(element => {
        Utils.toggleClass(element, 'card--hidden');
      });
    } else {
      // Single element (licenses/courses)
      const className = hiddenElements.classList.contains('card--hidden-licenses') ? 
        'card--hidden-licenses' : 'card--hidden-courses';
      Utils.toggleClass(hiddenElements, className);
    }

    // Toggle icon rotation
    if (icon) {
      Utils.toggleClass(icon, CONFIG.CLASSES.rotateIcon);
    }

    // Update button text
    if (window.i18n) {
      buttonText.textContent = isExpanded ? window.i18n.t('ui.more') : 'Less';
    } else {
      buttonText.textContent = isExpanded ? 'More' : 'Less';
    }
  }

  /* ========================================================================
     Hamburger Menu Functionality
     ======================================================================== */

  initHamburgerMenu() {
    const hamburgerToggle = Utils.qs(CONFIG.SELECTORS.hamburgerToggle);
    const hamburgerMenu = Utils.qs(CONFIG.SELECTORS.hamburgerMenu);

    if (!hamburgerToggle || !hamburgerMenu) return;

    // Toggle menu
    Utils.addEvent(hamburgerToggle, 'click', this.handleHamburgerClick);

    // Close menu when clicking outside
    Utils.addEvent(document, 'click', this.handleDocumentClick);

    // Initialize language selection
    this.initLanguageSelection();

    // Initialize theme toggle
    this.initThemeToggle();
  }

  handleHamburgerClick(event) {
    event.stopPropagation();
    
    const hamburgerMenu = Utils.qs(CONFIG.SELECTORS.hamburgerMenu);
    const hamburgerToggle = Utils.qs(CONFIG.SELECTORS.hamburgerToggle);
    
    Utils.toggleClass(hamburgerMenu, CONFIG.CLASSES.active);
    Utils.toggleClass(hamburgerToggle, CONFIG.CLASSES.active);
  }

  handleDocumentClick(event) {
    const hamburgerMenu = Utils.qs(CONFIG.SELECTORS.hamburgerMenu);
    const hamburgerToggle = Utils.qs(CONFIG.SELECTORS.hamburgerToggle);
    
    if (hamburgerMenu && !hamburgerMenu.contains(event.target)) {
      hamburgerMenu.classList.remove(CONFIG.CLASSES.active);
      if (hamburgerToggle) {
        hamburgerToggle.classList.remove(CONFIG.CLASSES.active);
      }
    }
  }

  initLanguageSelection() {
    const langOptions = Utils.qsa(CONFIG.SELECTORS.langOptions);
    
    langOptions.forEach(option => {
      Utils.addEvent(option, 'click', (e) => {
        e.preventDefault();
        
        const selectedLang = option.getAttribute('data-lang');
        
        // Update active state
        langOptions.forEach(opt => opt.classList.remove(CONFIG.CLASSES.active));
        option.classList.add(CONFIG.CLASSES.active);
        
        // Switch language if i18n is available
        if (window.i18n) {
          window.i18n.switchLanguage(selectedLang);
        }
      });
    });
  }

  initThemeToggle() {
    const themeOptions = Utils.qsa(CONFIG.SELECTORS.themeOptions);
    const currentTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.theme) || 'light';
    
    // Apply saved theme on load
    this.applyTheme(currentTheme);
    
    themeOptions.forEach(option => {
      Utils.addEvent(option, 'click', () => {
        const selectedTheme = option.getAttribute('data-theme');
        
        // Update active state
        themeOptions.forEach(opt => opt.classList.remove(CONFIG.CLASSES.active));
        option.classList.add(CONFIG.CLASSES.active);
        
        // Apply and save theme
        this.applyTheme(selectedTheme);
        localStorage.setItem(CONFIG.STORAGE_KEYS.theme, selectedTheme);
      });
    });
  }

  initTheme() {
    const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.theme) || 'light';
    this.applyTheme(savedTheme);
    
    // Update active theme option
    const themeOptions = Utils.qsa(CONFIG.SELECTORS.themeOptions);
    themeOptions.forEach(opt => {
      opt.classList.toggle(CONFIG.CLASSES.active, 
        opt.getAttribute('data-theme') === savedTheme);
    });
  }

  applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add(CONFIG.CLASSES.darkTheme);
    } else {
      document.body.classList.remove(CONFIG.CLASSES.darkTheme);
    }
  }

  /* ========================================================================
     Contact Form Functionality
     ======================================================================== */

  initContactForm() {
    const contactFormToggle = Utils.qs(CONFIG.SELECTORS.contactFormToggle);
    const contactFormModal = Utils.qs(CONFIG.SELECTORS.contactFormModal);
    const contactFormClose = Utils.qs(CONFIG.SELECTORS.contactFormClose);
    const contactForm = Utils.qs(CONFIG.SELECTORS.contactForm);

    if (!contactFormToggle || !contactFormModal) return;

    // Open contact form
    Utils.addEvent(contactFormToggle, 'click', (e) => {
      e.stopPropagation();
      this.openContactForm();
    });

    // Close contact form
    if (contactFormClose) {
      Utils.addEvent(contactFormClose, 'click', () => this.closeContactForm());
    }

    // Close on backdrop click
    Utils.addEvent(contactFormModal, 'click', (e) => {
      if (e.target === contactFormModal) {
        this.closeContactForm();
      }
    });

    // Close on Escape key
    Utils.addEvent(document, 'keydown', (e) => {
      if (e.key === 'Escape' && contactFormModal.classList.contains(CONFIG.CLASSES.active)) {
        this.closeContactForm();
      }
    });

    // Handle form submission
    if (contactForm) {
      Utils.addEvent(contactForm, 'submit', this.handleContactFormSubmit);
    }
  }

  openContactForm() {
    const contactFormModal = Utils.qs(CONFIG.SELECTORS.contactFormModal);
    contactFormModal.classList.add(CONFIG.CLASSES.active);
    document.body.style.overflow = 'hidden';
  }

  closeContactForm() {
    const contactFormModal = Utils.qs(CONFIG.SELECTORS.contactFormModal);
    const contactForm = Utils.qs(CONFIG.SELECTORS.contactForm);
    const formStatus = Utils.qs(CONFIG.SELECTORS.formStatus);
    
    contactFormModal.classList.remove(CONFIG.CLASSES.active);
    document.body.style.overflow = '';
    
    // Clear form and status after animation completes
    setTimeout(() => {
      if (contactForm) contactForm.reset();
      if (formStatus) {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }
    }, CONFIG.ANIMATIONS.duration);
  }

  async handleContactFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const formFields = {
      name: formData.get('name')?.trim() || '',
      email: formData.get('email')?.trim() || '',
      message: formData.get('message')?.trim() || ''
    };

    // Validation
    const validationResult = this.validateContactForm(formFields);
    if (!validationResult.isValid) {
      this.showFormStatus('error', validationResult.message);
      return;
    }

    // Sanitize inputs
    Object.keys(formFields).forEach(key => {
      formFields[key] = Utils.sanitizeInput(formFields[key]);
    });

    // Show sending status
    this.showFormStatus('sending', 'Sending message...');
    
    // Disable submit button
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    this.setSubmitButtonState(submitBtn, true, 'Sending...');

    try {
      const success = await this.sendMessage(formFields);
      
      if (success) {
        this.showFormStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
        setTimeout(() => this.closeContactForm(), 2000);
      } else {
        this.showFormStatus('error', 'Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      this.showFormStatus('error', 'Failed to send message. Please try again later.');
    } finally {
      this.setSubmitButtonState(submitBtn, false, originalText);
    }
  }

  validateContactForm({ name, email, message }) {
    if (!name || !email || !message) {
      return { isValid: false, message: 'Please fill in all fields' };
    }
    
    if (!Utils.isValidEmail(email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }
    
    if (name.length < 2) {
      return { isValid: false, message: 'Name must be at least 2 characters long' };
    }
    
    if (message.length < 10) {
      return { isValid: false, message: 'Message must be at least 10 characters long' };
    }

    return { isValid: true };
  }

  setSubmitButtonState(button, disabled, text) {
    if (!button) return;
    
    button.disabled = disabled;
    button.textContent = text;
  }

  showFormStatus(type, message) {
    const formStatus = Utils.qs(CONFIG.SELECTORS.formStatus);
    if (!formStatus) return;
    
    formStatus.className = `form-status ${type}`;
    formStatus.textContent = message;
  }

  async sendMessage({ name, email, message }) {
    // Create Telegram message
    const telegramMessage = this.createTelegramMessage(name, email, message);
    
    // Skip sending if tokens are not configured (demo mode)
    if (CONFIG.TELEGRAM.BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || 
        CONFIG.TELEGRAM.CHAT_ID === 'YOUR_CHAT_ID_HERE') {
      console.log('Telegram notification (demo mode):', telegramMessage);
      return true;
    }
    
    return this.sendTelegramMessage(telegramMessage);
  }

  createTelegramMessage(name, email, message) {
    const timestamp = new Date().toLocaleString('uk-UA');
    
    return `📧 Нове повідомлення з сайту CV!

👤 Ім'я: ${name}
📧 Email: ${email}

💬 Повідомлення:
${message}

🕐 Час: ${timestamp}`;
  }

  async sendTelegramMessage(message) {
    try {
      const url = `${CONFIG.TELEGRAM.API_URL}${CONFIG.TELEGRAM.BOT_TOKEN}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CONFIG.TELEGRAM.CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      });
      
      if (!response.ok) {
        console.error('Failed to send Telegram message:', response.statusText);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error sending Telegram message:', error);
      return false;
    }
  }

  /* ========================================================================
     Visitor Tracking
     ======================================================================== */

  async initVisitorTracking() {
    try {
      await this.getVisitorData();
      await this.sendPageLoadNotification();
    } catch (error) {
      console.error('Visitor tracking error:', error);
    }
  }

  async getVisitorData() {
    try {
      const response = await fetch('https://ipapi.co/json/', {
        timeout: 5000 // 5 second timeout
      });
      
      if (!response.ok) throw new Error('Failed to fetch visitor data');
      
      const data = await response.json();
      
      this.visitorData = {
        ip: data.ip || 'Unknown',
        city: data.city || 'Unknown',
        country: data.country_name || 'Unknown',
        region: data.region || 'Unknown',
        timezone: data.timezone || 'Unknown'
      };
    } catch (error) {
      console.error('Error fetching visitor data:', error);
      this.visitorData = {
        ip: 'Unknown',
        city: 'Unknown',
        country: 'Unknown',
        region: 'Unknown',
        timezone: 'Unknown'
      };
    }
  }

  async sendPageLoadNotification() {
    const browserInfo = Utils.getBrowserInfo();
    const timestamp = new Date().toLocaleString('uk-UA');
    
    const message = `📄 Сторінку відкрито!
<pre>
🌐 Браузер: ${browserInfo}
🌐 IP: ${this.visitorData.ip}
🌐 Локація: ${this.visitorData.city}, ${this.visitorData.country}
</pre>
🕐 Час: ${timestamp}`;
    
    await this.sendTelegramMessage(message);
  }
}

/* ==========================================================================
   Application Initialization
   ========================================================================== */

// Initialize application when DOM is ready
let cvApp;

const initializeApp = () => {
  if (!cvApp) {
    cvApp = new CVApp();
  }
};

// Multiple initialization methods for reliability
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp, { once: true });
} else {
  initializeApp();
}

// Backup initialization
window.addEventListener('load', () => {
  if (!cvApp?.isInitialized) {
    initializeApp();
  }
}, { once: true });

// Export for potential external usage
window.CVApp = CVApp;