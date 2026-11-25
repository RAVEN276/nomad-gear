import { createContext } from 'react'

export interface MockAccount {
  id: string
  label: string
}

export interface MockAccountContextValue {
  activeAccount: MockAccount
  activeAccountId: string
  accounts: MockAccount[]
  switchAccount: (nextAccountId: string) => void
}

const MockAccountContext = createContext<MockAccountContextValue | null>(null)

export default MockAccountContext
