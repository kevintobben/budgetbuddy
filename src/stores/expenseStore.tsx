import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ExpenseRow = {
  name: string
  amount: number
  date: string
  category: string
}

type ExpenseStore = {
  expenses: ExpenseRow[]
  addExpense: (expense: ExpenseRow) => void
  removeExpense: (expense: ExpenseRow) => void
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: [],
      addExpense: (expense) => set({ expenses: [...get().expenses, expense] }),
      removeExpense: (expense) =>
        set({ expenses: get().expenses.filter((i) => i !== expense) }),
    }),
    {
      name: "expense-storage",
    }
  )
)
