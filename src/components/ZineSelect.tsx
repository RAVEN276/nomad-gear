import { animate } from 'animejs'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'

export interface ZineSelectOption {
  value: string
  label: string
  badge?: string
}

interface ZineSelectProps {
  id: string
  name?: string
  value: string
  options: ZineSelectOption[]
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  ariaInvalid?: boolean
  disabled?: boolean
  className?: string
  compact?: boolean
}

/**
 * Accessible Lo-Fi Field Zine dropdown listbox replacing native OS select popups.
 */
export function ZineSelect({
  id,
  name,
  value,
  options,
  onChange,
  onBlur,
  placeholder = 'Select option',
  ariaInvalid = false,
  disabled = false,
  className = '',
  compact = false,
}: ZineSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedIndex = options.findIndex((opt) => opt.value === value)
  const [highlightedIndex, setHighlightedIndex] = useState(
    selectedIndex >= 0 ? selectedIndex : 0,
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const listboxId = useId()

  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : undefined

  useEffect(() => {
    if (!isOpen) return

    const idx = options.findIndex((opt) => opt.value === value)
    setHighlightedIndex(idx >= 0 ? idx : 0)

    if (menuRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animate(menuRef.current, {
        opacity: [0, 1],
        translateY: [-6, 0],
        duration: 140,
        ease: 'steps(3)',
      })
    }

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node | null
      if (containerRef.current && target && !containerRef.current.contains(target)) {
        setIsOpen(false)
        onBlur?.()
      }
    }

    const handleCaptureEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleCaptureEscape, true)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleCaptureEscape, true)
    }
  }, [isOpen, onBlur, options, value])

  const commitSelection = (option: ZineSelectOption) => {
    onChange(option.value)
    setIsOpen(false)
    onBlur?.()
    triggerRef.current?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled || options.length === 0) return

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
          return
        }
        setHighlightedIndex((prev) => (prev + 1) % options.length)
        break
      }
      case 'ArrowUp': {
        event.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
          return
        }
        setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length)
        break
      }
      case 'Home': {
        if (!isOpen) return
        event.preventDefault()
        setHighlightedIndex(0)
        break
      }
      case 'End': {
        if (!isOpen) return
        event.preventDefault()
        setHighlightedIndex(options.length - 1)
        break
      }
      case 'Enter':
      case ' ': {
        event.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
          return
        }
        const option = options[highlightedIndex]
        if (option) {
          commitSelection(option)
        }
        break
      }
      case 'Escape': {
        if (!isOpen) return
        event.preventDefault()
        event.stopPropagation()
        setIsOpen(false)
        triggerRef.current?.focus()
        break
      }
      case 'Tab': {
        if (isOpen) {
          setIsOpen(false)
          onBlur?.()
        }
        break
      }
    }
  }

  const activeOptionId = isOpen && options[highlightedIndex]
    ? `${listboxId}-opt-${highlightedIndex}`
    : undefined

  return (
    <div
      className={`zine-select${compact ? ' zine-select--compact' : ''}${isOpen ? ' is-open' : ''}${className ? ` ${className}` : ''}`}
      ref={containerRef}
    >
      {name && <input name={name} type="hidden" value={value} />}
      <button
        aria-activedescendant={activeOptionId}
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-invalid={ariaInvalid}
        className={`zine-select-trigger${ariaInvalid ? ' form-input-error' : ''}${isOpen ? ' is-open' : ''}`}
        disabled={disabled}
        id={id}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        ref={triggerRef}
        role="combobox"
        type="button"
      >
        <span className="zine-select-value-group">
          <span className={`zine-select-value${!selectedOption ? ' is-placeholder' : ''}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.badge && (
            <span className="zine-select-value-badge">{selectedOption.badge}</span>
          )}
        </span>
        <span aria-hidden="true" className="zine-select-caret-box">
          <svg
            className="zine-select-caret"
            fill="none"
            height="14"
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth="2.4"
            viewBox="0 0 16 16"
            width="14"
          >
            <path d="M3 6l5 5 5-5" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul
          className="zine-select-menu"
          id={listboxId}
          ref={menuRef}
          role="listbox"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value
            const isHighlighted = index === highlightedIndex
            return (
              <li
                aria-selected={isSelected}
                className={`zine-select-option${isSelected ? ' is-selected' : ''}${isHighlighted ? ' is-highlighted' : ''}`}
                id={`${listboxId}-opt-${index}`}
                key={option.value}
                onClick={() => commitSelection(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
              >
                <span className="zine-select-option-label">{option.label}</span>
                <span className="zine-select-option-meta">
                  {option.badge && (
                    <span className="zine-select-option-badge">{option.badge}</span>
                  )}
                  {isSelected && (
                    <span aria-hidden="true" className="zine-select-check">OK</span>
                  )}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
