import React from "react";
import { BaseTable } from "@/components/BaseTable";
import PageLayout from "@/components/PageLayout";
import OverviewCard from "@/components/OverviewCard";
import { Pencil, Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type ExpenseRow = {
  name: string;
  amount: number;
  date: string;  
  category: string;
}

const expenseColumns = (onEdit: (row: ExpenseRow) => void, onDelete: (row: ExpenseRow) => void) => [
  { header: "Naam", key: "name" as const },
  { header: "Bedrag", key: "amount" as keyof ExpenseRow, render: (value: string | number) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR",}).format(Number(value)), },
  {
    header: "Datum",
    key: "date" as const,
    render: (value: string | number) => new Date(String(value)).toLocaleDateString("nl-NL"),
  },
  { header: "Categorie", key: "category" as const },
  {
    header: "Acties",
    key: "name" as const,
    render: (_: unknown, row: ExpenseRow) => (
      <div className="flex gap-2">
        <button onClick={() => onEdit(row)} title="Bewerk">
          <Pencil size={18} />
        </button>
        <button onClick={() => onDelete(row)} title="Verwijder">
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
]

type Checked = DropdownMenuCheckboxItemProps["checked"]

const Expenses: React.FC = () => {
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)
    const [expenses, setExpenses] = React.useState<ExpenseRow[]>([])
    
      const [dialogOpen, setDialogOpen] = React.useState(false)
      const [newExpense, setNewExpense] = React.useState<ExpenseRow>({
        name: "",
        amount: 0,
        date: "",
        category: "",
      })
    
      const totalAmount = expenses.reduce((sum, item) => {
        const value = item.amount || 0;
        return sum + value;
      }, 0);
    
      const handleAddExpense = () => {
        setExpenses([...expenses, newExpense])
        setNewExpense({ name: "", amount: 0, date: "", category: "" })
        setDialogOpen(false)
      }
    
      const formattedTotal = totalAmount.toLocaleString("nl-NL", {
        style: "currency",
        currency: "EUR"
      })

  return (
    <PageLayout title="Uitgaven"> 
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center pb-12">
        <OverviewCard
          title="Aantal uitgeefposten"
          amount={expenses.length.toString()} 
        />
        <OverviewCard
          title="Aatanl uitgaven in €"
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
            {/* <Input type="text" placeholder="Zoek op naam" className="" /> */}
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Salaris
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              Zakgeld
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Anders
            </DropdownMenuCheckboxItem>
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Naam
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
              >
                Prijs
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
                Datum
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
                Categorie
              </DropdownMenuCheckboxItem>
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <BaseTable
        columns={expenseColumns(
          (row) => alert(`Bewerk ${row.name}`),
          (row) => setExpenses(expenses.filter((item) => item !== row))
        )}
        data={expenses}
      />

      <div className="fixed bottom-6 right-6 z-50">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full w-12 h-12 p-0 shadow-lg" title="Toevoegen">
              <Plus className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nieuwe uitgave toevoegen</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="Naam"
                value={newExpense.name}
                onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
              />
              <Input
                placeholder="Bedrag (€)"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
              />
              <Input
                placeholder="Datum (YYYY-MM-DD)"
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              />
              <Input
                placeholder="Categorie"
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              />
              <Button onClick={handleAddExpense} className="w-full">Toevoegen</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

    </PageLayout>
  );
};

export default Expenses;
