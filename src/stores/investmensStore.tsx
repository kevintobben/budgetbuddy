import { create } from "zustand"
import { persist } from "zustand/middleware"

export type InvestmentsRow = {
  name: string
  symbol: string
  amountInvested: number
  units: number
  pricePerUnit: number
  date: string
  category: string
  note?: string
}

type InvestmentsStore = {
  investments: InvestmentsRow[]
  addInvestment: (investment: InvestmentsRow) => void
  removeInvestment: (investment: InvestmentsRow) => void
}

export const useInvestmentsStore = create<InvestmentsStore>()(
  persist(
    (set, get) => ({
      investments: [],
      addInvestment: (investment) => set({ investments: [...get().investments, investment] }),
      removeInvestment: (investment) =>
        set({ investments: get().investments.filter((i) => i !== investment) }),
    }),
    {
      name: "investment-storage",
    }
  )
)
