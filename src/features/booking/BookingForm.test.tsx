import { fireEvent, render, screen } from '@testing-library/react'
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
    expect(screen.getByText(/Trip Dates/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/From/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/To/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Group Size/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Notes/i)).toBeInTheDocument()
  })

  it('shows validation error for empty name', async () => {
    renderWithProviders(<BookingForm />)
    
    const submitButton = screen.getByRole('button', { name: /Request Tentative Hold/i })
    fireEvent.click(submitButton)
    
    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument()
  })

  it('shows validation error for invalid email', async () => {
    renderWithProviders(<BookingForm />)
    
    const nameInput = screen.getByLabelText(/Full Name/i)
    const emailInput = screen.getByLabelText(/Email/i)
    const submitButton = screen.getByRole('button', { name: /Request Tentative Hold/i })
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)
    
    expect(await screen.findByText(/Please enter a valid email/i)).toBeInTheDocument()
  })

  it('opens custom dropdown list and calendar popover for group size and trip dates', () => {
    renderWithProviders(<BookingForm />)

    const groupSizeTrigger = screen.getByRole('combobox', { name: /Group Size/i })
    fireEvent.click(groupSizeTrigger)
    fireEvent.click(screen.getByRole('option', { name: /4\+ campers/i }))
    expect(groupSizeTrigger).toHaveTextContent(/4\+ campers/i)

    const fromInput = screen.getByLabelText(/^From$/i)
    fireEvent.click(fromInput)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Today/i }))
    expect((fromInput as HTMLInputElement).value).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
