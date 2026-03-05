import { animate } from 'animejs'
import { useEffect, useRef } from 'react'
import { useStaggerAnimation } from '../hooks/useStaggerAnimation'
import { useCounterAnimation } from '../hooks/useCounterAnimation'

const brandValues = [
  {
    icon: '✓',
    title: 'Field-tested quality',
    description:
      'Every tent, stove, and sleep system is checked after each return so your trip starts without gear anxiety.',
  },
  {
    icon: '🎯',
    title: 'Pickup-ready simplicity',
    description:
      'Our kits are packed by trip style, which means less planning overhead and more time outside.',
  },
  {
    icon: '💬',
    title: 'Escape-minded support',
    description:
      'Need destination guidance or weather adjustments? We help you tune your kit before departure.',
  },
]

const storyMilestones = [
  {
    year: 2021,
    title: 'Founded',
    description: 'Two adventurers frustrated with rental complexity launched Nomad Gear.',
  },
  {
    year: 2022,
    title: 'First 100 Kits',
    description: 'We crossed the 100-kit milestone and expanded to neighboring cities.',
  },
  {
    year: 2023,
    title: '50k+ Miles Traveled',
    description: 'Nomad Gear kits hit the road, enabling 50,000+ miles of adventures.',
  },
  {
    year: 2024,
    title: 'National Presence',
    description: 'Now operating in 12 states with 2,500+ gear kits and a dedicated support team.',
  },
]

const impactStats = [
  { label: 'Kits Rented', value: 2500 },
  { label: 'Happy Campers', value: 8000 },
  { label: 'Destinations Reached', value: 350 },
  { label: 'Years of Gear Life', value: 18500 },
]

const teamMembers = [
  {
    name: 'Alex Rivera',
    role: 'Co-founder & CEO',
    bio: 'Mountain hiker with 15 years of backcountry experience. Built Nomad Gear to eliminate gear hassles.',
  },
  {
    name: 'Jordan Chen',
    role: 'Co-founder & COO',
    bio: 'Operations specialist passionate about customer experience. Ensures every kit is adventure-ready.',
  },
  {
    name: 'Casey Thompson',
    role: 'Head of Gear Operations',
    bio: 'Former gear guide with deep product knowledge. Curates every kit for quality and durability.',
  },
  {
    name: 'Morgan Lee',
    role: 'Customer Support Lead',
    bio: 'Dedicated to making your trip smooth. Loves helping adventurers prepare for the outdoors.',
  },
]

const testimonials = [
  {
    quote: "Nomad Gear saved our camping trip. The kit was perfectly packed and their team answered all our questions. Worth every penny.",
    author: 'Sarah & Mike',
    rating: 5,
  },
  {
    quote: 'Finally, a rental service that gets it. Quality gear, no hassle, and the support was incredible.',
    author: 'Lisa K.',
    rating: 5,
  },
  {
    quote: 'Great service and attention to detail. We used Nomad Gear three times last season and never looked back.',
    author: 'David M.',
    rating: 5,
  },
]

