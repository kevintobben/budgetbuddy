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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSubscriptionsStore, SubscriptionsRow } from "@/stores/subscriptionsStore";
import { createSubscriptionColumns } from "@/utils/tableColumns";
import { useFilteredData } from "@/hooks/useFilteredData";

const Subscriptions: React.FC = () => {
  const subscriptions = useSubscriptionsStore((state) => state.subscriptions);
  const addSubscription = useSubscriptionsStore((state) => state.addSubscription);
  const removeSubscription = useSubscriptionsStore((state) => state.removeSubscription);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newSubscription, setNewSubscription] = React.useState<SubscriptionsRow>({
    name: "",
    amount: 0,
    date: "",
    category: "",
  });

  // Defineer category opties
  const categoryOptions = [
    { id: "entertainment", label: "Entertainment", value: "Entertainment" },
    { id: "verzekeringen", label: "Verzekeringen", value: "Verzekeringen" },
    { id: "credit card", label: "Credit Card", value: "Credit Card" },
    { id: "internet-tv-bellen", label: "Internet- TV & Bellen", value: "Internet- TV & Bellen" },
  ];

  // Gebruik de filtered data hook
  const { filteredData, selectedFilters, toggleFilter } = useFilteredData(
    subscriptions,
    categoryOptions,
    (subscription, selectedCategories) => selectedCategories.includes(subscription.category)
  );

  const handleAddSubscription = () => {
    addSubscription(newSubscription);
    setNewSubscription({ name: "", amount: 0, date: "", category: "" });
    setDialogOpen(false);
  };

  const totalAmount = subscriptions.reduce((sum, item) => sum + item.amount, 0);
  const formattedTotal = totalAmount.toLocaleString("nl-NL", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <PageLayout title="Vaste lasten">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center pb-12">
        <OverviewCard
          title="Aantal vaste lasten"
          amount={subscriptions.length.toString()} 
        />
        <OverviewCard
          title="Totaal per maand in €"
          amount={formattedTotal}
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
        columns={createSubscriptionColumns(
          (row) => alert(`Bewerk ${row.name}`),
          (row) => removeSubscription(row)
        )}
        data={filteredData}
      />

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
              <DialogTitle>Nieuwe vaste last toevoegen</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="Naam"
                value={newSubscription.name}
                onChange={(e) =>
                  setNewSubscription({ ...newSubscription, name: e.target.value })
                }
              />
              <Input
                placeholder="Bedrag (€)"
                value={newSubscription.amount}
                onChange={(e) =>
                  setNewSubscription({
                    ...newSubscription,
                    amount: parseFloat(e.target.value.replace(",", ".")),
                  })
                }
                type="number"
                step="0.01"
              />
              <Input
                placeholder="Datum (YYYY-MM-DD)"
                type="date"
                value={newSubscription.date}
                onChange={(e) =>
                  setNewSubscription({ ...newSubscription, date: e.target.value })
                }
              />
              <Input
                placeholder="Categorie"
                value={newSubscription.category}
                onChange={(e) =>
                  setNewSubscription({ ...newSubscription, category: e.target.value })
                }
              />
              <Button onClick={handleAddSubscription} className="w-full">
                Toevoegen
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default Subscriptions;
