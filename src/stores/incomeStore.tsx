import { Key } from "react";
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type IncomeRow = {
  id: Key | null | undefined;
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
      addIncome: (income) =>
        set({
          incomes: [
            ...get().incomes,
            { ...income, id: income.id ?? crypto.randomUUID() },
          ],
        }),
      removeIncome: (income) =>
        set({ incomes: get().incomes.filter((i) => i.id !== income.id) }),
    }),
    {
      name: "income-storage",
    }
  )
)
