import React from "react";
import { BaseTable } from "@/components/BaseTable";
import PageLayout from "@/components/PageLayout";
import OverviewCard from "@/components/OverviewCard";
import { Pencil, Trash2 } from "lucide-react"
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

type IncomeRow = {
  name: string;
  amount: string;
  date: string;  
  category: string;
}

const incomeData: IncomeRow[] = [
  {
    name: "Salaris",
    amount: "€ 2.500,00",
    date: "2023-10-01",
    category: "Salaris",
  },
  {
    name: "Huur",
    amount: "€ 1.200,00",
    date: "2023-10-05",
    category: "Huur",
  },
  {
    name: "Verhuur",
    amount: "€ 800,00",
    date: "2023-10-10",
    category: "Verhuur",
  },
];

const incomeColumns = [
  {
    header: "Naam",
    key: "name" as keyof IncomeRow,
  },
  {
    header: "Bedrag",
    key: "amount" as keyof IncomeRow,
    render: (value: string) => value,
  },
  {
    header: "Datum",
    key: "date" as keyof IncomeRow,
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    header: "Categorie",
    key: "category" as keyof IncomeRow,
  },
  {
    header: "Acties",
    key: "name" as keyof IncomeRow,
    render: (_: unknown, row: IncomeRow) => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Bewerk ${row.name}`)}
          className="hover:text-stone-700"
          title="Bewerk"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => alert(`Verwijder ${row.name}`)}
          className="hover:text-stone-700"
          title="Verwijder"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  }
];

type Checked = DropdownMenuCheckboxItemProps["checked"]

const Income: React.FC = () => {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)

  return (
    <PageLayout title="Inkomen">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center pb-12">
        <OverviewCard
          title="Aantal inkomst bronnen"
          amount="4"
        />
        <OverviewCard
          title="Aatanl inkomen in €"
          amount="€ 1.120,00"
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

      <BaseTable columns={incomeColumns} data={incomeData} />
    </PageLayout>
  );
};

export default Income;