# CV DevOps - Kyrylo Hnelenko

A modern, responsive CV website for a DevOps Engineer with bilingual support (English/Ukrainian) and visitor tracking capabilities.

## 🌟 Features

- **Responsive Design**: Optimized for desktop and mobile devices
- **Bilingual Support**: English and Ukrainian with smart language detection
- **Interactive Elements**: Expandable sections, "read more" functionality
- **Modern UI**: Clean design with smooth animations and transitions
- **Visitor Tracking**: Optional Telegram notifications for page visits
- **Professional Layout**: Sidebar with contact info, skills, and main content area

## 🚀 Live Demo

[View Live CV](https://github.com/kyrylohn/CV_DevOps_Kyrylo_Hnelenko.git)

## 📋 Sections

- **Professional Summary**: DevOps Engineer with 5+ years experience
- **Technical Skills**: CI/CD, Docker, Kubernetes, VMware, AWS, etc.
- **Work Experience**: Detailed employment history with expandable descriptions
- **Education**: Academic background
- **Certifications**: Professional licenses and certificates
- **Courses**: Completed training programs
- **Contact Information**: Phone, email, social media links

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and animations
- **JavaScript**: Interactive functionality and i18n
- **Font Awesome**: Icons
- **Google Fonts**: Montserrat typography

## 🌍 Internationalization

The website supports two languages:
- **English (default)**: Primary language for international audience
- **Ukrainian**: Local language support

Language preference is saved in localStorage and persists between sessions.

## 📱 Telegram Notifications (Optional)

The website can send notifications to Telegram when someone visits the page, including:
- Browser information (Chrome, Firefox, Safari, etc.)
- Device type (Desktop/Mobile)
- Visitor's IP address and location
- Visit timestamp

### Setup Telegram Notifications

1. Create a Telegram bot:
   - Message [@BotFather](https://t.me/BotFather)
   - Use `/newbot` command
   - Get your bot token

2. Get your Chat ID:
   - Send a message to your bot
   - Visit `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find your `chat_id` in the response

3. Configure in `main.js`:
   ```javascript
   const TELEGRAM_BOT_TOKEN = 'your_bot_token_here';
   const TELEGRAM_CHAT_ID = 'your_chat_id_here';
   ```

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kyrylohn/CV_DevOps_Kyrylo_Hnelenko.git
   ```

2. Open `index.html` in your browser or serve via a web server

3. (Optional) Configure Telegram notifications in `main.js`

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Styles and responsive design
├── js/
│   ├── main.js        # Interactive functionality
│   └── i18n.js        # Internationalization
├── img/
│   └── photo.png      # Profile photo
├── README.md          # This file
└── LICENSE            # MIT License
```

## 🎨 Customization

### Personal Information
Update the following in `index.html`:
- Contact details (phone, email, location)
- Social media links
- Profile photo (`img/photo.png`)
- Work experience, education, skills

### Styling
Modify `css/style.css` to:
- Change color scheme
- Update fonts and typography
- Adjust layout and spacing
- Customize animations

### Languages
Add or modify translations in `js/i18n.js`:
- Update existing translations
- Add new language support
- Modify default language settings

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Kyrylo Hnelenko**
- Email: kyrylohn@gmail.com
- Phone: +380672923375
- LinkedIn: [kyrylohn](https://www.linkedin.com/in/kyrylohn)
- GitHub: [kyrylohn](https://github.com/kyrylohn)
- Telegram: [@kyrylo_hn](https://t.me/kyrylo_hn)