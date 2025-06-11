import { create } from 'zustand';

export interface FixedExpenseRow {
  name: string;
  amount: number;
  date: string;
  category: string;
  [key: string]: unknown;
}

interface FixedExpensesState {
  fixedExpenses: FixedExpenseRow[];
  addFixedExpense: (fixedExpense: FixedExpenseRow) => void;
  removeFixedExpense: (fixedExpense: FixedExpenseRow) => void;
}

export const useFixedExpensesStore = create<FixedExpensesState>((set) => ({
  fixedExpenses: [],
  addFixedExpense: (fixedExpense) => 
    set((state) => ({ 
      fixedExpenses: [...state.fixedExpenses, fixedExpense] 
    })),
  removeFixedExpense: (fixedExpense) => 
    set((state) => ({ 
      fixedExpenses: state.fixedExpenses.filter((s) => s.name !== fixedExpense.name) 
    })),
}));