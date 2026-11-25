import { useCallback, useMemo, useState, type ReactNode } from 'react'
import MockAccountContext, { type MockAccount } from './MockAccountStore'

const mockAccounts: MockAccount[] = [
  {
    id: 'nomad-user-001',
    label: 'Demo Profile 01',
  },
  {
    id: 'nomad-user-002',
    label: 'Demo Profile 02',
  },
]

export function MockAccountProvider({ children }: { children: ReactNode }) {
  const [activeAccountId, setActiveAccountId] = useState(mockAccounts[0].id)

  const switchAccount = useCallback((nextAccountId: string) => {
    const accountExists = mockAccounts.some((account) => account.id === nextAccountId)
    if (!accountExists) {
      return
    }
    setActiveAccountId(nextAccountId)
  }, [])

  const activeAccount = useMemo(
    () => mockAccounts.find((account) => account.id === activeAccountId) ?? mockAccounts[0],
    [activeAccountId],
  )

  const accountValue = useMemo(
    () => ({
      activeAccount,
      activeAccountId,
      accounts: mockAccounts,
      switchAccount,
    }),
    [activeAccount, activeAccountId, switchAccount],
  )

  return (
    <MockAccountContext.Provider value={accountValue}>
      {children}
    </MockAccountContext.Provider>
  )
}
