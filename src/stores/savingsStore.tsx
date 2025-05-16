import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SavingsRow = {
  name: string
  amount: number
  date: string
  category: string
}

type SavingsStore = {
  savings: SavingsRow[]
  addSavings: (saving: SavingsRow) => void
  removeSavings: (saving: SavingsRow) => void
}

export const useSavingsStore = create<SavingsStore>()(
  persist(
    (set, get) => ({
      savings: [],
      addSavings: (saving) => set({ savings: [...get().savings, saving] }),
      removeSavings: (saving) =>
        set({ savings: get().savings.filter((i) => i !== saving) }),
    }),
    {
      name: "saving-storage",
    }
  )
)
