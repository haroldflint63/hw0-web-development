# HW0 - Advanced Web Development Project

🚀 **Live Demo:** [https://haroldflint63.github.io/hw0-web-development/](https://haroldflint63.github.io/hw0-web-development/)

This project demonstrates a comprehensive understanding of modern web development with advanced HTML5, CSS3, and ES6+ JavaScript features, showcasing professional coding practices, accessibility, and performance optimization.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Advanced Features](#advanced-features)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)
- [Performance](#performance)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Project Overview

This project showcases advanced web development skills through a fully-featured, responsive, and accessible web application. It demonstrates best practices in:

- Semantic HTML5 markup
- Modern CSS3 with Grid, Flexbox, and Custom Properties
- ES6+ JavaScript with advanced features
- Responsive design (mobile-first approach)
- Web accessibility (WCAG AA compliant)
- Performance optimization
- SEO best practices

## ✨ Features

### HTML5 Features

- ✅ **Semantic Structure** - Proper use of semantic HTML5 elements (header, nav, main, section, article, footer)
- ✅ **Advanced Forms** - Multiple input types with validation (text, email, tel, number, select, textarea, checkbox)
- ✅ **Accessibility** - ARIA labels, role attributes, skip links, and proper labeling
- ✅ **SEO Optimization** - Meta tags, Open Graph, Twitter Cards, and structured data (JSON-LD)
- ✅ **Responsive Images** - Picture element with WebP format and fallbacks, srcset for different screen sizes
- ✅ **Form UX** - Fieldsets, legends, tooltips, character counting, and progress indicators

### CSS3 Features

- ✅ **Modern Layouts** - CSS Grid and Flexbox for professional, responsive layouts
- ✅ **CSS Variables** - Custom properties for easy theming and maintainability
- ✅ **Animations** - Keyframe animations, transitions, and micro-interactions
- ✅ **Dark Mode** - Support for both manual toggle and prefers-color-scheme
- ✅ **Responsive Design** - Mobile-first approach with multiple breakpoints (480px, 768px, 1200px)
- ✅ **Professional Styling** - Gradients, box shadows, elevation system, hover effects
- ✅ **Form Validation States** - Visual feedback for valid, invalid, and disabled states
- ✅ **Print Styles** - Optimized styles for printing
- ✅ **Reduced Motion** - Respects user's motion preferences for accessibility

### JavaScript (ES6+) Features

- ✅ **Modern Syntax** - Arrow functions, const/let, template literals, destructuring
- ✅ **Form Validation** - Real-time validation with regex patterns and custom error messages
- ✅ **Data Persistence** - LocalStorage for saving form data and theme preferences
- ✅ **Theme Toggle** - Dark/Light mode with smooth transitions
- ✅ **Debouncing** - Performance optimization for input handlers
- ✅ **Event Delegation** - Efficient event handling
- ✅ **Input Sanitization** - XSS prevention
- ✅ **Notifications** - Animated success/error messages with ARIA live regions
- ✅ **Progress Tracking** - Real-time form completion percentage
- ✅ **Character Counting** - Live character count for textarea
- ✅ **Smooth Scrolling** - Enhanced navigation experience
- ✅ **Analytics Tracking** - Basic event tracking (console logging for demo)
- ✅ **Error Handling** - Try-catch blocks for robust error management

## 🛠 Technologies Used

- **HTML5** - Semantic markup, forms, media elements
- **CSS3** - Grid, Flexbox, Custom Properties, Animations
- **JavaScript (ES6+)** - Modern JavaScript features
- **GitHub Pages** - Automated deployment via GitHub Actions
- **Git** - Version control with proper .gitignore

## 📁 Project Structure

```
hw0-web-development/
├── .github/
│   └── workflows/
│       └── pages.yml          # GitHub Pages deployment workflow
├── assets/
│   ├── rock.jpg              # Sample image (JPG format)
│   ├── rock.webp             # Sample image (WebP format)
│   └── hero-image.jpg        # Hero section image
├── index.html                # Main HTML file
├── styles.css                # CSS stylesheet
├── script.js                 # JavaScript functionality
├── .gitignore               # Git ignore file
├── package.json             # Project metadata
├── CONTRIBUTING.md          # Contributing guidelines
├── LICENSE                  # MIT License
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No build tools required - this is a vanilla HTML/CSS/JS project

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/haroldflint63/hw0-web-development.git
   cd hw0-web-development
   ```

2. **Open in browser**
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   
   # Or simply double-click index.html
   ```

3. **Use a local server (optional but recommended)**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (with http-server installed)
   npx http-server
   ```

### GitHub Pages Deployment

The project is automatically deployed to GitHub Pages via GitHub Actions:

1. Push changes to the `main` or `master` branch
2. GitHub Actions workflow automatically deploys to GitHub Pages
3. Visit `https://haroldflint63.github.io/hw0-web-development/`

## 🎨 Advanced Features

### Dark Mode

- **Manual Toggle** - Click the theme toggle button in the header
- **System Preference** - Automatically detects and respects `prefers-color-scheme`
- **Persistent** - Theme preference saved in localStorage
- **Smooth Transitions** - Animated color transitions

### Form Validation

- **Real-time Validation** - Instant feedback as you type (debounced for performance)
- **Custom Error Messages** - Clear, helpful error messages for each field
- **Visual Feedback** - Color-coded borders for valid/invalid states
- **Progress Tracking** - Shows percentage of form completion
- **Character Counting** - Live character count with color-coded warnings
- **Data Persistence** - Form data saved to localStorage

### Responsive Design

- **Mobile-First** - Optimized for mobile devices first
- **Breakpoints**:
  - Mobile: < 480px
  - Tablet: 480px - 768px
  - Desktop: > 768px
- **Flexible Layouts** - Grid and Flexbox adapt to screen size
- **Touch-Friendly** - Large tap targets on mobile devices

### Performance Optimization

- **Image Optimization** - WebP format with fallbacks
- **Lazy Loading** - Images load as they enter viewport
- **Debouncing** - Reduced function calls for better performance
- **Efficient Selectors** - Optimized DOM queries
- **CSS Animations** - Hardware-accelerated transforms
- **Minimal JavaScript** - No frameworks, just vanilla JS

## ♿ Accessibility

### WCAG AA Compliance

- ✅ **Semantic HTML** - Proper use of landmarks and headings
- ✅ **ARIA Labels** - Comprehensive ARIA attributes for screen readers
- ✅ **Keyboard Navigation** - Full keyboard accessibility
- ✅ **Color Contrast** - WCAG AA compliant color ratios
- ✅ **Focus Indicators** - Clear focus states for interactive elements
- ✅ **Skip Links** - Skip to main content link
- ✅ **Alt Text** - Descriptive alt text for images
- ✅ **Form Labels** - All inputs properly labeled
- ✅ **Error Identification** - Clear error messages with ARIA live regions
- ✅ **Reduced Motion** - Respects prefers-reduced-motion

### Screen Reader Support

- Tested with NVDA and macOS VoiceOver
- ARIA live regions for dynamic content updates
- Proper heading hierarchy
- Form field associations with labels and error messages

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Internet Explorer 11 (limited support)

## ⚡ Performance

### Optimization Techniques

- Minimal HTTP requests (inline styles possible for critical CSS)
- Optimized images (WebP format, lazy loading)
- No external dependencies or frameworks
- Efficient CSS selectors
- Debounced event handlers
- LocalStorage for client-side caching

### Performance Metrics

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: 90+

## 🧪 Testing

### Manual Testing Checklist

- [x] Form validation (all field types)
- [x] Dark/Light theme toggle
- [x] Responsive design (mobile, tablet, desktop)
- [x] Keyboard navigation
- [x] Screen reader compatibility
- [x] Cross-browser testing
- [x] LocalStorage persistence
- [x] Error handling
- [x] Print styles

### Accessibility Testing

- [x] WAVE accessibility evaluation
- [x] Lighthouse accessibility audit
- [x] Keyboard-only navigation
- [x] Screen reader testing (NVDA, VoiceOver)
- [x] Color contrast validation

## 📝 Code Quality

### Best Practices

- **HTML** - Valid HTML5, semantic elements, accessibility attributes
- **CSS** - BEM-like naming, mobile-first, CSS variables, no !important
- **JavaScript** - ES6+ syntax, error handling, modular code, JSDoc comments
- **Git** - Conventional commits, proper .gitignore

### Code Organization

- Clear separation of concerns (HTML/CSS/JS)
- Modular JavaScript functions
- CSS organized by sections with comments
- Comprehensive inline documentation

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on:

- Code of conduct
- Development process
- How to submit pull requests
- Coding standards
- Testing requirements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Harold Flint**
- GitHub: [@haroldflint63](https://github.com/haroldflint63)

## 🙏 Acknowledgments

- [MDN Web Docs](https://developer.mozilla.org/) - Comprehensive web development documentation
- [W3C](https://www.w3.org/) - Web standards and accessibility guidelines
- [CSS-Tricks](https://css-tricks.com/) - CSS techniques and best practices
- [GitHub Pages](https://pages.github.com/) - Free hosting for static sites

## 📚 Resources

- [HTML5 Specification](https://html.spec.whatwg.org/)
- [CSS3 Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript ES6+ Features](https://github.com/lukehoban/es6features)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Accessibility Initiative](https://www.w3.org/WAI/)

---

**Built with ❤️ using HTML5, CSS3, and modern JavaScript**
