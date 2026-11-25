import { create } from 'zustand'

export type Theme = 'light' | 'dark'

export interface ThemeState {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

function applyTheme(theme: Theme): void {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme)
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', theme)
  }
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((state) => {
      const newTheme: Theme = state.theme === 'light' ? 'dark' : 'light'
      applyTheme(newTheme)
      return { theme: newTheme }
    }),
  setTheme: (theme) => {
    applyTheme(theme)
    set({ theme })
  },
}))

if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme') as Theme | null
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const initialTheme: Theme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : prefersDark ? 'dark' : 'light'
  applyTheme(initialTheme)
  useThemeStore.setState({ theme: initialTheme })
}
