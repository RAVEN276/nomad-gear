import { useEffect, useRef } from 'react'
import { useSVGMorph } from '../hooks/useSVGMorph'

interface MorphHamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
}

function MorphHamburgerButton({ isOpen, onClick }: MorphHamburgerButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { morphHamburger } = useSVGMorph()

  useEffect(() => {
    if (buttonRef.current) {
      morphHamburger(buttonRef.current, isOpen)
    }
  }, [isOpen, morphHamburger])

  return (
    <button
      ref={buttonRef}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      className="morph-hamburger-button"
      onClick={onClick}
      type="button"
    >
      <svg
        aria-hidden="true"
        height="20"
        viewBox="0 0 24 24"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line className="hamburger-line-morph" x1="3" x2="21" y1="6" y2="6" />
        <line className="hamburger-line-morph" x1="3" x2="21" y1="12" y2="12" />
        <line className="hamburger-line-morph" x1="3" x2="21" y1="18" y2="18" />
      </svg>
      <span>{isOpen ? 'Close' : 'Menu'}</span>
    </button>
  )
}

export default MorphHamburgerButton
