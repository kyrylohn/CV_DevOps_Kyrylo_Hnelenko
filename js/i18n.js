/**
 * CV DevOps - Optimized Internationalization (i18n)
 * Author: Kyrylo Hnelenko  
 * Description: Complete internationalization system with English and Ukrainian support
 */

/* ==========================================================================
   I18n Configuration
   ========================================================================== */

const I18N_CONFIG = {
  SUPPORTED_LANGUAGES: ['en', 'uk'],
  DEFAULT_LANGUAGE: 'en',
  STORAGE_KEY: 'cv-language',
  SELECTORS: {
    // Meta tags
    title: 'title',
    metaDescription: 'meta[name="description"]',
    ogTitle: 'meta[property="og:title"]', 
    ogDescription: 'meta[property="og:description"]',
    
    // Main content
    profession: '.profession',
    name: '.name',
    intro: '.about-me-container section p',
    
    // Section titles
    aboutMeTitles: '.about-me-title',
    
    // Sidebar
    techSkillsTitle: 'h3',
    
    // Language skills
    languageSection: '.language',
    languageSpans: '.language span:not(.bar span)',
    
    // UI elements
    readmoreLinks: '.readmore-link a',
    moreButtons: '.btm-more span, .btm-more-licenses span, .btm-more-courses span',
    
    // Menu elements
    menuItems: '[data-translate]',
    langOptions: '.lang-option',
    themeOptions: '[data-theme] span',
    
    // Contact form
    contactElements: '[data-translate^="contact"]',
    contactForm: '#contactForm',
    submitButton: '.btn-submit',
    
    // Education
    educationSection: '.education',
    universityLink: '.education .university',
    facultyElement: '.education h4',
    dateElement: '.education .date',
    
    // Work experience
    workCards: '.readmore'
  }
};

/* ==========================================================================
   Translation Data
   ========================================================================== */

