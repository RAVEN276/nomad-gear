import { useThemeStore } from '@/store/useThemeStore'
import './ThemeToggle.css'

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()
  const isLight = theme === 'light'

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      aria-pressed={!isLight}
      type="button"
    >
      <span className="theme-icon" aria-hidden="true">
        {isLight ? (
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="10" cy="10" r="3.5" />
            <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4" />
          </svg>
        )}
      </span>
      <span className="theme-text">{isLight ? 'Dark' : 'Light'}</span>
    </button>
  )
}
