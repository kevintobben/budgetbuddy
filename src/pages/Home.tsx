import PageLayout from "@/components/PageLayout";
import OverviewCard from "@/components/OverviewCard";
import { useIncomeStore } from "@/stores/incomeStore";
import { useExpenseStore } from "@/stores/expenseStore";
import { useSubscriptionsStore } from "@/stores/subscriptionsStore";
import { useSavingsStore } from "@/stores/savingsStore";

const Home: React.FC = () => {
  const incomes = useIncomeStore((state) => state.incomes);
  const expenses = useExpenseStore((state) => state.expenses);
  const subscriptions = useSubscriptionsStore((state) => state.subscriptions);
  const savings = useSavingsStore((state) => state.savings);

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalSubscriptions = subscriptions.reduce((sum, s) => sum + s.amount, 0);
  const totalSavings = savings.reduce((sum, s) => sum + s.amount, 0);

  const leftThisMonth = totalIncome - totalExpenses - totalSubscriptions;

  const format = (value: number) =>
    value.toLocaleString("nl-NL", { style: "currency", currency: "EUR" });

  return (
    <PageLayout title="Overzicht" showDateFilters>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center">
        <OverviewCard title="Geld over deze maand" amount={format(leftThisMonth)} />
        <OverviewCard title="Inkomen" amount={format(totalIncome)} />
        <OverviewCard title="Uitgaven" amount={format(totalExpenses)} />
        <OverviewCard title="Vaste lasten" amount={format(totalSubscriptions)} />
        <OverviewCard title="Spaarpotjes" amount={format(totalSavings)} />
      </div>
    </PageLayout>
  );
};

export default Home;
