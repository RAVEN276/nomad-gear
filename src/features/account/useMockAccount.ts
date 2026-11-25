import { useContext } from 'react'
import MockAccountContext, { type MockAccountContextValue } from './MockAccountStore'

export function useMockAccount(): MockAccountContextValue {
  const accountContext = useContext(MockAccountContext)

  if (!accountContext) {
    throw new Error('useMockAccount must be used within MockAccountProvider')
  }

  return accountContext
}
