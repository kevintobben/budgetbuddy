import React from "react";
import PageLayout from "@/components/PageLayout";
import OverviewCard from "@/components/OverviewCard";
import { useSavingsStore, SavingsRow } from "@/stores/savingsStore";
import SavingsCard from "@/components/SavingsCard";
import { Separator } from "@/components/ui/separator";
import { FormModal, FormField } from "@/components/FormModal";

const Savings: React.FC = () => {
  const savings = useSavingsStore((state) => state.savings);
  const addSavings = useSavingsStore((state) => state.addSavings);
  const removeSavings = useSavingsStore((state) => state.removeSavings);
  const [editingSavings, setEditingSavings] = React.useState<SavingsRow | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newSavings, setNewSavings] = React.useState<SavingsRow>({
    name: "",
    amount: 0,
    date: "",
    category: "",
  });

  const savingsFormFields: FormField[] = [
  {
    name: "name",
    label: "Naam",
    type: "text",
    placeholder: "Naam",
  },
  {
    name: "goal",
    label: "Spaardoel",
    type: "number",
    placeholder: "Spaardoel (€)",
    step: "0.01",
  },
  {
    name: "amount",
    label: "Bedrag",
    type: "number",
    placeholder: "Bedrag (€)",
    step: "0.01",
  }
];

  const totalAmount = savings.reduce((sum, item) => sum + item.amount, 0);
    const formattedTotal = totalAmount.toLocaleString("nl-NL", {
      style: "currency",
      currency: "EUR",
  });

  // For Savings we need to handle editing, so use a computed value
  const activeSavings = editingSavings || newSavings;
  const handleSavingsChange = (value: SavingsRow) => {
    if (editingSavings) {
      setEditingSavings(value);
    } else {
      setNewSavings(value);
    }
  };

  const handleSavingsSubmit = () => {
    if (editingSavings) {
      useSavingsStore.getState().updateSavings(editingSavings);
      setEditingSavings(null);
    } else {
      addSavings(newSavings);
      setNewSavings({ name: "", amount: 0, goal: 0, date: "", category: "" });
    }
    setDialogOpen(false);
  };

  return (
    <PageLayout title="Spaarpotjes">
      {/* Cards bovenaan de pagina */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center my-8">
        <OverviewCard
          title="Aantal spaarpotjes"
          amount={savings.length.toString()} 
        />
        <OverviewCard
          title="Totaal spaargeld €"
          amount={formattedTotal}
        />
      </div>

      <Separator className="mb-8" />

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

      <FormModal
        title={editingSavings ? "Spaarpot bewerken" : "Nieuwe spaarpot toevoegen"}
        fields={savingsFormFields}
        value={activeSavings}
        onChange={handleSavingsChange}
        onSubmit={handleSavingsSubmit}
        submitLabel={editingSavings ? "Opslaan" : "Toevoegen"}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        />
    </PageLayout>
  );
};

export default Savings;