const TRANSLATIONS = {
  en: {
    meta: {
      title: "CV DevOps | Kyrylo Hnelenko",
      description: "Experienced Senior DevOps Engineer with 5+ years in automation, CI/CD, and cloud infrastructure. Proficient in VMware vCenter, Docker, Kubernetes, GitLab CI/CD, and networking."
    },
    sidebar: {
      techSkills: "Tech Skills",
      softSkills: "Soft Skills", 
      languages: "Languages",
      downloadPdf: "Download PDF"
    },
    main: {
      profession: "Senior DevOps Engineer",
      name: "Kyrylo Hnelenko",
      intro: "Experienced Senior DevOps Engineer with 5+ years in automation, CI/CD, and cloud infrastructure.<br />Proficient in VMware vCenter, Docker, Kubernetes, GitLab CI/CD, and networking.<br />Strong expertise in Linux systems, database management, and security optimization.<br /><br />Focused on automation, scalability, security, and reliability in modern DevOps workflows.",
      workExperience: "Work Experience",
      education: "Education", 
      licensesAndCertificates: "Licenses and Certificates",
      courses: "Courses"
    },
    workExperience: {
      positions: [
        {
          title: "Senior DevOps Engineer",
          date: "Apr 2025 – Present",
          description: "• Managing and optimizing infrastructure on VMware vCenter<br>• Ensuring CI/CD automation and efficient deployment processes<br>• Configuring and maintaining DNS, network security, and load balancing<br>• Administering databases and financial services<br>• Monitoring and troubleshooting systems with Grafana, Prometheus<br>• Securing infrastructure<br>• Leading DevOps initiatives and mentoring team members"
        },
        {
          title: "Middle DevOps Engineer",
          date: "Jul 2024 – Apr 2025",
          description: "• Managing and optimizing infrastructure on VMware vCenter<br>• Ensuring CI/CD automation and efficient deployment processes<br>• Configuring and maintaining DNS, network security, and load balancing<br>• Administering databases and financial services<br>• Monitoring and troubleshooting systems with Grafana, Prometheus<br>• Securing infrastructure"
        },
        {
          title: "Middle DevOps Engineer", 
          date: "Sep 2023 – Jul 2024",
          description: "• Choosing and configuring AWS cloud services<br>• Designing and implementing a microservices architecture<br>• Setting up CI/CD pipelines<br>• Maintaining and optimizing the infrastructure<br>• Training and consulting"
        },
        {
          title: "Middle DevOps Engineer",
          date: "Mar 2022 – Mar 2023", 
          description: "• DevOps solutions development and implementation<br>• Technical support to other engineers<br>• Troubleshooting technical issues<br>• Participation in software development<br>• Cloud resource optimization<br>• Documentation"
        },
        {
          title: "Junior DevOps Engineer",
          date: "Jun 2021 – Mar 2022",
          description: "• Participating in basic infrastructure tasks and configurations.<br>• Assisting in monitoring system performance and taking basic actions based on alerts.<br>• Contributing to the documentation of processes and procedures.<br>• Participating in the maintenance of software and systems."
        },
        {
          title: "System Administrator",
          date: "Feb 2021 – Jun 2021", 
          description: "• Remote administration of office equipment, telephony<br>• Error-free operation of Windows OS, Windows Server, 1C<br>• Data backup & recovery<br>• Technical support & assistance<br>• Working with Active Directory"
        },
        {
          title: "Tier 2-3 Technical Support",
          date: "Aug 2020 – Oct 2020",
          description: "• Service Desk, user accounts, customer support<br>• Cooperation with 1C programmers, telecom providers<br>• LAN troubleshooting<br>• Working with ARP, TCP/IP, DHCP, DNS"
        },
        {
          title: "System Administrator", 
          date: "Mar 2019 – Aug 2020",
          description: "• Implementation and support of IT infrastructures<br>• Administration of Windows Servers (AD, DHCP, Backup)<br>• VMware ESXi (basic config, maintenance)<br>• Managing LAN, portable devices"
        },
        {
          title: "Chief Telecommunications Department",
          date: "Mar 2016 – Mar 2019",
          description: ""
        },
        {
          title: "Senior Engineer",
          date: "Oct 2015 – Mar 2016", 
          description: ""
        }
      ]
    },
    education: {
      university: "Koledzh Radioelektroniky Dnipro Ukraine",
      faculty: "Faculty of Radio Engineering",
      date: "Sep 2010 – Jun 2014"
    },
    ui: {
      seeMore: "...see more",
      less: "less",
      more: "More",
      languageSwitch: "Switch to Ukrainian"
    },
    menu: {
      language: "Language",
      theme: "Theme",
      light: "Light", 
      dark: "Dark",
      contact: "Send Message",
      downloadPdf: "Download PDF"
    },
    contact: {
      title: "Send me a message",
      name: "Name",
      email: "Email",
      message: "Message", 
      send: "Send Message"
    },
    languageSkills: {
      german: "Deutsch A1 Elementary",
      french: "Français A1 Elementary",
      english: "English B1 Intermediate",
      ukrainian: "Ukrainian Native",
      russian: "Russian Trying to forget"
    }
  },
  uk: {
    meta: {
      title: "CV DevOps | Кирило Гнеленко",
      description: "Досвідчений Senior DevOps інженер з 5+ роками досвіду в автоматизації, CI/CD та хмарній інфраструктурі. Володію VMware vCenter, Docker, Kubernetes, GitLab CI/CD та мережевими технологіями."
    },
    sidebar: {
      techSkills: "Технічні навички",
      softSkills: "Особисті навички",
      languages: "Мови",
      downloadPdf: "Завантажити PDF"
    },
    main: {
      profession: "Senior DevOps Інженер",
      name: "Кирило Гнеленко",
      intro: "Досвідчений Senior DevOps інженер з 5+ роками досвіду в автоматизації, CI/CD та хмарній інфраструктурі.<br />Володію VMware vCenter, Docker, Kubernetes, GitLab CI/CD та мережевими технологіями.<br />Сильна експертиза в Linux системах, управлінні базами даних та оптимізації безпеки.<br /><br />Зосереджений на автоматизації, масштабованості, безпеці та надійності в сучасних DevOps процесах.",
      workExperience: "Досвід роботи",
      education: "Освіта",
      licensesAndCertificates: "Ліцензії та сертифікати", 
      courses: "Курси"
    },
    workExperience: {
      positions: [
        {
          title: "Senior DevOps Інженер",
          date: "Кві 2025 – Дотепер",
          description: "• Управління та оптимізація інфраструктури на VMware vCenter<br>• Забезпечення автоматизації CI/CD та ефективних процесів розгортання<br>• Налаштування та підтримка DNS, мережевої безпеки та балансування навантаження<br>• Адміністрування баз даних та фінансових сервісів<br>• Моніторинг та усунення неполадок систем за допомогою Grafana, Prometheus<br>• Забезпечення безпеки інфраструктури<br>• Керівництво DevOps ініціативами та менторство команди"
        },
        {
          title: "Middle DevOps Інженер",
          date: "Лип 2024 – Кві 2025",
          description: "• Управління та оптимізація інфраструктури на VMware vCenter<br>• Забезпечення автоматизації CI/CD та ефективних процесів розгортання<br>• Налаштування та підтримка DNS, мережевої безпеки та балансування навантаження<br>• Адміністрування баз даних та фінансових сервісів<br>• Моніторинг та усунення неполадок систем за допомогою Grafana, Prometheus<br>• Забезпечення безпеки інфраструктури"
        },
        {
          title: "Middle DevOps Інженер",
          date: "Вер 2023 – Лип 2024",
          description: "• Вибір та налаштування хмарних сервісів AWS<br>• Проектування та впровадження мікросервісної архітектури<br>• Налаштування CI/CD пайплайнів<br>• Підтримка та оптимізація інфраструктури<br>• Навчання та консультування"
        },
        {
          title: "Middle DevOps Інженер",
          date: "Бер 2022 – Бер 2023",
          description: "• Розробка та впровадження DevOps рішень<br>• Технічна підтримка інших інженерів<br>• Усунення технічних проблем<br>• Участь у розробці програмного забезпечення<br>• Оптимізація хмарних ресурсів<br>• Документування"
        },
        {
          title: "Junior DevOps Інженер",
          date: "Чер 2021 – Бер 2022",
          description: "• Участь у базових завданнях інфраструктури та конфігураціях<br>• Допомога в моніторингу продуктивності системи та виконанні базових дій на основі сповіщень<br>• Внесок у документування процесів та процедур<br>• Участь у підтримці програмного забезпечення та систем"
        },
        {
          title: "Системний адміністратор",
          date: "Лют 2021 – Чер 2021", 
          description: "• Віддалене адміністрування офісного обладнання, телефонії<br>• Безперебійна робота Windows OS, Windows Server, 1C<br>• Резервне копіювання та відновлення даних<br>• Технічна підтримка та допомога<br>• Робота з Active Directory"
        },
        {
          title: "Технічна підтримка Tier 2-3",
          date: "Сер 2020 – Жов 2020",
          description: "• Service Desk, облікові записи користувачів, підтримка клієнтів<br>• Співпраця з програмістами 1C, телекомунікаційними провайдерами<br>• Усунення неполадок LAN<br>• Робота з ARP, TCP/IP, DHCP, DNS"
        },
        {
          title: "Системний адміністратор",
          date: "Бер 2019 – Сер 2020",
          description: "• Впровадження та підтримка IT інфраструктур<br>• Адміністрування Windows Servers (AD, DHCP, Backup)<br>• VMware ESXi (базова конфігурація, обслуговування)<br>• Управління LAN, портативними пристроями"
        },
        {
          title: "Начальник відділу телекомунікацій",
          date: "Бер 2016 – Бер 2019",
          description: ""
        },
        {
          title: "Провідний інженер", 
          date: "Жов 2015 – Бер 2016",
          description: ""
        }
      ]
    },
    education: {
      university: "Коледж радіоелектроніки Дніпро Україна",
      faculty: "Факультет радіотехніки",
      date: "Вер 2010 – Чер 2014"
    },
    ui: {
      seeMore: "...детальніше",
      less: "менше",
      more: "Більше",
      languageSwitch: "Перемкнути на англійську"
    },
    menu: {
      language: "Мова",
      theme: "Тема",
      light: "Світла",
      dark: "Темна", 
      contact: "Надіслати повідомлення",
      downloadPdf: "Завантажити PDF"
    },
    contact: {
      title: "Надішліть мені повідомлення",
      name: "Ім'я", 
      email: "Email",
      message: "Повідомлення",
      send: "Надіслати повідомлення"
    },
    languageSkills: {
      german: "Німецька A1 Початковий",
      french: "Французька A1 Початковий",
      english: "Англійська B1 Середній",
      ukrainian: "Українська Рідна",
      russian: "Російська Намагаюся забути"
    }
  }
};

