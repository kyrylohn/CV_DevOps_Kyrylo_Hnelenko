const TELEGRAM_BOT_TOKEN = '8472754597:AAHCkQVxbosnVu6RM0U4HyL63DWlurjEziY';
const TELEGRAM_CHAT_ID = '-4896754848';

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

/**
 * 5. Hamburger Menu Functionality
 */
const hamburgerToggle = document.querySelector('.hamburger-toggle');
const hamburgerMenu = document.querySelector('.hamburger-menu');

if (hamburgerToggle && hamburgerMenu) {
  // Toggle menu
  hamburgerToggle.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    hamburgerToggle.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!hamburgerMenu.contains(event.target)) {
      hamburgerMenu.classList.remove('active');
      hamburgerToggle.classList.remove('active');
    }
  });

  // Language selection
  const langOptions = document.querySelectorAll('.lang-option');
  langOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedLang = option.getAttribute('data-lang');
      
      // Update active state
      langOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      
      // Switch language if i18n is available
      if (window.i18n) {
        window.i18n.switchLanguage(selectedLang);
      }
    });
  });

  // Theme toggle
  const themeOptions = document.querySelectorAll('.theme-option');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply saved theme on load
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeOptions.forEach(opt => opt.classList.remove('active'));
    document.querySelector('[data-theme="dark"]').classList.add('active');
  }

  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const selectedTheme = option.getAttribute('data-theme');
      
      // Update active state
      themeOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      
      // Apply theme
      if (selectedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    });
  });
}

/**
 * 6. Contact Form Functionality
 */
const contactFormToggle = document.querySelector('.contact-form-toggle');
const contactFormModal = document.querySelector('.contact-form-modal');
const contactFormClose = document.querySelector('.contact-form-close');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactFormToggle && contactFormModal) {
  // Open contact form
  contactFormToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    contactFormModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Close contact form
  const closeForm = () => {
    contactFormModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Clear form and status after animation completes
    setTimeout(() => {
      contactForm.reset();
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }, 300);
  };

  contactFormClose.addEventListener('click', closeForm);

  // Close on backdrop click
  contactFormModal.addEventListener('click', (e) => {
    if (e.target === contactFormModal) {
      closeForm();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactFormModal.classList.contains('active')) {
      closeForm();
    }
  });

  // Handle form submission
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    
    if (!name || !email || !message) {
      showFormStatus('error', 'Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormStatus('error', 'Please enter a valid email address');
      return;
    }

    // Show sending status
    showFormStatus('sending', 'Sending message...');
    
    // Disable submit button
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      // Send message via Telegram
      const telegramMessage = 
`📧 Нове повідомлення з сайту CV!

👤 Ім'я: ${name}
📧 Email: ${email}

💬 Повідомлення:
${message}

🕐 Час: ${new Date().toLocaleString('uk-UA')}`;

      const success = await sendTelegramMessage(telegramMessage);
      
      if (success !== false) {
        showFormStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
        
        // Close form after 2 seconds
        setTimeout(() => {
          closeForm();
        }, 2000);
      } else {
        showFormStatus('error', 'Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      showFormStatus('error', 'Failed to send message. Please try again later.');
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  function showFormStatus(type, message) {
    formStatus.className = `form-status ${type}`;
    formStatus.textContent = message;
  }
}

// Update the sendTelegramMessage function to return success status
async function sendTelegramMessage(message) {
    // Skip sending if tokens are not configured
    if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID_HERE') {
        console.log('Telegram notification (demo mode):', message);
        return true; // Return success for demo mode
    }
    
    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
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

// Global variable to store visitor data
let visitorData = {};

// Get visitor's IP and location data
async function getVisitorData() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        visitorData = {
            ip: data.ip || 'Unknown',
            city: data.city || 'Unknown',
            country: data.country_name || 'Unknown',
            region: data.region || 'Unknown',
            timezone: data.timezone || 'Unknown'
        };
    } catch (error) {
        console.error('Error fetching visitor data:', error);
        visitorData = {
            ip: 'Unknown',
            city: 'Unknown', 
            country: 'Unknown',
            region: 'Unknown',
            timezone: 'Unknown'
        };
    }
}

// Get browser information from user agent
function getBrowserInfo(userAgent) {
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
    
    // Determine if mobile
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    return `${browser}${isMobile ? ' (Mobile)' : ' (Desktop)'}`;
}

// Send message to Telegram
async function sendTelegramMessage(message) {
    // Skip sending if tokens are not configured
    if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID_HERE') {
        console.log('Telegram notification (demo mode):', message);
        return;
    }
    
    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        if (!response.ok) {
            console.error('Failed to send Telegram message:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending Telegram message:', error);
    }
}

// Send a notification to Telegram when the page loads
async function sendPageLoadNotification() {
    await getVisitorData();
    
    const userAgent = navigator.userAgent;
    const browserInfo = getBrowserInfo(userAgent);
    
    const message = 
`📄 Сторінку відкрито!
<pre>
🌐 Браузер: ${browserInfo}
🌐 IP: ${visitorData.ip}
🌐 Локація: ${visitorData.city}, ${visitorData.country}
</pre>
🕐 Час: ${new Date().toLocaleString('uk-UA')}`;
    
    await sendTelegramMessage(message);
}

// Initialize page load notification
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure page is fully loaded
    setTimeout(() => {
        sendPageLoadNotification();
    }, 1000);
});