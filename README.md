# ⛺ Nomad Gear

> Premium camping equipment rental platform with full-motion animations and seamless user experience

Nomad Gear is a modern React application that reimagines outdoor gear rental. Built with performance and user experience in mind, it features comprehensive animations, intelligent search, responsive design, and a professional booking workflow.

---

## ✨ Features

### 🎬 Full-Motion Animations
- **Custom Animation Hooks**: 5 specialized hooks (ripple, shake, loading, parallax, blur-up)
- **Form Interactions**: Error shake animations, success celebrations with elastic bounce
- **Modal Transitions**: Smooth open/close animations with staggered elements
- **Button Ripples**: Global ripple effects on all interactive elements
- **Scroll Animations**: Parallax effects and scroll-triggered counter animations
- **Accessibility**: All animations respect `prefers-reduced-motion`

### 🔍 Smart Search
- **Live Filtering**: Real-time gear search across name and description
- **Inline Results**: Dropdown displays up to 5 matching items with pricing
- **Keyboard Accessible**: Full keyboard navigation support
- **Mobile Optimized**: Search integrated into mobile menu

### 📱 Responsive Design
- **Mobile Menu**: Hamburger navigation at 960px breakpoint with slide animation
- **Adaptive Layouts**: Optimized for desktop, tablet, and mobile viewports
- **Touch Friendly**: Enhanced tap targets and gestures for mobile devices

### 📖 Professional Content
- **About Page**: 6-section company narrative with mission, timeline, values, stats, team, and testimonials
- **Counter Animations**: Stats animate from 0 to target value on scroll
- **Timeline Layout**: Visual company story with milestone cards
- **Team Profiles**: Professional team member bios with avatar initials

### 🛒 Booking System
- **Quick Modal**: Fast booking flow from any page
- **Full Form**: Comprehensive booking page with validation
- **Date Validation**: Prevents past dates and ensures valid date ranges
- **Form Feedback**: Visual error indicators with shake animations
- **Success States**: Celebration animations on successful booking

### 🎨 Modern UI/UX
- **Sage Color Palette**: Professional earth-tone design system
- **Typography**: Responsive clamp-based sizing for optimal readability
- **Sticky Navigation**: Context-aware floating navbar
- **Trust Signals**: Footer badges for carbon neutral, verified reviews, secure checkout
- **Hover States**: Smooth transitions on all interactive elements

---

## 🛠️ Tech Stack

### Core
- **React 19.2.0** - UI library with latest features
- **Vite 8.0.0-beta.16** - Lightning-fast build tool
- **Bun** - Fast package manager and runtime

### Routing & Navigation
- **react-router-dom 7.13.1** - Client-side routing with modern navigation

### Animations
- **Anime.js 4.3.6** - Powerful animation engine
- **Custom Hooks** - Reusable animation utilities (ripple, shake, loading, parallax, blur-up)
- **Intersection Observer** - Scroll-triggered animations

### Performance
- **Lozad** - Lazy loading for images
- **Code Splitting** - Route-based lazy loading
- **Optimized Builds** - Vite's rollup-based bundling (23.84 kB CSS, 362.17 kB JS gzipped)

### Developer Experience
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization
- **Hot Module Replacement** - Instant feedback during development

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed on your system

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nomad-gear.git

# Navigate to project directory
cd nomad-gear

# Install dependencies
bun install
```

### Development

```bash
# Start development server
bun run dev
```

Visit `http://localhost:5173` (or next available port)

### Production

