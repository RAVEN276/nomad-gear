import { QueryClientProvider } from '@tanstack/react-query'
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { queryClient } from './api/queryClient'
import App from './App'
import { ToastContainer } from './components/ToastContainer'
import { router } from './router'
import { useThemeStore } from './store/useThemeStore'

async function renderApp(initialPath = '/') {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer />
    </QueryClientProvider>,
  )
  await act(async () => {
    await router.navigate(initialPath)
  })
}

describe('Nomad Gear interactive click-through', () => {
  beforeEach(() => {
    localStorage.clear()
    useThemeStore.getState().setTheme('light')
  })

  it('switches hero 3D kit stage tabs, toggles dark/light theme, and opens/closes quick booking modal', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    await renderApp('/')

    expect(screen.getByRole('heading', { level: 1, name: /Pack light\. Pitch fast/i })).toBeInTheDocument()

    // Switch hero kit tab 02 and test 3D camera controls
    const alpineTab = screen.getByRole('tab', { name: /Alpine Basecamp Bundle/i })
    fireEvent.click(alpineTab)
    expect(screen.getByRole('button', { name: /Reserve Alpine Basecamp Bundle/i })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Rotate 3D model left/i }))
    fireEvent.click(screen.getByRole('button', { name: /Rotate 3D model right/i }))
    fireEvent.click(screen.getByRole('button', { name: /Reset 3D model view/i }))

    // Toggle theme light <-> dark
    const themeToggle = screen.getByRole('button', { name: /Switch to dark mode/i })
    fireEvent.click(themeToggle)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(screen.getByRole('button', { name: /Switch to light mode/i })).toBeInTheDocument()

    // Open BookNowModal, test empty validation, valid submit, and Escape close
    fireEvent.click(screen.getByRole('button', { name: /Reserve Alpine Basecamp Bundle/i }))
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()

    fireEvent.click(within(modal).getByRole('button', { name: /Request Tentative Hold/i }))
    expect(within(modal).getByRole('alert')).toHaveTextContent(/Enter your name/i)

    fireEvent.change(within(modal).getByLabelText(/Your Name/i), { target: { value: 'Ari' } })
    fireEvent.change(within(modal).getByLabelText(/Email Address/i), { target: { value: 'ari@example.com' } })
    fireEvent.change(within(modal).getByLabelText(/^From$/i), { target: { value: '2026-12-01' } })
    fireEvent.change(within(modal).getByLabelText(/^To$/i), { target: { value: '2026-12-03' } })
    fireEvent.click(within(modal).getByRole('button', { name: /Request Tentative Hold/i }))
    expect(within(modal).getByText(/Hold request noted for Alpine Basecamp Bundle/i)).toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'Escape' })
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    expect(errorSpy).not.toHaveBeenCalled()
    errorSpy.mockRestore()
  })

  it('filters gear catalog, toggles wishlist, opens mobile menu, and validates newsletter', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    await renderApp('/gear')

    expect(await screen.findByRole('heading', { level: 1, name: /Choose your camp kit/i })).toBeInTheDocument()

    // Filter by Mountain category
    const categorySelect = screen.getByLabelText(/^Category$/i)
    fireEvent.change(categorySelect, { target: { value: 'Mountain' } })
    expect(screen.getByText('Alpine Basecamp Bundle')).toBeInTheDocument()
    expect(screen.queryByText('Weekend Light Kit')).not.toBeInTheDocument()

    // Reset filters
    fireEvent.click(screen.getByRole('button', { name: /Reset Filters/i }))
    expect(screen.getByText('Weekend Light Kit')).toBeInTheDocument()

    // Toggle wishlist
    const wishlistBtn = screen.getByRole('button', { name: /Save Weekend Light Kit to wishlist/i })
    fireEvent.click(wishlistBtn)
    expect(screen.getByRole('button', { name: /Remove Weekend Light Kit from wishlist/i })).toBeInTheDocument()

    // Mobile menu open & close
    fireEvent.click(screen.getByRole('button', { name: /Open navigation menu/i }))
    const mobileDialog = screen.getByRole('dialog', { name: /Mobile navigation/i })
    expect(mobileDialog).toBeInTheDocument()
    fireEvent.click(within(mobileDialog).getByRole('button', { name: /Close navigation menu/i }))
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /Mobile navigation/i })).not.toBeInTheDocument()
    })

    // Newsletter validation
    fireEvent.click(screen.getByRole('button', { name: /Subscribe/i }))
    expect(screen.getByText(/Enter a valid email address/i)).toBeInTheDocument()

    expect(errorSpy).not.toHaveBeenCalled()
    errorSpy.mockRestore()
  })

  it('navigates detail gallery lightbox, review form, booking page, about, roadmap, and 404', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    await renderApp('/gear/weekend-light-kit')

    expect(await screen.findByRole('heading', { level: 1, name: /Weekend Light Kit/i })).toBeInTheDocument()

    // Switch detail view between 3D WebGL Model and Photo Gallery tabs
    expect(screen.getByRole('tab', { name: /3D WebGL Model/i })).toHaveAttribute('aria-selected', 'true')
    fireEvent.click(screen.getByRole('tab', { name: /Photo Gallery/i }))
    expect(screen.getByRole('tab', { name: /Photo Gallery/i })).toHaveAttribute('aria-selected', 'true')

    // Open gallery lightbox and cycle images
    fireEvent.click(screen.getByRole('button', { name: /Open Photo Gallery/i }))
    expect(screen.getByText(/Image 1 of 3/i)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /View next image/i }))
    expect(screen.getByText(/Image 2 of 3/i)).toBeInTheDocument()
    fireEvent.keyDown(window, { key: 'Escape' })
    await waitFor(() => {
      expect(screen.queryByText(/Image 2 of 3/i)).not.toBeInTheDocument()
    })

    // Open review form & submit review
    fireEvent.click(screen.getByRole('button', { name: /Write a Review/i }))
    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Raka' } })
    fireEvent.click(screen.getByRole('button', { name: /Rate 5 out of 5 stars/i }))
    fireEvent.change(screen.getByLabelText(/Your Review/i), { target: { value: 'Solid tent and compact stove.' } })
    fireEvent.click(screen.getByRole('button', { name: /Submit Review/i }))
    expect(await screen.findByText(/Solid tent and compact stove\./i)).toBeInTheDocument()

    // Navigate to booking page via link
    fireEvent.click(screen.getByRole('link', { name: /Full Booking Form/i }))
    expect(await screen.findByRole('heading', { level: 1, name: /Reserve your pickup window/i })).toBeInTheDocument()

    const mainRegion = screen.getByRole('main')
    fireEvent.click(within(mainRegion).getByRole('button', { name: /Request Tentative Hold/i }))
    expect(within(mainRegion).getByText(/Name is required/i)).toBeInTheDocument()

    fireEvent.change(within(mainRegion).getByLabelText(/Full Name/i), { target: { value: 'Raka' } })
    fireEvent.change(within(mainRegion).getByLabelText(/^Email/i), { target: { value: 'raka@example.com' } })
    fireEvent.change(within(mainRegion).getByLabelText(/^From$/i), { target: { value: '2026-12-10' } })
    fireEvent.change(within(mainRegion).getByLabelText(/^To$/i), { target: { value: '2026-12-12' } })
    fireEvent.click(within(mainRegion).getByRole('button', { name: /Request Tentative Hold/i }))
    expect(await within(mainRegion).findByText(/Hold Request Recorded/i)).toBeInTheDocument()

    // Navigate to About, Roadmap, and 404
    await act(async () => {
      await router.navigate('/about')
    })
    expect(await screen.findByRole('heading', { level: 1, name: /Camp without owning a garage full of gear/i })).toBeInTheDocument()

    await act(async () => {
      await router.navigate('/roadmap')
    })
    expect(await screen.findByRole('heading', { level: 1, name: /Product Roadmap/i })).toBeInTheDocument()

    await act(async () => {
      await router.navigate('/unknown-trail')
    })
    expect(await screen.findByRole('heading', { level: 1, name: /Trail not found/i })).toBeInTheDocument()

    expect(errorSpy).not.toHaveBeenCalled()
    errorSpy.mockRestore()
  })
})
