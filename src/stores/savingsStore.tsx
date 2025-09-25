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
      // geef elk nieuw item een id als die ontbreekt
      addSavings: (saving) =>
        set({
          savings: [
            ...get().savings,
            { ...saving, id: saving.id ?? crypto.randomUUID() },
          ],
        }),
      // verwijder op id
      removeSavings: (saving) =>
        set({
          savings: get().savings.filter((i) => i.id !== saving.id),
        }),
      // update op id
      updateSavings: (updated) =>
        set({
          savings: get().savings.map((item) =>
            item.id === updated.id ? updated : item
          ),
        }),
    }),
    { name: "saving-storage" }
  )
)
