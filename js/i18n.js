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
      title: "CV Information Security | Kyrylo Hnelenko",
      description: "Information Security / DevSecOps Engineer with 5+ years securing fintech and banking infrastructure. Hands-on with security monitoring (SIEM/log analytics), incident response, vulnerability scanning, DLP, endpoint protection, network security, and PCI DSS / NBU compliance."
    },
    sidebar: {
      techSkills: "Tech Skills",
      softSkills: "Soft Skills", 
      languages: "Languages",
      downloadPdf: "Download PDF"
    },
    main: {
      profession: "Information Security / DevSecOps Engineer",
      name: "Kyrylo Hnelenko",
      intro: "Information Security / DevSecOps Engineer with 5+ years securing fintech and banking infrastructure.<br />Built secure infrastructure from the ground up multiple times and led PCI DSS process and documentation end to end.<br />Hands-on with security monitoring and log analytics, incident response, vulnerability scanning, network segmentation, endpoint protection, and DLP concepts.<br /><br />Focused on multi-layer defense against cyber threats, regulatory compliance (PCI DSS, NBU #95), and operational resilience.",
      workExperience: "Work Experience",
      education: "Education", 
      licensesAndCertificates: "Licenses and Certificates",
      courses: "Courses"
    },
    workExperience: {
      positions: [
        {
          title: "Senior DevSecOps / Information Security Engineer",
          date: "Apr 2025 – Present",
          description: "• Designing and operating multi-layer defense for a fintech payment platform, hardening secure private-cloud infrastructure on VMware vCenter<br>• Expanding security monitoring, log correlation and alerting to speed up detection of and response to suspicious events and security incidents<br>• Running vulnerability scans of network and applications and driving remediation of findings<br>• Enforcing network segmentation, access control, secrets management and TLS across prod/stage/dev environments<br>• Producing security policies, hardening standards and reporting on the security posture for management"
        },
        {
          title: "DevSecOps Engineer",
          date: "Jul 2024 – Apr 2025",
          description: "• Secured and stabilized the platform by migrating production to a controlled environment and eliminating critical vulnerabilities<br>• Built fintech-grade infrastructure from scratch with secure access, network segmentation, secrets management and TLS<br>• Implemented centralized security monitoring & logging (Grafana, Prometheus, Loki) for threat detection and incident investigation<br>• Hardened systems against DDoS and other attacks, improving resilience and uptime<br>• Deployed self-hosted GitLab and secure automated CI/CD across all projects"
        },
        {
          title: "DevSecOps Engineer",
          date: "Sep 2023 – Jul 2024",
          description: "• Delivered secure end-to-end infrastructure for a pipeline of fintech and blockchain projects, from architecture design to delivery and hand-off<br>• Built secure cloud environments from scratch for multiple clients across AWS (primary), Azure and GCP based on project and compliance needs<br>• Implemented secure CI/CD pipelines (Argo CD, Jenkins, GitLab CI) with controlled access and reliable release workflows<br>• Designed network segmentation, access control and monitoring for microservices-based Kubernetes systems<br>• Produced full infrastructure and security documentation and handover packages for engineering teams"
        },
        {
          title: "DevOps / Information Security Engineer",
          date: "Mar 2022 – Mar 2023",
          description: "• Led preparation of infrastructure and processes for PCI DSS certification, building the processes and documentation end to end<br>• Designed and implemented security policies, access control, logging, backup and audit procedures<br>• Set up logging and monitoring to detect anomalies and support incident investigation<br>• Maintained and hardened VMware infrastructure and internal security tooling"
        },
        {
          title: "Junior DevOps Engineer",
          date: "Jun 2021 – Mar 2022",
          description: "• Conducted cloud/vendor analysis, prepared commercial comparison, and recommended final provider aligned with business and regulatory requirements<br>• Built core internal services (GitLab, AD, Jira, Confluence, monitoring, VDI for 200+ staff)<br>• Assisted in critical recovery of a 6TB PostgreSQL cluster after security incident and migrated it to the new environment with zero data loss"
        },
        {
          title: "System Administrator",
          date: "Feb 2021 – Jun 2021",
          description: "• Administered endpoint antivirus protection (ESET) and Windows OS / Windows Server, 1C<br>• Managed Active Directory accounts and access<br>• Data backup & recovery<br>• Remote administration of office equipment and telephony<br>• Technical support & assistance"
        },
        {
          title: "Tier 2-3 Technical Support",
          date: "Aug 2020 – Oct 2020",
          description: "• Service Desk, user accounts, customer support<br>• Cooperation with 1C programmers, telecom providers<br>• LAN troubleshooting<br>• Working with ARP, TCP/IP, DHCP, DNS"
        },
        {
          title: "System Administrator",
          date: "Mar 2019 – Aug 2020",
          description: "• Implementation and support of IT infrastructures with a focus on reliability and security<br>• Administration of Windows Servers (AD, DHCP, Backup) and endpoint antivirus (ESET)<br>• VMware ESXi (config, maintenance)<br>• Managing LAN, network access and portable devices"
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
      title: "CV Інформаційна безпека | Кирило Гнеленко",
      description: "Фахівець з інформаційної безпеки / DevSecOps інженер з 5+ роками досвіду захисту фінтех- та банківської інфраструктури. Практичний досвід із моніторингом безпеки (SIEM/аналіз логів), реагуванням на інциденти, скануванням вразливостей, DLP, захистом кінцевих точок, мережевою безпекою та відповідністю PCI DSS / НБУ."
    },
    sidebar: {
      techSkills: "Технічні навички",
      softSkills: "Особисті навички",
      languages: "Мови",
      downloadPdf: "Завантажити PDF"
    },
    main: {
      profession: "Фахівець з інформаційної безпеки / DevSecOps інженер",
      name: "Кирило Гнеленко",
      intro: "Фахівець з інформаційної безпеки / DevSecOps інженер з 5+ роками досвіду захисту фінтех- та банківської інфраструктури.<br />Неодноразово будував безпечну інфраструктуру з нуля та повністю вибудував процеси й документацію для проходження PCI DSS.<br />Практичний досвід із моніторингом безпеки та аналізом логів, реагуванням на інциденти, скануванням вразливостей, сегментацією мережі, захистом кінцевих точок та принципами DLP.<br /><br />Орієнтований на багаторівневий захист від кіберзагроз, відповідність нормативним вимогам (PCI DSS, Постанова НБУ №95) та стресостійкість систем.",
      workExperience: "Досвід роботи",
      education: "Освіта",
      licensesAndCertificates: "Ліцензії та сертифікати", 
      courses: "Курси"
    },
    workExperience: {
      positions: [
        {
          title: "Senior DevSecOps / Інженер з інформаційної безпеки",
          date: "Квітень 2025 – Дотепер",
          description: "• Проєктування та забезпечення багаторівневого захисту фінтех платіжної платформи, посилення безпеки приватно-хмарної інфраструктури на VMware vCenter<br>• Розширення моніторингу безпеки, кореляції логів та сповіщень для пришвидшення виявлення та реагування на підозрілі події й інциденти безпеки<br>• Проведення сканування вразливостей мережі та додатків і супровід усунення виявлених недоліків<br>• Впровадження сегментації мережі, контролю доступу, управління секретами та TLS у середовищах prod/stage/dev<br>• Підготовка політик безпеки, стандартів посилення захисту та звітності про стан захищеності для керівництва"
        },
        {
          title: "DevSecOps Інженер",
          date: "Липень 2024 – Квітень 2025",
          description: "• Захистив та стабілізував платформу шляхом міграції production до контрольованого середовища та усунення критичних вразливостей<br>• Побудував з нуля інфраструктуру фінтех-рівня із захищеним доступом, сегментацією мережі, управлінням секретами та TLS<br>• Впровадив централізований моніторинг безпеки та логування (Grafana, Prometheus, Loki) для виявлення загроз і розслідування інцидентів<br>• Зміцнив системи проти DDoS та інших атак, підвищивши стресостійкість і час роботи<br>• Розгорнув самохостинговий GitLab та безпечний автоматизований CI/CD для всіх проектів"
        },
        {
          title: "DevSecOps Інженер",
          date: "Вересень 2023 – Липень 2024",
          description: "• Забезпечив безпечну наскрізну інфраструктуру для потоку фінтех та блокчейн проектів, від проектування архітектури до доставки та передачі<br>• Побудував з нуля безпечні хмарні середовища для декількох клієнтів на AWS (основний), Azure та GCP відповідно до потреб проекту та вимог відповідності<br>• Впровадив безпечні CI/CD конвеєри (Argo CD, Jenkins, GitLab CI) з контрольованим доступом та надійними процесами випуску<br>• Спроектував сегментацію мережі, контроль доступу та моніторинг для систем на базі мікросервісів Kubernetes<br>• Створив повну інфраструктурну документацію та документацію з безпеки і пакети передачі для інженерних команд"
        },
        {
          title: "DevOps / Інженер з інформаційної безпеки",
          date: "Березень 2022 – Березень 2023",
          description: "• Очолив підготовку інфраструктури та процесів до сертифікації PCI DSS, повністю вибудувавши процеси та документацію<br>• Спроектував та впровадив політики безпеки, контроль доступу, логування, резервне копіювання та процедури аудиту<br>• Налаштував логування та моніторинг для виявлення аномалій і підтримки розслідування інцидентів<br>• Підтримував та посилював безпеку VMware інфраструктури та внутрішніх інструментів безпеки"
        },
        {
          title: "Junior DevOps Інженер",
          date: "Червень 2021 – Березень 2022",
          description: "• Провів аналіз хмарних/вендорських рішень, підготував комерційне порівняння та рекомендував остаточного провайдера відповідно до бізнес-вимог та нормативних вимог<br>• Побудував основні внутрішні сервіси (GitLab, AD, Jira, Confluence, моніторинг, VDI для 200+ співробітників)<br>• Допоміг у критичному відновленні кластера PostgreSQL об'ємом 6 ТБ після інциденту безпеки та мігрував його в нове середовище без втрати даних"
        },
        {
          title: "Системний адміністратор",
          date: "Лютий 2021 – Червень 2021",
          description: "• Адміністрування антивірусного захисту кінцевих точок (ESET) та Windows OS / Windows Server, 1C<br>• Управління обліковими записами та доступом в Active Directory<br>• Резервне копіювання та відновлення даних<br>• Віддалене адміністрування офісного обладнання та телефонії<br>• Технічна підтримка та допомога"
        },
        {
          title: "Технічна підтримка Tier 2-3",
          date: "Серпень 2020 – Жовтень 2020",
          description: "• Service Desk, облікові записи користувачів, підтримка клієнтів<br>• Співпраця з програмістами 1C, телекомунікаційними провайдерами<br>• Усунення несправностей LAN<br>• Робота з ARP, TCP/IP, DHCP, DNS"
        },
        {
          title: "Системний адміністратор",
          date: "Березень 2019 – Серпень 2020",
          description: "• Впровадження та підтримка IT інфраструктур з фокусом на надійність та безпеку<br>• Адміністрування Windows Servers (AD, DHCP, Backup) та антивірусного захисту кінцевих точок (ESET)<br>• VMware ESXi (конфігурація, обслуговування)<br>• Управління LAN, мережевим доступом та портативними пристроями"
        },
        {
          title: "Начальник відділу телекомунікацій",
          date: "Березень 2016 – Березень 2019",
          description: ""
        },
        {
          title: "Провідний інженер", 
          date: "Жовтень 2015 – Березень 2016",
          description: ""
        }
      ]
    },
    education: {
      university: "Коледж радіоелектроніки Дніпро Україна",
      faculty: "Факультет радіотехніки",
      date: "Вересень 2010 – Червень 2014"
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
    if (typeof process !== 'undefined' && process?.env?.NODE_ENV === 'development') {
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