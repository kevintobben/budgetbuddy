import React from "react";
import { BaseTable } from "@/components/BaseTable";
import PageLayout from "@/components/PageLayout";
import OverviewCard from "@/components/OverviewCard";
import { Plus } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useIncomeStore, IncomeRow } from "@/stores/incomeStore";
import { createIncomeColumns } from "@/utils/tableColumns";
import { useFilteredData } from "@/hooks/useFilteredData";

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

      {/* Modal content remains the same */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="rounded-full w-12 h-12 p-0 shadow-lg"
              title="Toevoegen"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nieuwe inkomstenbron toevoegen</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="Naam"
                value={newIncome.name}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, name: e.target.value })
                }
              />
              <Input
                placeholder="Bedrag (€)"
                value={newIncome.amount}
                onChange={(e) =>
                  setNewIncome({
                    ...newIncome,
                    amount: parseFloat(e.target.value.replace(",", ".")),
                  })
                }
                type="number"
                step="0.01"
              />
              <Input
                placeholder="Datum (YYYY-MM-DD)"
                type="date"
                value={newIncome.date}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, date: e.target.value })
                }
              />
              <Input
                placeholder="Categorie"
                value={newIncome.category}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, category: e.target.value })
                }
              />
              <Button onClick={handleAddIncome} className="w-full">
                Toevoegen
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default Income;
