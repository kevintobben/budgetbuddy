import { Key } from 'react';
import { create } from 'zustand';

export interface FixedExpenseRow {
  id: Key | null | undefined;
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
      fixedExpenses: [
        ...state.fixedExpenses,
        { ...fixedExpense, id: fixedExpense.id ?? crypto.randomUUID() },
      ],
    })),
  removeFixedExpense: (fixedExpense) =>
    set((state) => ({
      fixedExpenses: state.fixedExpenses.filter((s) => s.id !== fixedExpense.id),
    })),
}));