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
import { useFixedExpensesStore, FixedExpenseRow } from "@/stores/fixedExpensesStore";
import { createFixedExpenseColumns } from "@/utils/tableColumns";
import { useFilteredData } from "@/hooks/useFilteredData";
import { FormModal, FormField } from "@/components/FormModal";

const FixedExpenses: React.FC = () => {
  const fixedExpenses = useFixedExpensesStore((state) => state.fixedExpenses);
  const addFixedExpense = useFixedExpensesStore((state) => state.addFixedExpense);
  const removeFixedExpense = useFixedExpensesStore((state) => state.removeFixedExpense);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newFixedExpense, setNewFixedExpense] = React.useState<FixedExpenseRow>({
    id: null,
    name: "",
    amount: 0,
    date: "",
    category: "",
  });

  const fixedExpenseFormFields: FormField[] = [
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
        { value: "Entertainment", label: "Entertainment" },
        { value: "Verzekeringen", label: "Verzekeringen" },
        { value: "Credit Card", label: "Credit Card" },
        { value: "Internet- TV & Bellen", label: "Internet- TV & Bellen" },
      ],
    },
  ];

  // Defineer category opties
  const categoryOptions = [
    { id: "entertainment", label: "Entertainment", value: "Entertainment" },
    { id: "verzekeringen", label: "Verzekeringen", value: "Verzekeringen" },
    { id: "credit card", label: "Credit Card", value: "Credit Card" },
    { id: "internet-tv-bellen", label: "Internet- TV & Bellen", value: "Internet- TV & Bellen" },
  ];

  // Gebruikt de filtered data hook
  const { filteredData, selectedFilters, toggleFilter, searchTerm, setSearchTerm } = useFilteredData(
    fixedExpenses,
    categoryOptions,
    (fixedExpense, selectedCategories) => selectedCategories.includes(fixedExpense.category)
  );

  const handleAddFixedExpense = () => {
    addFixedExpense(newFixedExpense);
    setNewFixedExpense({ id: null, name: "", amount: 0, date: "", category: "" });
    setDialogOpen(false);
  };

  const totalAmount = fixedExpenses.reduce((sum, item) => sum + item.amount, 0);
  const formattedTotal = totalAmount.toLocaleString("nl-NL", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <PageLayout title="Vaste lasten">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center pb-12">
        <OverviewCard
          title="Aantal vaste lasten"
          amount={fixedExpenses.length.toString()} 
        />
        <OverviewCard
          title="Totaal per maand in €"
          amount={formattedTotal}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
        <div className="flex items-center gap-2">
          <Input 
            type="text" 
            placeholder="Zoek op naam" 
            className="w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
        columns={createFixedExpenseColumns(
          (row) => alert(`Bewerk ${row.name}`),
          (row) => removeFixedExpense(row)
        )}
        data={filteredData}
      />

      <FormModal
        title="Nieuwe vaste last toevoegen"
        fields={fixedExpenseFormFields}
        value={newFixedExpense}
        onChange={setNewFixedExpense}
        onSubmit={handleAddFixedExpense}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </PageLayout>
  );
};

export default FixedExpenses;
