import { animate } from 'animejs'
import { useEffect, useId, useMemo, useRef, useState } from 'react'

interface ZineDatePickerProps {
  id: string
  name?: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  min?: string
  max?: string
  rangeStart?: string
  rangeEnd?: string
  ariaInvalid?: boolean
  required?: boolean
  placeholder?: string
  className?: string
}

interface YearMonth {
  year: number
  month: number
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function pad2(num: number): string {
  return String(num).padStart(2, '0')
}

function formatIsoDate(year: number, month: number, day: number): string {
  return `${year}-${pad2(month + 1)}-${pad2(day)}`
}

function parseIsoDate(iso: string): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2]) - 1
  const day = Number(match[3])
  if (month < 0 || month > 11 || day < 1 || day > 31) return null
  const check = new Date(year, month, day)
  if (
    check.getFullYear() !== year ||
    check.getMonth() !== month ||
    check.getDate() !== day
  ) {
    return null
  }
  return { year, month, day }
}

function getTodayIso(): string {
  const now = new Date()
  return formatIsoDate(now.getFullYear(), now.getMonth(), now.getDate())
}

function resolveInitialViewMonth(value: string, min?: string, rangeStart?: string): YearMonth {
  const parsed =
    parseIsoDate(value) ??
    (rangeStart ? parseIsoDate(rangeStart) : null) ??
    (min ? parseIsoDate(min) : null)
  if (parsed) {
    return { year: parsed.year, month: parsed.month }
  }
  const now = new Date()
  return { year: now.getFullYear(), month: now.getMonth() }
}

/**
 * Lo-Fi Field Zine date input with a themed calendar popover supporting
 * direct YYYY-MM-DD entry, range highlights, min/max guards, and keyboard close.
 */
