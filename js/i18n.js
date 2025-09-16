/**
 * Internationalization (i18n) functionality
 * Supports English and Ukrainian languages
 */

class I18n {
  constructor() {
    this.currentLanguage = 'en';
    this.defaultLanguage = 'en';
    
    // Embedded translations to avoid CORS issues
    this.translations = {
      en: {
        meta: {
          title: "CV DevOps | Kyrylo Hnelenko",
          description: "Experienced DevOps Engineer with 5+ years in automation, CI/CD, and cloud infrastructure. Proficient in VMware vCenter, Docker, Kubernetes, GitLab CI/CD, and networking."
        },
        sidebar: {
          techSkills: "Tech Skills",
          softSkills: "Soft Skills",
          languages: "Languages",
          downloadPdf: "Download PDF"
        },
        main: {
          profession: "DevOps Engineer",
          name: "Kyrylo Hnelenko",
          intro: "Experienced DevOps Engineer with 5+ years in automation, CI/CD, and cloud infrastructure.<br />Proficient in VMware vCenter, Docker, Kubernetes, GitLab CI/CD, and networking.<br />Strong expertise in Linux systems, database management, and security optimization.<br /><br />Focused on automation, scalability, security, and reliability in modern DevOps workflows.",
          workExperience: "Work Experience",
          education: "Education",
          licensesAndCertificates: "Licenses and Certificates",
          courses: "Courses"
        },
        workExperience: {
          positions: [
            {
              title: "Middle DevOps Engineer",
              date: "Jul 2024 – Present",
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
          description: "Досвідчений DevOps інженер з 5+ роками досвіду в автоматизації, CI/CD та хмарній інфраструктурі. Володію VMware vCenter, Docker, Kubernetes, GitLab CI/CD та мережевими технологіями."
        },
        sidebar: {
          techSkills: "Технічні навички",
          softSkills: "Особисті навички",
          languages: "Мови",
          downloadPdf: "Завантажити PDF"
        },
        main: {
          profession: "DevOps Інженер",
          name: "Кирило Гнеленко",
          intro: "Досвідчений DevOps інженер з 5+ роками досвіду в автоматизації, CI/CD та хмарній інфраструктурі.<br />Володію VMware vCenter, Docker, Kubernetes, GitLab CI/CD та мережевими технологіями.<br />Сильна експертиза в Linux системах, управлінні базами даних та оптимізації безпеки.<br /><br />Зосереджений на автоматизації, масштабованості, безпеці та надійності в сучасних DevOps процесах.",
          workExperience: "Досвід роботи",
          education: "Освіта",
          licensesAndCertificates: "Ліцензії та сертифікати",
          courses: "Курси"
        },
        workExperience: {
          positions: [
            {
              title: "Middle DevOps Інженер",
              date: "Лип 2024 – Дотепер",
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
        languageSkills: {
          german: "Німецька A1 Початковий",
          french: "Французька A1 Початковий",
          english: "Англійська B1 Середній",
          ukrainian: "Українська Рідна",
          russian: "Російська Намагаюся забути"
        }
      }
    };
    
    // Initialize language from localStorage or browser preference
    this.initializeLanguage();
    
    // Initialize when DOM is ready
    this.init();
  }

  /**
   * Initialize language based on localStorage or browser preference
   */
  initializeLanguage() {
  const savedLanguage = localStorage.getItem('cv-language');
  
    if (savedLanguage && ['en', 'uk'].includes(savedLanguage)) {
    this.currentLanguage = savedLanguage;
    } else {
    // Default to English for all users when localStorage is empty
    this.currentLanguage = 'en';
    }
  }


  /**
   * Initialize the i18n system
   */
  init() {
    this.updateContent();
    this.initializeLanguageSwitch();
  }

  /**
   * Get translation by key path (e.g., 'main.profession')
   */
  t(keyPath) {
    const keys = keyPath.split('.');
    let value = this.translations[this.currentLanguage];
    
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
            return keyPath; // Return key if translation not found
          }
        }
        break;
      }
    }
    
    return value || keyPath;
  }

  /**
   * Switch language
   */
  switchLanguage(language) {
    if (!['en', 'uk'].includes(language)) {
      console.error('Unsupported language:', language);
      return;
    }

    this.currentLanguage = language;
    localStorage.setItem('cv-language', language);
    this.updateContent();
    this.updateLanguageSwitch();
  }

  /**
   * Update all content on the page
   */
  updateContent() {
    // Update meta tags
    document.title = this.t('meta.title');
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', this.t('meta.description'));
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', this.t('meta.title'));
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', this.t('meta.description'));
    
    // Update HTML lang attribute
    document.documentElement.lang = this.currentLanguage;

    // Update sidebar content
    this.updateElement('h3', this.t('sidebar.techSkills'), 0);
    this.updateElement('h3', this.t('sidebar.softSkills'), 1);
    this.updateElement('h3', this.t('sidebar.languages'), 2);
    this.updateElement('.link_cv', this.t('sidebar.downloadPdf'));

    // Update language skills
    this.updateLanguageSkills();

    // Update main content
    this.updateElement('.profession', this.t('main.profession'));
    this.updateElement('.name', this.t('main.name'));
    this.updateElement('.about-me-container section p', this.t('main.intro'));

    // Update section titles
    this.updateElement('.about-me-title', this.t('main.workExperience'), 0);
    this.updateElement('.about-me-title', this.t('main.education'), 1);
    this.updateElement('.about-me-title', this.t('main.licensesAndCertificates'), 2);
    this.updateElement('.about-me-title', this.t('main.courses'), 3);

    // Update work experience
    this.updateWorkExperience();

    // Update education
    this.updateEducation();

    // Update UI elements
    this.updateUIElements();
  }

  /**
   * Update language skills section
   */
  updateLanguageSkills() {
    const languageSection = document.querySelector('.language');
    if (!languageSection) return;

    // Get only the spans that are not inside progress bars (exclude .bar span elements)
    const languageSpans = Array.from(languageSection.querySelectorAll('span')).filter(span => 
      !span.closest('.bar')
    );

    if (languageSpans.length >= 5) {
      languageSpans[0].textContent = this.t('languageSkills.german');
      languageSpans[1].textContent = this.t('languageSkills.french');
      languageSpans[2].textContent = this.t('languageSkills.english');
      languageSpans[3].textContent = this.t('languageSkills.ukrainian');
      languageSpans[4].textContent = this.t('languageSkills.russian');
    }
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
      if (button.textContent === 'More' || button.textContent === 'Більше') {
        button.textContent = this.t('ui.more');
      }
    });

