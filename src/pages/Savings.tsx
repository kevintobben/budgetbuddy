import React from "react";
import PageLayout from "@/components/PageLayout";
import OverviewCard from "@/components/OverviewCard";
import { Plus } from "lucide-react"
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
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { useSavingsStore, SavingsRow } from "@/stores/savingsStore";
import SavingsCard from "@/components/SavingsCard";

type Checked = DropdownMenuCheckboxItemProps["checked"]

const Savings: React.FC = () => {
  const savings = useSavingsStore((state) => state.savings);
  const addSavings = useSavingsStore((state) => state.addSavings);
  const removeSavings = useSavingsStore((state) => state.removeSavings);
  const [editingSavings, setEditingSavings] = React.useState<SavingsRow | null>(null);

  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newSavings, setNewSavings] = React.useState<SavingsRow>({
    name: "",
    amount: 0,
    date: "",
    category: "",
  });

  const totalAmount = savings.reduce((sum, item) => sum + item.amount, 0);
    const formattedTotal = totalAmount.toLocaleString("nl-NL", {
      style: "currency",
      currency: "EUR",
  });

  return (
    <PageLayout title="Spaarpotjes">
      {/* Cards bovenaan de pagina */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center pb-12">
        <OverviewCard
          title="Aantal spaarpotjes"
          amount={savings.length.toString()} 
        />
        <OverviewCard
          title="Totaal spaargeld €"
          amount={formattedTotal}
        />
      </div>

      {/* Filters en sortering */}
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

      {/* Spaargeld cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-8 px-4 pb-6 place-items-stretch">      
        {savings.map((savings) => (
          <SavingsCard
            key={savings.name}
            title={savings.name}
            amount={savings.amount}
            goal={savings.goal ?? 0}
            onDelete={() => removeSavings(savings)}
            onEdit={() => {
              setEditingSavings(savings);
              setDialogOpen(true);
            }}
          />
        ))}
      </div>

      {/* + button en de modal */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="rounded-full w-12 h-12 p-0 shadow-lg"
              title="Toevoegen"
              onClick={() => {
                setEditingSavings(null);
                setNewSavings({ name: "", amount: 0, goal: 0, date: "", category: "" });
              }}
            >
              <Plus className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              {editingSavings ? "Spaarpot bewerken" : "Nieuwe spaarpot toevoegen"}
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="Naam"
                value={editingSavings ? editingSavings.name : newSavings.name}
                onChange={(e) => {
                  const value = e.target.value;
                  if (editingSavings) {
                    setEditingSavings({ ...editingSavings, name: value });
                  } else {
                    setNewSavings({ ...newSavings, name: value });
                  }
                }}
              />
              <Input
                placeholder="Spaardoel (€)"
                value={editingSavings
                  ? editingSavings.goal === 0 || editingSavings.goal === undefined ? "" : editingSavings.goal
                  : newSavings.goal === 0 || newSavings.goal === undefined ? "" : newSavings.goal}
                onChange={(e) => {
                  const value = Number(e.target.value.replace(",", "."));
                  if (editingSavings) {
                    setEditingSavings({ ...editingSavings, goal: value });
                  } else {
                    setNewSavings({ ...newSavings, goal: value });
                  }
                }}
              />
              <Input
                placeholder="Bedrag (€)"
                value={editingSavings
                  ? editingSavings.amount === 0 || editingSavings.amount === undefined ? "" : editingSavings.amount
                  : newSavings.amount === 0 || newSavings.amount === undefined ? "" : newSavings.amount}
                onChange={(e) => {
                  const value = Number(e.target.value.replace(",", "."));
                  if (editingSavings) {
                    setEditingSavings({ ...editingSavings, amount: value });
                  } else {
                    setNewSavings({ ...newSavings, amount: value });
                  }
                }}
              />
              {/* <Input
                placeholder="Datum (YYYY-MM-DD)"
                type="date"
                value={editingSavings ? editingSavings.date : newSavings.date}
                onChange={(e) => {
                  const value = e.target.value;
                  if (editingSavings) {
                    setEditingSavings({ ...editingSavings, date: value });
                  } else {
                    setNewSavings({ ...newSavings, date: value });
                  }
                }}
              /> */}
              <Button
                onClick={() => {
                  if (editingSavings) {
                    useSavingsStore.getState().updateSavings(editingSavings);
                    setEditingSavings(null);
                  } else {
                    addSavings(newSavings);
                    setNewSavings({ name: "", amount: 0, goal: 0, date: "", category: "" });
                  }
                  setDialogOpen(false);
                }}
                className="w-full"
              >
                {editingSavings ? "Opslaan" : "Toevoegen"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default Savings;
