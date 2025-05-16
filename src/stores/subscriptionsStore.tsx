import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SubscriptionsRow = {
  name: string
  amount: number
  date: string
  category: string
}

type SubscriptionsStore = {
  subscriptions: SubscriptionsRow[]
  addSubscription: (subscription: SubscriptionsRow) => void
  removeSubscription: (subscription: SubscriptionsRow) => void
}

export const useSubscriptionsStore = create<SubscriptionsStore>()(
  persist(
    (set, get) => ({
      subscriptions: [],
      addSubscription: (subscription) => set({ subscriptions: [...get().subscriptions, subscription] }),
      removeSubscription: (subscription) =>
        set({ subscriptions: get().subscriptions.filter((i) => i !== subscription) }),
    }),
    {
      name: "subscription-storage",
    }
  )
)
