# Dorfinex — Digital Consulting & Partnerships

A modern, responsive website for Dorfinex. This website showcases digital consultancy services, business partnerships, and strategies that drive measurable growth.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-first approach
- 🎭 Interactive hero section with dual CTAs
- 🍔 Mobile-friendly navigation
- 📝 Contact form with validation
- 🎯 Smooth scrolling navigation
- 🌟 CSS animations and transitions
- 🔍 SEO optimized
- ⚡ Fast loading performance
- 🚀 GPU-accelerated scroll animations
- ♿ Accessibility compliant

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Interactive functionality with ES6 modules
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Inter)

## Project Structure

```
dorfinex/
├── index.html              # Main HTML file
├── about.html              # About page
├── services.html           # Services page
├── insights.html           # Insights/Blog page
├── contact.html            # Contact page
├── faq.html                # FAQ page
├── css/
│   └── style.css          # Main stylesheet with GPU optimizations
├── js/
│   ├── main.js            # JavaScript functionality
│   └── scroll-utils.js    # Scroll optimization utilities
├── blog/                  # Blog posts
│   ├── ai-transforming-customer-acquisition.html
│   ├── marketing-personalization-scale.html
│   ├── strategic-partnerships-revenue-growth.html
│   ├── data-driven-growth-strategies.html
│   └── 5g-iot-digital-transformation.html
├── assets/
│   └── images/            # Image assets
│       ├── logo.svg       # Company logo
│       └── favicon.svg    # Favicon
├── sitemap.xml            # SEO sitemap
├── robots.txt             # SEO robots file
├── CNAME                  # GitHub Pages custom domain
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- A modern web browser
- A local web server (optional, for development)

### Installation

1. Clone or download the project files
2. Open `index.html` in your web browser
3. For development, use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

## Website Sections

### Hero Section
- **Headline**: "Shaping Digital Growth with Smarter Partnerships"
- **Sub-headline**: We help service providers, enterprises, and technology companies turn strategy into measurable outcomes
- **CTAs**: "Contact" and "Explore Services"

### About Us
- **Headline**: "About Dorfinex"
- **Mission**: Driving innovation to create value, as a catalyst for change, building trust at every step
- **Vision**: To be the most trusted partner in digital transformation

### Services
- **Digital Consulting**: Growth strategy, funnel optimization, GTM plans
- **Partnerships & Ecosystem**: Identify, negotiate, and operationalize partnerships
- **Tech Advisory**: Vendor selection, solution architecture, roadmap alignment
- **AI & Analytics**: AI/ML implementation, analytics strategy, ROI optimization
- **Telecom & ICT**: Product and channel strategies for service providers
- **MarTech Solutions**: Marketing technology stack optimization

### Why Us
- **Outcome-Focused**: We tie work to KPIs and business impact
- **Ecosystem-Led**: Partnerships that unlock distribution and speed
- **Hands-On Delivery**: From strategy to roll-out, not just slides
- **Telecom & Tech DNA**: Deep domain + data-driven decisioning

### Partners & Clients
- **Enterprises & Service Providers**: Strategy and operations optimization
- **Technology Vendors**: Next-generation solution adoption
- **Startups & Innovators**: Digital growth and market expansion
- **Regulators & Industry Bodies**: Policy and framework collaboration

### Insights
- Thought leadership articles and market analyses
- Industry trends and success stories
- AI transformation insights
- Marketing personalization strategies

### Contact
- **Headline**: "Let's co-create measurable growth"
- **Contact Form**: Name, Email, Company, Message
- **CTAs**: "Schedule a Consultation"

## Performance Optimizations

### Scroll Performance
- **GPU Acceleration**: All animations use transform/opacity only
- **requestAnimationFrame**: Optimized scroll handling
- **IntersectionObserver**: One-time animations (no re-triggering)
- **Anti-Flicker**: SVG and icon optimizations
- **Smooth Scroll**: CSS scroll-behavior with reduced motion support

### Technical Features
- **ES6 Modules**: Modern JavaScript architecture
- **Passive Event Listeners**: Better scroll performance
- **Throttled Events**: Optimized scroll handling
- **Cleanup Functions**: Memory leak prevention
- **Accessibility**: prefers-reduced-motion support

## Company Information

### Contact Details

- **Website**: https://dorfinex.com
- **Domain**: dorfinex.com

### Social Media

- **LinkedIn**: https://www.linkedin.com/company/dorfinex/

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Metrics

- **FPS**: 58-60 (optimized scroll)
- **CLS**: < 0.1 (no layout shifts)
- **TBT**: < 200ms (total blocking time)
- **Lighthouse Performance**: > 90

## SEO Features

- Semantic HTML structure
- Meta tags for social sharing
- Open Graph tags
- Schema.org structured data
- Clean URL structure
- Fast loading times
- XML sitemap
- Robots.txt optimization

## Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators
- prefers-reduced-motion support

## Mobile Responsiveness

The website is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)
- Extra small devices (320px - 480px)

## JavaScript Features

- **Mobile Menu**: Hamburger menu for mobile devices
- **Smooth Scrolling**: Smooth navigation to sections
- **Contact Form**: Form validation and submission
- **Optimized Animations**: Scroll-triggered with IntersectionObserver
- **Performance Monitoring**: Console performance logging
- **Error Handling**: Comprehensive error tracking

## CSS Features

- **CSS Grid**: Modern layout system
- **Flexbox**: Flexible component layouts
- **CSS Variables**: Easy customization
- **GPU Accelerated Animations**: Transform and opacity only
- **Media Queries**: Responsive design
- **Modern Selectors**: Advanced CSS selectors
- **Anti-Flicker Optimizations**: SVG and icon stability

## Deployment

### GitHub Pages

The website is configured for GitHub Pages deployment:

1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set custom domain: `dorfinex.com`
4. Configure DNS CNAME record

### Other Static Hosting

The website can be deployed to any static hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repository
- **AWS S3**: Upload files to S3 bucket
- **Firebase Hosting**: Use Firebase CLI

## Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions:

- Email: contact@dorfinex.com
- LinkedIn: https://www.linkedin.com/company/dorfinex/

## Changelog

### Version 3.0.0 (2025-10-13)
- **Rebranding**: Complete rebrand from TechWawes to Dorfinex
- **Domain Migration**: techwawes.com → dorfinex.com
- **Scroll Optimizations**: GPU-accelerated animations with flicker prevention
- **Performance**: requestAnimationFrame + IntersectionObserver implementation
- **Accessibility**: prefers-reduced-motion support
- **ES6 Modules**: Modern JavaScript architecture
- **SEO**: Updated structured data and sitemaps

### Version 2.1.0 (2025-10-11)
- Added legal pages (Privacy Policy, Terms of Service, Cookie Policy)
- Fixed LinkedIn URL consistency
- Removed duplicate folder structure
- Cleaned up template files

### Version 2.0.0 (2024-12-19)
- Complete content transformation to digital consulting focus
- New hero section with dual CTAs
- Updated services and solutions
- Added mission and vision statements
- New "Why Us" section with differentiators
- Partners & Clients section
- Insights section with blog posts
- Updated contact form and CTAs
- Improved responsive design

### Version 1.0.0 (2024-08-06)
- Initial release
- Responsive design
- Interactive features
- Modern UI/UX
- SEO optimization

## Credits

- Design inspiration: Modern consultancy websites
- Icons: Font Awesome
- Fonts: Google Fonts (Inter)
- Performance optimization: GPU acceleration techniques
- Scroll optimization: requestAnimationFrame + IntersectionObserver

---

**Note**: This is the official website for Dorfinex - Digital Consulting & Partnerships. The website features advanced scroll optimizations and GPU-accelerated animations for the best user experience.
