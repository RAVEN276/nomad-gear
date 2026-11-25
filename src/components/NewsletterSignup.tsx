import { animate, createDrawable } from 'animejs'
import { useRef, useState, type FormEvent } from 'react'
import { subscribeToNewsletter } from '../utils/newsletter'

type NewsletterStatus = 'idle' | 'loading' | 'success' | 'error'

function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<NewsletterStatus>('idle')
  const [feedback, setFeedback] = useState('')
  const iconSvgRef = useRef<SVGSVGElement>(null)

  const animateMailIcon = () => {
    if (!iconSvgRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const paths = iconSvgRef.current.querySelectorAll('path, rect')
    if (!paths.length) return
    const drawables = Array.from(paths).map((p) => createDrawable(p))
    animate(drawables, {
      draw: ['0 0', '0 1'],
      duration: 550,
      ease: 'outQuad',
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedEmail = email.trim()
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setStatus('error')
      setFeedback('Enter a valid email address (for example, name@example.com).')
      return
    }

    setStatus('loading')
    setFeedback('Subscribing...')
    animateMailIcon()

    try {
      await subscribeToNewsletter(normalizedEmail)
      setStatus('success')
      setFeedback('Subscribed. You will receive field notes and kit release updates.')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setFeedback(error instanceof Error ? error.message : 'Unable to subscribe right now.')
    }
  }

  return (
    <section className="newsletter-band" id="newsletter-signup">
      <div className="page-shell newsletter-band-inner reveal-item">
        <div className="newsletter-copy">
          <div className="newsletter-icon-mark" aria-hidden="true">
            <svg ref={iconSvgRef} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="8" width="22" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M4 8 L15 16 L26 8" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </div>
          <p className="eyebrow">Dispatch</p>
          <h2>Field Notes and Kit Updates</h2>
          <p>
            Receive seasonal packing notes, new kit additions, and pickup window notices.
          </p>
        </div>

        <form className="newsletter-form" noValidate onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="newsletter-email">
            Email address
          </label>
          <div className="newsletter-input-row">
            <input
              aria-describedby="newsletter-feedback"
              aria-invalid={status === 'error'}
              className={`form-input newsletter-input ${status === 'error' ? 'form-input-error' : ''}`}
              id="newsletter-email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              type="email"
              value={email}
              required
            />
            <button
              className="primary-button newsletter-submit"
              disabled={status === 'loading'}
              type="submit"
            >
              {status === 'loading' ? 'Submitting...' : 'Subscribe'}
            </button>
          </div>
          <p
            className={`newsletter-feedback newsletter-feedback-${status}`}
            id="newsletter-feedback"
            role="status"
          >
            {feedback || 'No spam. Unsubscribe at any time.'}
          </p>
        </form>
      </div>
    </section>
  )
}

export default NewsletterSignup
