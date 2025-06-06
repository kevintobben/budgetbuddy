import React from "react";
import { BaseTable } from "@/components/BaseTable";
import PageLayout from "@/components/PageLayout";
import OverviewCard from "@/components/OverviewCard";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
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
import { useInvestmentsStore, InvestmentsRow } from "@/stores/investmensStore";

const investmentsColumns = (
  onEdit: (row: InvestmentsRow) => void,
  onDelete: (row: InvestmentsRow) => void
) => [
  { header: "Naam", key: "name" as const },
  {
    header: "Bedrag",
    key: "amountInvested" as keyof InvestmentsRow,
    render: (value: string | number) =>
      new Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "EUR",
      }).format(Number(value)),
  },
  {
    header: "Datum",
    key: "date" as const,
    render: (value: string | number) =>
      new Date(String(value)).toLocaleDateString("nl-NL"),
  },
  { header: "Categorie", key: "category" as const },
  {
    header: "Acties",
    key: "name" as const,
    render: (_: unknown, row: InvestmentsRow) => (
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
];

type Checked = DropdownMenuCheckboxItemProps["checked"];

const Investments: React.FC = () => {
  const investments = useInvestmentsStore((state) => state.investments);
  const addInvestment = useInvestmentsStore((state) => state.addInvestment);
  const removeInvestment = useInvestmentsStore((state) => state.removeInvestment);

  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newInvestment, setNewInvestment] = React.useState<InvestmentsRow>({
    name: "",
    symbol: "",
    amountInvested: 0,
    units: 0,
    pricePerUnit: 0,
    fee: 0,
    date: "",
    category: "",
    note: "",
  });

  const handleAddInvestment = () => {
    addInvestment(newInvestment);
    setNewInvestment({ name: "", symbol: "", amountInvested: 0, units: 0, pricePerUnit: 0, fee: 0, date: "", category: "", note: "" });
    setDialogOpen(false);
  };

  const totalAmount = investments.reduce((sum, item) => sum + item.amountInvested, 0);
  const formattedTotal = totalAmount.toLocaleString("nl-NL", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <PageLayout title="Investeringen">
      {/* Cards bovenaan de pagina */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 place-items-center pb-12">
        <OverviewCard
          title="Aantal investeringsbronnen"
          amount={investments.length.toString()}
        />
        <OverviewCard
          title="Totaal geïnvesteerd in €"
          amount={formattedTotal}
          amountColor="text-green-500"
        />
        <OverviewCard
          title="Aantal cryptovaluta's"
          amount={investments.filter((inv) => inv.category === "crypto").length.toString()}
        />
        <OverviewCard
          title="Aantal EFT's"
          amount={investments.filter((inv) => inv.category === "ETF").length.toString()}
        />
        <OverviewCard
          title="Aantal indexfondsen"
          amount={investments.filter((inv) => inv.category === "indexfonds").length.toString()}
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
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                EFT's
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
              >
                Crypto
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
                Indexfondsen
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
              <DropdownMenuLabel>Weergave</DropdownMenuLabel>
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
        columns={investmentsColumns(
          (row) => alert(`Bewerk ${row.name}`),
          (row) => removeInvestment(row)
        )}
        data={investments}
      />
      
      {/* + button en de modal */}
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
              <DialogTitle>Nieuwe investering toevoegen</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="Naam"
                value={newInvestment.name}
                onChange={(e) =>
                  setNewInvestment({ ...newInvestment, name: e.target.value })
                }
              />
              <Input
                placeholder="Bedrag (€)"
                value={newInvestment.amountInvested}
                onChange={(e) =>
                  setNewInvestment({
                    ...newInvestment,
                    amountInvested: parseFloat(e.target.value.replace(",", ".")),
                  })
                }
                type="number"
                step="0.01"
              />
              <Input
                placeholder="Datum (YYYY-MM-DD)"
                type="date"
                value={newInvestment.date}
                onChange={(e) =>
                  setNewInvestment({ ...newInvestment, date: e.target.value })
                }
              />
              <Input
                placeholder="Categorie"
                value={newInvestment.category}
                onChange={(e) =>
                  setNewInvestment({ ...newInvestment, category: e.target.value })
                }
              />
              <Button onClick={handleAddInvestment} className="w-full">
                Toevoegen
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default Investments;
