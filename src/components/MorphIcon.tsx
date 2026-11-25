import { useEffect, useRef } from 'react'
import { useSVGMorph } from '../hooks/useSVGMorph'

export type MorphIconType = 'checkmark' | 'target' | 'chat' | 'star' | 'heart'

interface MorphIconProps {
  type?: MorphIconType
  className?: string
}

function MorphIcon({ type = 'checkmark', className = '' }: MorphIconProps) {
  const iconRef = useRef<SVGSVGElement>(null)
  const { morphIcon } = useSVGMorph()

  useEffect(() => {
    const icon = iconRef.current
    if (!icon) return

    const handleMouseEnter = () => {
      morphIcon(icon, 500)
    }

    icon.addEventListener('mouseenter', handleMouseEnter)
    return () => icon.removeEventListener('mouseenter', handleMouseEnter)
  }, [morphIcon])

  const renderIcon = () => {
    switch (type) {
      case 'checkmark':
        return (
          <svg
            className={className}
            ref={iconRef}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6L9 17l-5-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        )
      case 'target':
        return (
          <svg
            className={className}
            ref={iconRef}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
        )
      case 'chat':
        return (
          <svg
            className={className}
            ref={iconRef}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        )
      case 'star':
        return (
          <svg
            className={className}
            ref={iconRef}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              fill="none"
              points="12 2 15.09 10.26 24 10.27 17.77 16.88 20.16 25.12 12 19.77 3.84 25.12 6.23 16.88 0 10.27 8.91 10.26 12 2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        )
      case 'heart':
        return (
          <svg
            className={className}
            ref={iconRef}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        )
      default:
        return null
    }
  }

  return renderIcon()
}

export default MorphIcon
