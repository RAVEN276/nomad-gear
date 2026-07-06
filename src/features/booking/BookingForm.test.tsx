import { render, screen } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/api/queryClient'
import { describe, it, expect } from 'vitest'
import { BookingForm } from './BookingForm'

function renderWithProviders(component: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  )
}

describe('BookingForm', () => {
  it('renders form fields correctly', () => {
    renderWithProviders(<BookingForm />)
    
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Trip Dates/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Group Size/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Notes/i)).toBeInTheDocument()
  })

  it('shows validation error for empty name', async () => {
    renderWithProviders(<BookingForm />)
    
    const submitButton = screen.getByRole('button', { name: /Request Tentative Hold/i })
    await submitButton.click()
    
    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument()
  })

  it('shows validation error for invalid email', async () => {
    renderWithProviders(<BookingForm />)
    
    const nameInput = screen.getByLabelText(/Full Name/i)
    const emailInput = screen.getByLabelText(/Email/i)
    const submitButton = screen.getByRole('button', { name: /Request Tentative Hold/i })
    
    await nameInput.focus()
    await nameInput.blur()
    await emailInput.focus()
    await emailInput.type('invalid-email')
    await emailInput.blur()
    await submitButton.click()
    
    expect(await screen.findByText(/Please enter a valid email/i)).toBeInTheDocument()
  })
})
