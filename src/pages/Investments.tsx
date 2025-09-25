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
import { useInvestmentsStore, InvestmentsRow } from "@/stores/investmensStore";
import { createInvestmentsColumns } from "@/utils/tableColumns";
import { useFilteredData } from "@/hooks/useFilteredData";
import { FormModal, FormField } from "@/components/FormModal";

const Investments: React.FC = () => {
  const investments = useInvestmentsStore((state) => state.investments);
  const addInvestment = useInvestmentsStore((state) => state.addInvestment);
  const removeInvestment = useInvestmentsStore((state) => state.removeInvestment);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newInvestment, setNewInvestment] = React.useState<InvestmentsRow>({
    id: null,
    name: "",
    symbol: "",
    amountInvested: 0,
    unitsReceived: 0,
    pricePerUnit: 0,
    date: "",
    category: "",
    note: "",
  });

  const investmentFormFields: FormField[] = [
    {
      name: "name",
      label: "Naam",
      type: "text",
      placeholder: "Naam of $TSLA",
      fullWidth: true,
    },
    {
      name: "symbol",
      label: "Symbool",
      type: "text",
      placeholder: "Symbool (bijv. XRP-EUR)",
    },
    {
      name: "pricePerUnit",
      label: "Prijs per stuk",
      type: "number",
      placeholder: "Prijs per stuk (€)",
      step: "0.01",
    },
    {
      name: "unitsReceived",
      label: "Aantal ontvangen",
      type: "number",
      placeholder: "Aantal ontvangen",
      step: "0.0000001",
    },
    {
      name: "amountInvested",
      label: "Bedrag geïnvesteerd",
      type: "number",
      placeholder: "Automatisch berekend",
      step: "0.01",
      className: "bg-gray-100",
    },
    {
      name: "date",
      label: "Datum",
      type: "date",
    },
    {
      name: "category",
      label: "Categorie",
      type: "select",
      placeholder: "Selecteer categorie",
      options: [
        { value: "Aandelen", label: "Aandelen" },
        { value: "Beleggingsfonds", label: "Beleggingsfonds" },
        { value: "Crypto", label: "Crypto" },
        { value: "ETF", label: "ETF" },
      ],
    },
    {
      name: "note",
      label: "Notitie",
      type: "textarea",
      placeholder: "Notitie (optioneel)",
      fullWidth: true,
    },
  ];

  const categoryOptions = [
    { id: "etf", label: "EFT's", value: "ETF" },
    { id: "crypto", label: "Crypto", value: "Crypto" },
    { id: "indexfonds", label: "Indexfondsen", value: "Beleggingsfonds" },
  ];

  const { filteredData, selectedFilters, toggleFilter } = useFilteredData(
    investments,
    categoryOptions,
    (investment, selectedCategories) => selectedCategories.includes(investment.category)
  );

  const handleAddInvestment = () => {
    // Zorg ervoor dat amountInvested is berekend voordat we toevoegen
    const calculatedInvestment = {
      ...newInvestment,
      amountInvested: newInvestment.pricePerUnit * newInvestment.unitsReceived
    };
    
    addInvestment(calculatedInvestment);
    setNewInvestment({ id: null, name: "", symbol: "", amountInvested: 0, unitsReceived: 0, pricePerUnit: 0, date: "", category: "", note: "" });
    setDialogOpen(false);
  };

  const totalAmount = investments.reduce((sum, item) => sum + item.amountInvested, 0);
  const formattedTotal = totalAmount.toLocaleString("nl-NL", {
    style: "currency",
    currency: "EUR",
  });

  // Categorietellers voor overview cards
  const categoryCount = {
    crypto: investments.filter((inv) => inv.category === "Crypto").length,
    etf: investments.filter((inv) => inv.category === "ETF").length,
    indexfonds: investments.filter((inv) => inv.category === "Beleggingsfonds").length,
  };

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
          amount={categoryCount.crypto.toString()}
        />
        <OverviewCard
          title="Aantal EFT's"
          amount={categoryCount.etf.toString()}
        />
        <OverviewCard
          title="Aantal indexfondsen"
          amount={categoryCount.indexfonds.toString()}
        />
      </div>

      {/* Filters */}
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
        columns={createInvestmentsColumns(
          (row) => alert(`Bewerk ${row.name}`),
          (row) => removeInvestment(row)
        )}
        data={filteredData}
      />
      
      <FormModal
        title="Nieuwe investering toevoegen"
        fields={investmentFormFields}
        value={newInvestment}
        onChange={setNewInvestment}
        onSubmit={handleAddInvestment}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        gridLayout={true}
      />
    </PageLayout>
  );
};

export default Investments;