export function ZineDatePicker({
  id,
  name,
  value,
  onChange,
  onBlur,
  min,
  max,
  rangeStart,
  rangeEnd,
  ariaInvalid = false,
  required = false,
  placeholder = 'YYYY-MM-DD',
  className = '',
}: ZineDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState<YearMonth>(() =>
    resolveInitialViewMonth(value, min, rangeStart),
  )
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const popoverId = useId()
  const todayIso = getTodayIso()

  useEffect(() => {
    const parsed = parseIsoDate(value)
    if (parsed) {
      setViewMonth({ year: parsed.year, month: parsed.month })
    }
  }, [value])

  useEffect(() => {
    if (!isOpen) return

    setViewMonth(resolveInitialViewMonth(value, min, rangeStart))

    if (popoverRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animate(popoverRef.current, {
        opacity: [0, 1],
        translateY: [-6, 0],
        duration: 150,
        ease: 'steps(3)',
      })
    }

    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node | null
      if (wrapperRef.current && target && !wrapperRef.current.contains(target)) {
        setIsOpen(false)
        onBlur?.()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        setIsOpen(false)
        inputRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleEscape, true)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleEscape, true)
    }
  }, [isOpen, min, onBlur, rangeStart, value])

  const calendarCells = useMemo(() => {
    const firstWeekday = new Date(viewMonth.year, viewMonth.month, 1).getDay()
    const daysInMonth = new Date(viewMonth.year, viewMonth.month + 1, 0).getDate()
    const cells: Array<{ day: number; iso: string } | null> = []

    for (let i = 0; i < firstWeekday; i += 1) {
      cells.push(null)
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push({
        day,
        iso: formatIsoDate(viewMonth.year, viewMonth.month, day),
      })
    }
    return cells
  }, [viewMonth.month, viewMonth.year])

  const shiftMonth = (delta: number) => {
    setViewMonth((prev) => {
      const shifted = new Date(prev.year, prev.month + delta, 1)
      return { year: shifted.getFullYear(), month: shifted.getMonth() }
    })
  }

  const pickDate = (iso: string) => {
    if ((min && iso < min) || (max && iso > max)) return
    onChange(iso)
    setIsOpen(false)
    onBlur?.()
    inputRef.current?.focus()
  }

  const normalizedStart = rangeStart && rangeEnd && rangeStart <= rangeEnd ? rangeStart : ''
  const normalizedEnd = rangeStart && rangeEnd && rangeStart <= rangeEnd ? rangeEnd : ''

  return (
    <div
      className={`zine-datepicker${isOpen ? ' is-open' : ''}${className ? ` ${className}` : ''}`}
      ref={wrapperRef}
    >
      <div className={`zine-date-control${ariaInvalid ? ' form-input-error' : ''}`}>
        <input
          aria-controls={popoverId}
          aria-expanded={isOpen}
          aria-invalid={ariaInvalid}
          autoComplete="off"
          className="zine-date-input"
          id={id}
          inputMode="numeric"
          name={name}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
          onClick={() => setIsOpen(true)}
          placeholder={placeholder}
          ref={inputRef}
          required={required}
          type="text"
          value={value}
        />
        <button
          aria-controls={popoverId}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close calendar' : 'Open calendar'}
          className={`zine-date-toggle${isOpen ? ' is-open' : ''}`}
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
        >
          <svg
            aria-hidden="true"
            fill="none"
            height="17"
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="17"
          >
            <rect height="16" width="18" x="3" y="5" />
            <path d="M8 2v4M16 2v4M3 10h18" />
            <rect fill="currentColor" height="3" stroke="none" width="3" x="7" y="13" />
            <rect fill="currentColor" height="3" stroke="none" width="3" x="14" y="13" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          aria-label={`${MONTH_NAMES[viewMonth.month]} ${viewMonth.year} calendar`}
          className="zine-calendar-popover"
          id={popoverId}
          ref={popoverRef}
          role="dialog"
        >
          <div className="zine-cal-header">
            <button
              aria-label="Previous month"
              className="zine-cal-nav"
              onClick={() => shiftMonth(-1)}
              type="button"
            >
              &lt;
            </button>
            <span className="zine-cal-month">
              {MONTH_NAMES[viewMonth.month]} {viewMonth.year}
            </span>
            <button
              aria-label="Next month"
              className="zine-cal-nav"
              onClick={() => shiftMonth(1)}
              type="button"
            >
              &gt;
            </button>
          </div>

          <div aria-hidden="true" className="zine-cal-weekdays">
            {WEEKDAYS.map((weekday) => (
              <span className="zine-cal-weekday" key={weekday}>
                {weekday}
              </span>
            ))}
          </div>

          <div className="zine-cal-grid" role="grid">
            {calendarCells.map((cell, index) => {
              if (!cell) {
                return <span aria-hidden="true" className="zine-cal-spacer" key={`pad-${index}`} />
              }

              const isDisabled = Boolean((min && cell.iso < min) || (max && cell.iso > max))
              const isSelected = cell.iso === value
              const isToday = cell.iso === todayIso
              const isInRange = Boolean(
                normalizedStart &&
                  normalizedEnd &&
                  cell.iso > normalizedStart &&
                  cell.iso < normalizedEnd,
              )
              const isRangeEndpoint = Boolean(
                (normalizedStart && cell.iso === normalizedStart) ||
                  (normalizedEnd && cell.iso === normalizedEnd),
              )

              return (
                <button
                  aria-label={cell.iso}
                  aria-pressed={isSelected}
                  className={[
                    'zine-cal-day',
                    isSelected ? 'is-selected' : '',
                    isToday ? 'is-today' : '',
                    isInRange ? 'is-in-range' : '',
                    isRangeEndpoint ? 'is-range-endpoint' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  disabled={isDisabled}
                  key={cell.iso}
                  onClick={() => pickDate(cell.iso)}
                  type="button"
                >
                  {cell.day}
                </button>
              )
            })}
          </div>

          <div className="zine-cal-footer">
            <span className="zine-cal-readout">{value || 'NO DATE SET'}</span>
            <div className="zine-cal-footer-actions">
              {(!min || todayIso >= min) && (!max || todayIso <= max) && (
                <button
                  className="zine-cal-action"
                  onClick={() => pickDate(todayIso)}
                  type="button"
                >
                  Today
                </button>
              )}
              {value && (
                <button
                  className="zine-cal-action"
                  onClick={() => {
                    onChange('')
                    setIsOpen(false)
                  }}
                  type="button"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
