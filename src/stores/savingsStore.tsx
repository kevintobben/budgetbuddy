import { Key } from "react";
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SavingsRow = {
  id: Key | null | undefined;
  name: string;
  amount: number;
  goal?: number;
  date: string
  category: string
}

type SavingsStore = {
  updateSavings(editingSavings: SavingsRow): unknown;
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
      updateSavings: (updated: SavingsRow) =>
        set({
          savings: get().savings.map((item) =>
            item.name === updated.name ? updated : item
          ),
        }),
    }),
    {
      name: "saving-storage",
    }
  )
)