/* ==========================================================================
   I18n Class Implementation
   ========================================================================== */

class I18n {
  constructor() {
    this.currentLanguage = I18N_CONFIG.DEFAULT_LANGUAGE;
    this.defaultLanguage = I18N_CONFIG.DEFAULT_LANGUAGE;
    this.translations = TRANSLATIONS;
    this.observers = new Set();
    
    // Performance optimization: cache frequently used elements
    this.elementCache = new Map();
    
    this.initializeLanguage();
    this.init();
  }

  /* ========================================================================
     Initialization Methods
     ======================================================================== */

  /**
   * Initialize language based on localStorage or browser preference
   */
  initializeLanguage() {
    const savedLanguage = localStorage.getItem(I18N_CONFIG.STORAGE_KEY);
    
    if (savedLanguage && I18N_CONFIG.SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      this.currentLanguage = savedLanguage;
    } else {
      // Detect browser language preference
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('uk')) {
        this.currentLanguage = 'uk';
      } else {
        this.currentLanguage = I18N_CONFIG.DEFAULT_LANGUAGE;
      }
    }
  }

  /**
   * Initialize the i18n system
   */
  init() {
    this.cacheElements();
    this.updateContent();
    this.initializeLanguageSwitch();
    
    // Observe DOM changes for dynamic content
    this.observeDOM();
    
    console.log(`I18n initialized with language: ${this.currentLanguage}`);
  }

  /**
   * Cache frequently accessed DOM elements for performance
   */
  cacheElements() {
    const selectors = Object.entries(I18N_CONFIG.SELECTORS);
    
    selectors.forEach(([key, selector]) => {
      try {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          this.elementCache.set(key, elements);
        }
      } catch (error) {
        console.warn(`Failed to cache elements for selector: ${selector}`, error);
      }
    });
  }

  /**
   * Set up DOM mutation observer for dynamic content
   */
  observeDOM() {
    if (!window.MutationObserver) return;

    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if any added nodes contain translatable content
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE && 
                node.querySelector && 
                node.querySelector('[data-translate]')) {
              shouldUpdate = true;
            }
          });
        }
      });
      
      if (shouldUpdate) {
        // Debounce updates to avoid excessive recalculation
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(() => {
          this.cacheElements();
          this.updateContent();
        }, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /* ========================================================================
     Core Translation Methods
     ======================================================================== */

  /**
   * Get translation by key path with fallback support
   * @param {string} keyPath - Dot-separated key path (e.g., 'main.profession')
   * @param {Object} interpolations - Variables to interpolate in translation
   * @returns {string} - Translated text or key if not found
   */
  t(keyPath, interpolations = {}) {
    const keys = keyPath.split('.');
    let value = this.translations[this.currentLanguage];
    
    // Navigate through the translation object
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        // Fallback to default language
        value = this.translations[this.defaultLanguage];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            console.warn(`Translation not found: ${keyPath}`);
            return keyPath; // Return key if translation not found
          }
        }
        break;
      }
    }
    
    // Handle interpolations
    if (typeof value === 'string' && Object.keys(interpolations).length > 0) {
      value = this.interpolate(value, interpolations);
    }
    
    return value || keyPath;
  }

  /**
   * Interpolate variables in translation strings
   * @param {string} text - Text with placeholders like {{variable}}
   * @param {Object} variables - Variables to interpolate
   * @returns {string} - Interpolated text
   */
  interpolate(text, variables) {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables.hasOwnProperty(key) ? variables[key] : match;
    });
  }

  /**
   * Switch language and update all content
   * @param {string} language - Target language code
   */
  switchLanguage(language) {
    if (!I18N_CONFIG.SUPPORTED_LANGUAGES.includes(language)) {
      console.error('Unsupported language:', language);
      return false;
    }

    const previousLanguage = this.currentLanguage;
    this.currentLanguage = language;
    
    try {
      localStorage.setItem(I18N_CONFIG.STORAGE_KEY, language);
      this.updateContent();
      this.notifyObservers(language, previousLanguage);
      
      console.log(`Language switched from ${previousLanguage} to ${language}`);
      return true;
    } catch (error) {
      console.error('Failed to switch language:', error);
      this.currentLanguage = previousLanguage; // Rollback
      return false;
    }
  }

  /**
   * Get current language
   * @returns {string} - Current language code
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Get available languages
   * @returns {Array<string>} - Array of supported language codes
   */
  getAvailableLanguages() {
    return [...I18N_CONFIG.SUPPORTED_LANGUAGES];
  }

  /* ========================================================================
     Content Update Methods  
     ======================================================================== */

  /**
   * Update all translatable content on the page
   */
  updateContent() {
    try {
      this.updateMetaTags();
      this.updateMainContent();
      this.updateSidebarContent();
      this.updateWorkExperience();
      this.updateEducation();
      this.updateUIElements();
      this.updateMenuElements();
      this.updateContactForm();
      
      // Update HTML lang attribute
      document.documentElement.lang = this.currentLanguage;
      
    } catch (error) {
      console.error('Error updating content:', error);
    }
  }

  /**
   * Update meta tags for SEO
   */
  updateMetaTags() {
    document.title = this.t('meta.title');
    
    const metaElements = [
      { selector: 'meta[name="description"]', attr: 'content', key: 'meta.description' },
      { selector: 'meta[property="og:title"]', attr: 'content', key: 'meta.title' },
      { selector: 'meta[property="og:description"]', attr: 'content', key: 'meta.description' }
    ];
    
    metaElements.forEach(({ selector, attr, key }) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attr, this.t(key));
      }
    });
  }

  /**
   * Update main content sections
   */
  updateMainContent() {
    this.updateElement('.profession', this.t('main.profession'));
    this.updateElement('.name', this.t('main.name'));
    this.updateElement('.about-me-container section p', this.t('main.intro'), true);
    
    // Update section titles
    const sectionTitles = document.querySelectorAll('.about-me-title');
    const titleKeys = ['main.workExperience', 'main.education', 'main.licensesAndCertificates', 'main.courses'];
    
    sectionTitles.forEach((title, index) => {
      if (titleKeys[index]) {
        title.textContent = this.t(titleKeys[index]);
      }
    });
  }

  /**
   * Update sidebar content
   */
  updateSidebarContent() {
    // Update Tech Skills title
    const techSkillsTitle = document.querySelector('.tech-skills-container h3');
    if (techSkillsTitle) {
      techSkillsTitle.textContent = this.t('sidebar.techSkills');
    }
    
    // Update Soft Skills title
    const softSkillsTitle = document.querySelector('.soft-skills-container h3');
    if (softSkillsTitle) {
      softSkillsTitle.textContent = this.t('sidebar.softSkills');
    }
    
    // Update Languages title
    const languagesTitle = document.querySelector('.language h3');
    if (languagesTitle) {
      languagesTitle.textContent = this.t('sidebar.languages');
    }
    
    // Update download link
    const downloadLink = document.querySelector('.link_cv, [data-translate="menu.downloadPdf"]');
    if (downloadLink) {
      downloadLink.textContent = this.t('sidebar.downloadPdf');
    }
    
    this.updateLanguageSkills();
  }

  /**
   * Update language skills section
   */
  updateLanguageSkills() {
    const languageSection = document.querySelector('.language');
    if (!languageSection) return;

    // Get spans that are not inside progress bars
    const languageSpans = Array.from(languageSection.querySelectorAll('span'))
      .filter(span => !span.closest('.bar'));

    const skillKeys = ['languageSkills.german', 'languageSkills.french', 'languageSkills.english', 'languageSkills.ukrainian', 'languageSkills.russian'];
    
    languageSpans.forEach((span, index) => {
      if (skillKeys[index]) {
        span.textContent = this.t(skillKeys[index]);
      }
    });
  }

  /**
   * Update work experience section
   */
  updateWorkExperience() {
    const positions = this.t('workExperience.positions');
    const workCards = document.querySelectorAll('.readmore');

    workCards.forEach((card, index) => {
      if (positions[index]) {
        const titleElement = card.querySelector('.profession-title');
        const dateElement = card.querySelector('.date');
        const descriptionElement = card.querySelector('p:not(.readmore-link)');

        if (titleElement) {
          const companyLink = titleElement.querySelector('a');
          if (companyLink) {
            titleElement.childNodes[0].textContent = positions[index].title + ' ';
          } else {
            titleElement.textContent = positions[index].title;
          }
        }

        if (dateElement) {
          dateElement.textContent = positions[index].date;
        }

        if (descriptionElement && positions[index].description) {
          descriptionElement.innerHTML = positions[index].description;
        }
      }
    });
  }

  /**
   * Update education section
   */
  updateEducation() {
    const educationSection = document.querySelector('.education');
    if (!educationSection) return;

    const universityLink = educationSection.querySelector('.university');
    const facultyElement = educationSection.querySelector('h4');
    const dateElement = educationSection.querySelector('.date');

    if (universityLink) {
      universityLink.textContent = this.t('education.university');
    }

    if (facultyElement) {
      facultyElement.textContent = this.t('education.faculty');
    }

    if (dateElement) {
      dateElement.textContent = this.t('education.date');
    }
  }

  /**
   * Update UI elements (buttons, links)
   */
  updateUIElements() {
    // Update "More" buttons
    const moreButtons = document.querySelectorAll('.btm-more span, .btm-more-licenses span, .btm-more-courses span');
    moreButtons.forEach(button => {
      const currentText = button.textContent.trim();
      if (currentText === 'More' || currentText === 'Більше') {
        button.textContent = this.t('ui.more');
      } else if (currentText === 'Less' || currentText === 'Менше') {
        button.textContent = 'Less'; // Keep as "Less" when expanded
      }
    });

    // Update "see more" links
    const seeMoreLinks = document.querySelectorAll('.readmore-link a');
    seeMoreLinks.forEach(link => {
      const currentText = link.textContent.trim();
      if (currentText === '...see more' || currentText === '...детальніше') {
        link.textContent = this.t('ui.seeMore');
      } else if (currentText === 'less' || currentText === 'менше') {
        link.textContent = this.t('ui.less');
      }
    });
  }

  /**
   * Update menu elements
   */
  updateMenuElements() {
    // Update data-translate elements
    const menuElements = document.querySelectorAll('[data-translate]');
    menuElements.forEach(element => {
      const key = element.getAttribute('data-translate');
      const translation = this.t(key);
      if (translation !== key) {
        element.textContent = translation;
      }
    });

    // Update theme option labels
    const themeOptions = document.querySelectorAll('[data-theme] span');
    themeOptions.forEach(option => {
      const theme = option.parentElement.getAttribute('data-theme');
      if (theme) {
        option.textContent = this.t(`menu.${theme}`);
      }
    });

    // Update active language option
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
      const isActive = option.getAttribute('data-lang') === this.currentLanguage;
      option.classList.toggle('active', isActive);
    });
  }

  /**
   * Update contact form elements
   */
  updateContactForm() {
    // Update contact form labels and placeholders
    const contactElements = [
      { selector: '[data-translate="contact.title"]', key: 'contact.title' },
      { selector: 'label[for="contactName"]', key: 'contact.name' },
      { selector: 'label[for="contactEmail"]', key: 'contact.email' },
      { selector: 'label[for="contactMessage"]', key: 'contact.message' },
      { selector: '.btn-submit', key: 'contact.send' }
    ];

    contactElements.forEach(({ selector, key }) => {
      const element = document.querySelector(selector);
      if (element) {
        element.textContent = this.t(key);
      }
    });
  }

  /**
   * Update a single element with text or HTML content
   * @param {string} selector - CSS selector
   * @param {string} content - Content to set
   * @param {boolean} isHTML - Whether content contains HTML
   * @param {number} index - Element index if multiple elements match
   */
  updateElement(selector, content, isHTML = false, index = null) {
    try {
      const elements = document.querySelectorAll(selector);
      const element = index !== null ? elements[index] : elements[0];
      
      if (element && content) {
        if (isHTML && content.includes('<br')) {
          element.innerHTML = content;
        } else {
          element.textContent = content;
        }
      }
    } catch (error) {
      console.warn(`Failed to update element: ${selector}`, error);
    }
  }

  /* ========================================================================
     Observer Pattern for Language Change Events
     ======================================================================== */

  /**
   * Add observer for language change events
   * @param {Function} callback - Callback function to call on language change
   */
  addObserver(callback) {
    if (typeof callback === 'function') {
      this.observers.add(callback);
    }
  }

  /**
   * Remove observer for language change events
   * @param {Function} callback - Callback function to remove
   */
  removeObserver(callback) {
    this.observers.delete(callback);
  }

  /**
   * Notify all observers of language change
   * @param {string} newLanguage - New language code
   * @param {string} previousLanguage - Previous language code
   */
  notifyObservers(newLanguage, previousLanguage) {
    this.observers.forEach(callback => {
      try {
        callback(newLanguage, previousLanguage);
      } catch (error) {
        console.error('Error in i18n observer:', error);
      }
    });
  }

  /* ========================================================================
     Legacy Support Methods
     ======================================================================== */

  /**
   * Initialize language switch functionality (for backward compatibility)
   */
  initializeLanguageSwitch() {
    // Remove old language switch if it exists
    const oldLanguageSwitch = document.querySelector('.language-switch');
    if (oldLanguageSwitch) {
      oldLanguageSwitch.remove();
    }
    
    // Language switching is now handled by the hamburger menu
    console.log('Language switching initialized via hamburger menu');
  }

  /* ========================================================================
     Utility Methods
     ======================================================================== */

  /**
   * Get translation statistics
   * @returns {Object} - Statistics about translations
   */
  getStats() {
    const stats = {
      currentLanguage: this.currentLanguage,
      availableLanguages: this.getAvailableLanguages(),
      totalTranslations: {}
    };

    // Count translations for each language
    I18N_CONFIG.SUPPORTED_LANGUAGES.forEach(lang => {
      stats.totalTranslations[lang] = this.countTranslations(this.translations[lang]);
    });

    return stats;
  }

  /**
   * Recursively count translation keys
   * @param {Object} obj - Translation object
   * @returns {number} - Count of translation keys
   */
  countTranslations(obj) {
    let count = 0;
    for (const key in obj) {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        count += this.countTranslations(obj[key]);
      } else {
        count++;
      }
    }
    return count;
  }

  /**
   * Validate translation completeness
   * @returns {Object} - Validation results
   */
  validateTranslations() {
    const validation = {
      isValid: true,
      missingKeys: [],
      errors: []
    };

    // Compare all languages against default language
    const defaultKeys = this.extractKeys(this.translations[this.defaultLanguage]);
    
    I18N_CONFIG.SUPPORTED_LANGUAGES.forEach(lang => {
      if (lang !== this.defaultLanguage) {
        const langKeys = this.extractKeys(this.translations[lang]);
        const missing = defaultKeys.filter(key => !langKeys.includes(key));
        
        if (missing.length > 0) {
          validation.isValid = false;
          validation.missingKeys.push({
            language: lang,
            keys: missing
          });
        }
      }
    });

    return validation;
  }

  /**
   * Extract all translation keys from an object
   * @param {Object} obj - Translation object
   * @param {string} prefix - Key prefix
   * @returns {Array<string>} - Array of all keys
   */
  extractKeys(obj, prefix = '') {
    const keys = [];
    
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        keys.push(...this.extractKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    
    return keys;
  }
}

/* ==========================================================================
   Global Initialization
   ========================================================================== */

/**
 * Initialize i18n system when DOM is ready
 */
const initializeI18n = () => {
  if (window.i18n) {
    console.warn('I18n already initialized');
    return;
  }
  
  try {
    window.i18n = new I18n();
    
    // Development mode logging
    if (process?.env?.NODE_ENV === 'development') {
      console.log('I18n Stats:', window.i18n.getStats());
      
      const validation = window.i18n.validateTranslations();
      if (!validation.isValid) {
        console.warn('Translation validation failed:', validation);
      }
    }
  } catch (error) {
    console.error('Failed to initialize I18n:', error);
  }
};

// Multiple initialization methods for reliability
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeI18n, { once: true });
} else {
  initializeI18n();
}

// Backup initialization
window.addEventListener('load', () => {
  if (!window.i18n) {
    initializeI18n();
  }
}, { once: true });

// Export for potential external usage
window.I18n = I18n;