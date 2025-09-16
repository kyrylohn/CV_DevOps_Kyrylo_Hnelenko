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
`🔔 Сторінку відкрито!
<pre>
🌐 Браузер: ${browserInfo}
🌐 IP: ${visitorData.ip}
🌍 Локація: ${visitorData.city}, ${visitorData.country}
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