```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

### Code Quality

```bash
# Run ESLint
bun run lint
```

---

## 📁 Project Structure

```
nomad-gear/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── FloatingNav.jsx       # Enhanced navbar with search & mobile menu
│   │   ├── Footer.jsx            # Multi-column footer
│   │   └── GearCard.jsx          # Gear listing card
│   ├── data/            # Static data and mocks
│   │   └── gear.js              # Gear catalog data
│   ├── features/        # Feature-specific modules
│   │   └── booking/             # Booking system
│   ├── hooks/           # Custom React hooks
│   │   ├── useRippleAnimation.js
│   │   ├── useShakeAnimation.js
│   │   ├── useLoadingAnimation.js
│   │   ├── useParallaxScroll.js
│   │   └── useBlurUpImage.js
│   ├── layout/          # Layout components
│   │   └── AppLayout.jsx
│   ├── pages/           # Route pages
│   │   ├── HomePage.jsx
│   │   ├── GearPage.jsx
│   │   ├── GearDetailPage.jsx
│   │   ├── BookingPage.jsx
│   │   ├── AboutPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── styles/          # CSS modules
│   │   ├── base.css             # Base styles & animations
│   │   ├── components.css       # Component styles
│   │   └── pages.css            # Page-specific styles
│   ├── utils/           # Utility functions
│   │   └── buttonRipple.js      # Global ripple utility
│   ├── App.jsx          # Root component with routing
│   └── main.jsx         # Application entry point
├── eslint.config.js     # ESLint configuration
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

---

## 🗺️ Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero and featured gear |
| `/gear` | Full gear catalog with filtering |
| `/gear/:slug` | Individual gear detail page |
| `/booking` | Comprehensive booking form |
| `/about` | Company story, mission, team, and testimonials |
| `*` | 404 Not Found with wobble animation |

---

## 🎨 Key Components

### FloatingNav
Enhanced sticky navigation with:
- Live gear search with dropdown results
- Mobile hamburger menu (triggers at 960px)
- Smooth transitions and animations
- Brand logo with emoji

### Footer
Professional multi-column footer featuring:
- Company, Support, Legal, and Connect sections
- Contact information (email, phone, hours)
- Trust badges (Carbon Neutral, Verified Reviews, Secure Checkout)
- Responsive layout (2-column → 1-column on mobile)

### AboutPage
Comprehensive company narrative with:
- Mission & Vision statement
- Company timeline (2021-2024 milestones)
- Core values with visual icons
- Impact statistics with counter animations
- Team member profiles
- Customer testimonials with ratings

### BookingPage
Full-featured booking workflow:
- Date range selection with validation
- Guest count and gear selection
- Form validation with error shake animations
- Success celebration on submission

### BookNowModal
Quick booking modal with:
- Smooth open/close animations
- Staggered element reveals
- Form fields with validation
- Navigate to full booking page option

---

## 🎬 Animation System

### Custom Hooks

**useRippleAnimation**
- Creates click ripple effects on buttons
- Configurable color and duration
- Auto-cleanup on unmount

**useShakeAnimation**
- Triggers shake animation for errors
- Configurable intensity (default 8px)
- Perfect for form validation feedback

**useLoadingAnimation**
- Rotating spinner animation
- 1200ms linear loop
- Used in loading states

**useParallaxScroll**
- Scroll-based parallax effects
- Configurable strength (default 0.5)
- Applied to hero images

**useBlurUpImage**
- Progressive image loading effect
- Blur 10px → 0px transition
- Opacity fade-in for polished UX

### Global Utilities

**buttonRipple.js**
- Automatically applies ripple to `.primary-button`, `.ghost-button`
- Animates from click position
- 600ms duration with easeOutQuad

### CSS Animations

Keyframe animations for:
- `shake` - Form error feedback
- `spin` - Loading states
- `focusGlow` - Input focus effects
- `successPulse` - Success confirmations
- `wobble` - Playful 404 page
- `slideIn` - Content reveals

---

## 📦 Scripts Reference

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with HMR |
| `bun run build` | Build optimized production bundle |
| `bun run preview` | Preview production build locally |
| `bun run lint` | Run ESLint checks |

---

## 🎯 Performance

### Build Output
- **CSS**: 23.84 kB (5.38 kB gzipped)
- **JavaScript**: 362.17 kB (115.29 kB gzipped)
- **Modules**: 100 transformed modules
- **Build Time**: ~600ms

### Optimizations
- Route-based code splitting
- Lazy loading for images and components
- CSS purging in production
- Minification and tree-shaking
- Efficient bundle chunking

---

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Vite](https://vite.dev/)
- Animations by [Anime.js](https://animejs.com/)
- Package management by [Bun](https://bun.sh/)

---

## 📧 Contact

For questions or feedback, reach out at **hello@nomadgear.com**

---

**Made with ❤️ for outdoor enthusiasts**
