import React from "react";
import { BaseTable } from "@/components/BaseTable";
import PageLayout from "@/components/PageLayout";
import OverviewCard from "@/components/OverviewCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useExpenseStore, ExpenseRow } from "@/stores/expenseStore";
import { createExpenseColumns } from "@/utils/tableColumns";
import { useFilteredData } from "@/hooks/useFilteredData";
import { FormModal, FormField } from "@/components/FormModal";

const Expenses: React.FC = () => {
  const expenses = useExpenseStore((state) => state.expenses);
  const addExpense = useExpenseStore((state) => state.addExpense);
  const removeExpense = useExpenseStore((state) => state.removeExpense);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newExpense, setNewExpense] = React.useState<ExpenseRow>({
    id: null,
    name: "",
    amount: 0,
    date: "",
    category: "",
  });

  const expenseFormFields: FormField[] = [
  {
    name: "name",
    label: "Naam",
    type: "text",
    placeholder: "Naam",
  },
  {
    name: "amount",
    label: "Bedrag",
    type: "number",
    placeholder: "Bedrag (€)",
    step: "0.01",
  },
  {
    name: "date",
    label: "Datum",
    type: "date",
    placeholder: "Datum",
  },
  {
    name: "category",
    label: "Categorie",
    type: "select",
    placeholder: "Selecteer categorie",
    options: [
      { value: "Eten", label: "Eten" },
      { value: "Transport", label: "Transport" },
      { value: "Entertainment", label: "Entertainment" },
      { value: "Anders", label: "Anders" },
    ],
  },
];

  // Defineer category opties
  const categoryOptions = [
    { id: "food", label: "Eten", value: "Eten" },
    { id: "transport", label: "Transport", value: "Transport" },
    { id: "entertainment", label: "Entertainment", value: "Entertainment" },
    { id: "other", label: "Anders", value: "Anders" },
  ];

  // Gebruik de filtered data hook
  const { filteredData, selectedFilters, toggleFilter } = useFilteredData(
    expenses,
    categoryOptions,
    (expense, selectedCategories) => selectedCategories.includes(expense.category)
  );

  const handleAddExpense = () => {
    addExpense(newExpense);
    setNewExpense({ id: null, name: "", amount: 0, date: "", category: "" });
    setDialogOpen(false);
  };

  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);
  const formattedTotal = totalAmount.toLocaleString("nl-NL", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <PageLayout title="Uitgaven"> 
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center pb-12">
        <OverviewCard
          title="Aantal uitgeefposten"
          amount={expenses.length.toString()} 
        />
        <OverviewCard
          title="Aantal uitgaven in €"
          amount={formattedTotal}
          amountColor="text-red-500"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
        <div className="flex items-center gap-2">
          <Input type="text" placeholder="Zoek op naam" className="w-64" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Categorie</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              {categoryOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.id}
                  checked={selectedFilters[option.id]}
                  onCheckedChange={(checked) => toggleFilter(option.id, checked)}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Sorteer
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sorteer op</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Dag</DropdownMenuItem>
              <DropdownMenuItem>Week</DropdownMenuItem>
              <DropdownMenuItem>Maand</DropdownMenuItem>
              <DropdownMenuItem>Jaar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <BaseTable
        columns={createExpenseColumns(
          (row) => alert(`Bewerk ${row.name}`),
          (row) => removeExpense(row)
        )}
        data={filteredData}
      />

      <FormModal
        title="Nieuwe uitgave toevoegen"
        fields={expenseFormFields}
        value={newExpense}
        onChange={setNewExpense}
        onSubmit={handleAddExpense}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </PageLayout>
  );
};

export default Expenses;