    // Update "see more" links
    const seeMoreLinks = document.querySelectorAll('.readmore-link a');
    seeMoreLinks.forEach(link => {
      if (link.textContent === '...see more' || link.textContent === '...детальніше') {
        link.textContent = this.t('ui.seeMore');
      } else if (link.textContent === 'less' || link.textContent === 'менше') {
        link.textContent = this.t('ui.less');
      }
    });
  }

  /**
   * Update a single element
   */
  updateElement(selector, content, index = null) {
    const elements = document.querySelectorAll(selector);
    const element = index !== null ? elements[index] : elements[0];
    
    if (element) {
      if (content && content.includes('<br')) {
        element.innerHTML = content;
      } else {
        element.textContent = content;
      }
    }
  }

  /**
   * Initialize language switch button
   */
  initializeLanguageSwitch() {
    // Create language switch button with modern toggle design
    const languageSwitch = document.createElement('button');
    languageSwitch.className = `language-switch ${this.currentLanguage}`;
    languageSwitch.innerHTML = `
      <span class="lang-label en">EN</span>
      <span class="lang-label uk">UA</span>
    `;
    
    // Add click event
    languageSwitch.addEventListener('click', () => {
      const newLanguage = this.currentLanguage === 'en' ? 'uk' : 'en';
      this.switchLanguage(newLanguage);
    });

    // Insert before the CV download section
    const cvSection = document.querySelector('.cv');
  
    if (cvSection) {
      cvSection.parentNode.insertBefore(languageSwitch, cvSection);
    }

    this.updateLanguageSwitch();
  }

  /**
   * Update language switch button
   */
  updateLanguageSwitch() {
    const languageSwitch = document.querySelector('.language-switch');
    if (languageSwitch) {
      // Update toggle state
      languageSwitch.className = `language-switch ${this.currentLanguage}`;
      languageSwitch.title = this.t('ui.languageSwitch');
    }
  }
}

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.i18n = new I18n();
});
