import { animate } from 'animejs'

export function initializeButtonRipples() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const buttons = document.querySelectorAll('.primary-button, .ghost-button, .book-now-button')

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      let ripple = button.querySelector('.ripple')
      if (!ripple) {
        ripple = document.createElement('span')
        ripple.className = 'ripple'
        button.appendChild(ripple)
      }

      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      animate(ripple, {
        opacity: [0.5, 0],
        scale: [0, 2.5],
        duration: 600,
        easing: 'easeOutQuad',
      })
    })
  })
}
