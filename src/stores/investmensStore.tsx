import { create } from "zustand"
import { persist } from "zustand/middleware"

export type InvestmentsRow = {
  name: string
  symbol: string
  amountInvested: number
  unitsReceived: number
  pricePerUnit: number
  date: string
  category: string
  note?: string
}

type InvestmentsStore = {
  investments: InvestmentsRow[]
  addInvestment: (investment: InvestmentsRow) => void
  removeInvestment: (investment: InvestmentsRow) => void
  updateInvestment: (oldInvestment: InvestmentsRow, newInvestment: InvestmentsRow) => void
  getCountByCategory: (category: string) => number
}

export const useInvestmentsStore = create<InvestmentsStore>()(
  persist(
    (set, get) => ({
      investments: [],
      addInvestment: (investment) => {
        // Zorg ervoor dat amountInvested wordt berekend als het niet is ingesteld
        const calculatedInvestment = { 
          ...investment,
          // Zorg ervoor dat de categorie altijd correct is opgeslagen
          category: investment.category,
          amountInvested: investment.amountInvested || 
            parseFloat((investment.pricePerUnit * investment.unitsReceived).toFixed(2))
        };
        set({ investments: [...get().investments, calculatedInvestment] });
      },
      removeInvestment: (investment) =>
        set({ investments: get().investments.filter((i) => i !== investment) }),
      updateInvestment: (oldInvestment, newInvestment) => {
        // Zorg ervoor dat amountInvest is berekend voor de bijgewerkte investering
        const calculatedInvestment = { 
          ...newInvestment,
          // Zorg ervoor dat de categorie altijd correct is opgeslagen
          category: newInvestment.category,
          amountInvested: newInvestment.amountInvested || 
            parseFloat((newInvestment.pricePerUnit * newInvestment.unitsReceived).toFixed(2))
        };
        set({ 
          investments: get().investments.map((i) => 
            i === oldInvestment ? calculatedInvestment : i
          ) 
        });
      },
      // Helper functie om het aantal investeringen per categorie te tellen
      getCountByCategory: (category) => {
        return get().investments.filter(i => i.category === category).length;
      },
    }),
    {
      name: "investment-storage",
    }
  )
)