function AboutPage() {
  const valueCardsRef = useRef([])
  const storyCardsRef = useRef([])
  const teamCardsRef = useRef([])
  const testimonialCardsRef = useRef([])
  const statCountersRef = useRef([])

  useStaggerAnimation('.about-overlay .about-card', {
    opacity: [0, 1],
    y: [25, 0],
    duration: 600,
    delay: (el, i) => i * 100,
  })

  const handleCardHover = (ref, index, isEnter) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!ref.current[index]) return

    const card = ref.current[index]
    animate(card, {
      scale: isEnter ? 1.06 : 1,
      y: isEnter ? -12 : 0,
      duration: 300,
      easing: 'easeOutQuad',
    })
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Animate stat cards and counters on scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('stat-animated')) {
            entry.target.classList.add('stat-animated')
            
            const counter = entry.target.querySelector('.stat-counter')
            const targetValue = parseInt(counter.dataset.target, 10)

            // Animate the card entrance
            animate(entry.target, {
              opacity: [0, 1],
              y: [20, 0],
              duration: 500,
              easing: 'easeOutQuad',
            })

            // Animate the counter number
            if (counter && targetValue) {
              animate(
                { value: 0 },
                {
                  value: targetValue,
                  duration: 1800,
                  easing: 'easeOutQuad',
                  update(anim) {
                    const currentValue = Math.floor(anim.progress * targetValue)
                    counter.textContent = currentValue.toLocaleString()
                  },
                  complete() {
                    counter.textContent = targetValue.toLocaleString()
                  },
                }
              )
            }
          }
        })
      },
      { threshold: 0.2, rootMargin: '50px' }
    )

    statCountersRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="page-shell section-block page-top-space">
      <header className="page-header reveal">
        <p className="eyebrow">About Nomad Gear</p>
        <h1>Built for people who need more horizon.</h1>
        <p>
          We believe great adventures start with great gear. Nomad Gear eliminates
          the hassle of camping equipment ownership, so you can focus on the escape.
        </p>
      </header>

      {/* Mission & Vision Section */}
      <section className="about-mission reveal">
        <p className="mission-statement">
          Our mission is to democratize the outdoor experience by making premium camping
          accessible, affordable, and absolutely effortless.
        </p>
        <p className="mission-vision">
          We envision a world where anyone can escape to nature without the burden of
          buying, maintaining, or storing specialized gear.
        </p>
      </section>

      <div className="section-divider" />

      {/* Story Timeline Section */}
      <section className="about-section">
        <p className="eyebrow">Our Story</p>
        <h2>From frustration to freedom</h2>
        <p className="section-subtitle">
          Nomad Gear was born from a simple realization: great adventures shouldn't
          require a garage full of expensive gear.
        </p>

        <div className="story-timeline">
          {storyMilestones.map((milestone, index) => (
            <div
              ref={(el) => {
                if (el) storyCardsRef.current[index] = el
              }}
              className="story-card reveal"
              key={milestone.year}
            >
              <div className="story-year">{milestone.year}</div>
              <h3>{milestone.title}</h3>
              <p>{milestone.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Core Values Section */}
      <section className="about-section">
        <p className="eyebrow">Why We're Different</p>
        <h2>Our core values</h2>

        <div className="about-overlay">
          <div className="about-grid">
            {brandValues.map((value, index) => (
              <article
                ref={(el) => {
                  if (el) valueCardsRef.current[index] = el
                }}
                className="about-card reveal"
                key={value.title}
                onMouseEnter={() => handleCardHover(valueCardsRef, index, true)}
                onMouseLeave={() => handleCardHover(valueCardsRef, index, false)}
              >
                <div className="card-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Impact Stats Section */}
      <section className="about-section">
        <p className="eyebrow">Our Impact</p>
        <h2>By the numbers</h2>

        <div className="stats-grid">
          {impactStats.map((stat, index) => (
            <div
              ref={(el) => {
                if (el) statCountersRef.current[index] = el
              }}
              className="stat-card reveal"
              key={stat.label}
            >
              <div className="stat-counter" data-target={stat.value}>
                0
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Team Section */}
      <section className="about-section">
        <p className="eyebrow">Meet the Team</p>
        <h2>People behind the gear</h2>
        <p className="section-subtitle">
          A dedicated group of outdoor enthusiasts committed to making your adventure seamless.
        </p>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div
              ref={(el) => {
                if (el) teamCardsRef.current[index] = el
              }}
              className="team-card reveal"
              key={member.name}
              onMouseEnter={() => handleCardHover(teamCardsRef, index, true)}
              onMouseLeave={() => handleCardHover(teamCardsRef, index, false)}
            >
              <div className="team-avatar">{member.name.charAt(0)}</div>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Testimonials Section */}
      <section className="about-section">
        <p className="eyebrow">Customer Love</p>
        <h2>What adventurers are saying</h2>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <article
              ref={(el) => {
                if (el) testimonialCardsRef.current[index] = el
              }}
              className="testimonial-card reveal"
              key={testimonial.author}
            >
              <div className="testimonial-rating">
                {Array(testimonial.rating)
                  .fill()
                  .map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <p className="testimonial-author">— {testimonial.author}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}

export default AboutPage