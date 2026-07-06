import { describe, it, expect } from 'vitest'
import { useToastStore } from './useToastStore'

describe('useToastStore', () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] })
  })

  it('initializes with empty toasts', () => {
    const state = useToastStore.getState()
    expect(state.toasts).toEqual([])
  })

  it('adds a toast successfully', () => {
    useToastStore.getState().addToast('Test message', 'success')
    const state = useToastStore.getState()
    
    expect(state.toasts.length).toBe(1)
    expect(state.toasts[0].message).toBe('Test message')
    expect(state.toasts[0].type).toBe('success')
  })

  it('uses default values for toast type and duration', () => {
    useToastStore.getState().addToast('Default toast')
    const state = useToastStore.getState()
    
    expect(state.toasts[0].type).toBe('info')
    expect(state.toasts[0].duration).toBe(5000)
  })

  it('removes a toast by ID', () => {
    useToastStore.getState().addToast('Toast 1')
    useToastStore.getState().addToast('Toast 2')
    
    const state = useToastStore.getState()
    const firstToastId = state.toasts[0].id
    
    useToastStore.getState().removeToast(firstToastId)
    
    const newState = useToastStore.getState()
    expect(newState.toasts.length).toBe(1)
    expect(newState.toasts[0].message).toBe('Toast 2')
  })

  it('generates unique IDs for each toast', () => {
    useToastStore.getState().addToast('Toast 1')
    useToastStore.getState().addToast('Toast 2')
    useToastStore.getState().addToast('Toast 3')
    
    const state = useToastStore.getState()
    const ids = state.toasts.map((t) => t.id)
    
    expect(new Set(ids).size).toBe(3)
  })

  it('supports all toast types', () => {
    useToastStore.getState().addToast('Success', 'success')
    useToastStore.getState().addToast('Error', 'error')
    useToastStore.getState().addToast('Info', 'info')
    useToastStore.getState().addToast('Warning', 'warning')
    
    const state = useToastStore.getState()
    expect(state.toasts.map((t) => t.type)).toEqual([
      'success',
      'error',
      'info',
      'warning',
    ])
  })
})
