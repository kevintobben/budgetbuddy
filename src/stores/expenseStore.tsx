import { Key } from "react";
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ExpenseRow = {
  id: Key | null | undefined;
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
      addExpense: (expense) =>
        set({
          expenses: [
            ...get().expenses,
            { ...expense, id: expense.id ?? crypto.randomUUID() },
          ],
        }),
      removeExpense: (expense) =>
        set({ expenses: get().expenses.filter((i) => i.id !== expense.id) }),
    }),
    {
      name: "expense-storage",
    }
  )
)
