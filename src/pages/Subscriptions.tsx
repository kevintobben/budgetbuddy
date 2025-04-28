import { BaseTable } from "@/components/BaseTable";
import PageLayout from "@/components/PageLayout";
import OverviewCard from "@/components/OverviewCard";
import { Pencil, Trash2 } from "lucide-react"

type SubscriptionRow = {
  name: string;
  amount: string;
  date: string;  
  category: string;
}

const SubscriptionsData: SubscriptionRow[] = [
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

const subscriptionsColumns = [
  {
    header: "Naam",
    key: "name" as keyof SubscriptionRow,
  },
  {
    header: "Bedrag",
    key: "amount" as keyof SubscriptionRow,
    render: (value: string) => value,
  },
  {
    header: "Datum",
    key: "date" as keyof SubscriptionRow,
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    header: "Categorie",
    key: "category" as keyof SubscriptionRow,
  },
  {
    header: "Acties",
    key: "name" as keyof SubscriptionRow,
    render: (_: unknown, row: SubscriptionRow) => (
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
const Subscriptions: React.FC = () => {
  return (
    <PageLayout title="Vaste lasten">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center pb-12">
        <OverviewCard
          title="Aantal vaste lasten"
          amount="10"
        />
        <OverviewCard
          title="Actief - Afgezegd"
          amount="10 - 0"
        />
        <OverviewCard
          title="Totaal per maand €"
          amount="€ 191,95"
        />
        <OverviewCard
          title="Totaal per jaar (actief)"
          amount="€ 2.303,40"
        />
      </div>
      <BaseTable columns={subscriptionsColumns} data={SubscriptionsData} />
    </PageLayout>
  );
};

export default Subscriptions;
