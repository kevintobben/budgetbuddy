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
import { useIncomeStore, IncomeRow } from "@/stores/incomeStore";
import { createIncomeColumns } from "@/utils/tableColumns";
import { useFilteredData } from "@/hooks/useFilteredData";
import { FormModal, FormField } from "@/components/FormModal";

const Income: React.FC = () => {
  const incomes = useIncomeStore((state) => state.incomes);
  const addIncome = useIncomeStore((state) => state.addIncome);
  const removeIncome = useIncomeStore((state) => state.removeIncome);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newIncome, setNewIncome] = React.useState<IncomeRow>({
    name: "",
    amount: 0,
    date: "",
    category: "",
  });

  const incomeFormFields: FormField[] = [
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
      { value: "Salaris", label: "Salaris" },
      { value: "Zakgeld", label: "Zakgeld" },
      { value: "Anders", label: "Anders" },
    ],
  },
];

  // Defineer category opties
  const categoryOptions = [
    { id: "salary", label: "Salaris", value: "Salaris" },
    { id: "allowance", label: "Zakgeld", value: "Zakgeld" },
    { id: "other", label: "Anders", value: "Anders" },
  ];

  // Gebruik de filtered data hook
  const { filteredData, selectedFilters, toggleFilter } = useFilteredData(
    incomes,
    categoryOptions,
    (income, selectedCategories) => selectedCategories.includes(income.category)
  );

  const handleAddIncome = () => {
    addIncome(newIncome);
    setNewIncome({ name: "", amount: 0, date: "", category: "" });
    setDialogOpen(false);
  };

  const totalAmount = incomes.reduce((sum, item) => sum + item.amount, 0);
  const formattedTotal = totalAmount.toLocaleString("nl-NL", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <PageLayout title="Inkomen">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center pb-12">
        <OverviewCard
          title="Aantal inkomst bronnen"
          amount={incomes.length.toString()}
        />
        <OverviewCard
          title="Aantal inkomen in €"
          amount={formattedTotal}
          amountColor="text-green-500"
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
        columns={createIncomeColumns(
          (row) => alert(`Bewerk ${row.name}`),
          (row) => removeIncome(row)
        )}
        data={filteredData}
      />
      
      <FormModal
        title="Nieuwe vaste last toevoegen"
        fields={incomeFormFields}
        value={newIncome}
        onChange={setNewIncome}
        onSubmit={handleAddIncome}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </PageLayout>
  );
};

export default Income;
