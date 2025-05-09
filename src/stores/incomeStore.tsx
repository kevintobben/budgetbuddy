import { create } from "zustand"
import { persist } from "zustand/middleware"

export type IncomeRow = {
  name: string
  amount: number
  date: string
  category: string
}

type IncomeStore = {
  incomes: IncomeRow[]
  addIncome: (income: IncomeRow) => void
  removeIncome: (income: IncomeRow) => void
}

export const useIncomeStore = create<IncomeStore>()(
  persist(
    (set, get) => ({
      incomes: [],
      addIncome: (income) => set({ incomes: [...get().incomes, income] }),
      removeIncome: (income) =>
        set({ incomes: get().incomes.filter((i) => i !== income) }),
    }),
    {
      name: "income-storage",
    }
  )
)
