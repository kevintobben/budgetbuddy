import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { InvestmentsRow } from "@/stores/investmensStore";
import { IncomeRow } from "@/stores/incomeStore";
import { ExpenseRow } from "@/stores/expenseStore";
import { FixedExpenseRow } from "@/stores/fixedExpensesStore";

// Union types voor verschillende rijen in de tabel
export type TableRowType = InvestmentsRow | IncomeRow | ExpenseRow | FixedExpenseRow;

// Algemene kolomconfiguratie
interface ColumnConfig<T> {
  header: string;
  key: keyof T;
  render?: (value: unknown, row?: T) => React.ReactNode;
}

// Geld formatter functie
export const formatCurrency = (value: string | number) =>
  new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value));

// Date formatter functie
export const formatDate = (value: string | number) =>
  new Date(String(value)).toLocaleDateString("nl-NL");

// Genenereerde kolom voor acties (bewerken/verwijderen)
export const createActionsColumn = <T extends TableRowType>(
  onEdit: (row: T) => void,
  onDelete: (row: T) => void
): ColumnConfig<T> => ({
  header: "Acties",
  key: "name" as keyof T,
  render: (_: unknown, row?: T) => 
    row ? (
      <div className="flex gap-2">
        <button onClick={() => onEdit(row)} title="Bewerk">
          <Pencil size={18} />
        </button>
        <button onClick={() => onDelete(row)} title="Verwijder">
          <Trash2 size={18} />
        </button>
      </div>
    ) : null,
});

// Algemene kolommen die in verschillende tabellen gebruikt kunnen worden
export const createCommonColumns = <T extends TableRowType>(
  includedColumns: Array<keyof T>,
  onEdit: (row: T) => void,
  onDelete: (row: T) => void
) => {
  const columnsMap: Record<string, ColumnConfig<T>> = {
    name: { header: "Naam", key: "name" as keyof T },
    symbol: { 
      header: "Symbol", 
      key: "symbol" as keyof T,
      render: (value: unknown) => typeof value === "string" ? value.toUpperCase() : ""
    },
    amount: { 
      header: "Bedrag", 
      key: "amount" as keyof T,
      render: (value: unknown) => formatCurrency(value as string | number)
    },
    amountInvested: { 
      header: "Bedrag", 
      key: "amountInvested" as keyof T,
      render: (value: unknown) => formatCurrency(value as string | number)
    },
    unitsReceived: { header: "Aantal ontvangen", key: "unitsReceived" as keyof T },
    pricePerUnit: { header: "Prijs per stuk", key: "pricePerUnit" as keyof T },
    date: { 
      header: "Datum", 
      key: "date" as keyof T,
      render: (value: unknown) => formatDate(value as string | number)
    },
    category: { header: "Categorie", key: "category" as keyof T },
    note: { 
      header: "Notitie", 
      key: "note" as keyof T,
      render: (value: unknown) => {
        const strValue = typeof value === "string" ? value : undefined;
        return strValue || "-";
      }
    }
  };
  
  // Filter en map de kolommen op basis van de meegegeven keys
  const columns = includedColumns
    .map(key => columnsMap[key as string])
    .filter(Boolean);
  
  // Voeg actie kolom toe
  columns.push(createActionsColumn(onEdit, onDelete));
  
  return columns;
};

// Specifieke kolommen voor verschillende tabellen
export const createInvestmentsColumns = (
  onEdit: (row: InvestmentsRow) => void,
  onDelete: (row: InvestmentsRow) => void
) => createCommonColumns<InvestmentsRow>(
  ['name', 'symbol', 'amountInvested', 'unitsReceived', 'pricePerUnit', 'date', 'category', 'note'],
  onEdit,
  onDelete
);

export const createIncomeColumns = (
  onEdit: (row: IncomeRow) => void,
  onDelete: (row: IncomeRow) => void
) => createCommonColumns<IncomeRow>(
  ['name', 'amount', 'date', 'category'],
  onEdit,
  onDelete
);

export const createExpenseColumns = (
  onEdit: (row: ExpenseRow) => void,
  onDelete: (row: ExpenseRow) => void
) => createCommonColumns<ExpenseRow>(
  ['name', 'amount', 'date', 'category'],
  onEdit,
  onDelete
);

export const createFixedExpenseColumns = (
  onEdit: (row: FixedExpenseRow) => void,
  onDelete: (row: FixedExpenseRow) => void
) => createCommonColumns<FixedExpenseRow>(
  ['name', 'amount', 'date', 'category'],
  onEdit,
  onDelete
);