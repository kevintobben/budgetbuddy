import { BaseTable } from "@/components/BaseTable";
import PageLayout from "@/components/PageLayout";
import OverviewCard from "@/components/OverviewCard";
import { Pencil, Trash2 } from "lucide-react"

type ExpenseRow = {
  name: string;
  amount: string;
  date: string;  
  category: string;
}

const ExpenseData: ExpenseRow[] = [
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

const expenseColumns = [
  {
    header: "Naam",
    key: "name" as keyof ExpenseRow,
  },
  {
    header: "Bedrag",
    key: "amount" as keyof ExpenseRow,
    render: (value: string) => value,
  },
  {
    header: "Datum",
    key: "date" as keyof ExpenseRow,
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    header: "Categorie",
    key: "category" as keyof ExpenseRow,
  },
  {
    header: "Acties",
    key: "name" as keyof ExpenseRow,
    render: (_: unknown, row: ExpenseRow) => (
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

const Expenses: React.FC = () => {
  return (
    <PageLayout title="Uitgaven">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center pb-12">
        <OverviewCard
          title="Aantal inkomst bronnen"
          amount="€ 1600,00"
          amountColor="text-green-600"
        />
        <OverviewCard
          title="Aatanl inkomen in €"
          amount="€ 1.120,00"
          amountColor="text-red-500"
        />
      </div>

      <BaseTable columns={expenseColumns} data={ExpenseData} />
    </PageLayout>
  );
};

export default Expenses;
