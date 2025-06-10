import PageLayout from "@/components/PageLayout";
import OverviewCard from "@/components/OverviewCard";
import { useIncomeStore } from "@/stores/incomeStore";
import { useExpenseStore } from "@/stores/expenseStore";
import { useFixedExpensesStore } from "@/stores/fixedExpensesStore";
import { useSavingsStore } from "@/stores/savingsStore";
import {useInvestmentsStore } from "@/stores/investmensStore";

const Home: React.FC = () => {
  const incomes = useIncomeStore((state) => state.incomes);
  const expenses = useExpenseStore((state) => state.expenses);
  const fixedExpenses = useFixedExpensesStore((state) => state.fixedExpenses);
  const savings = useSavingsStore((state) => state.savings);
  const investments = useInvestmentsStore((state) => state.investments);

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalFixedExpenses = fixedExpenses.reduce((sum, s) => sum + s.amount, 0);
  const totalSavings = savings.reduce((sum, s) => sum + s.amount, 0);
  const totalInvestments = investments.reduce((sum, i) => sum + i.amountInvested, 0);

  const leftThisMonth = totalIncome - totalExpenses - totalFixedExpenses;

  const format = (value: number) =>
    value.toLocaleString("nl-NL", { style: "currency", currency: "EUR" });

  return (
    <PageLayout title="Overzicht" showDateFilters>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-8 px-4 place-items-stretch">
        <OverviewCard title="Geld over deze maand" amount={format(leftThisMonth)} />
        <OverviewCard title="Inkomen" amount={format(totalIncome)} amountColor="text-green-500" />
        <OverviewCard title="Uitgaven" amount={format(totalExpenses)} amountColor="text-red-500" />
        <OverviewCard title="Vaste lasten" amount={format(totalFixedExpenses)} amountColor="text-blue-500" />
        <OverviewCard title="Totaal spaargeld" amount={format(totalSavings)}  amountColor="text-orange-500"/>
        <OverviewCard title="Totaal Geinvesteerd" amountColor="text-orange-500" amount={format(totalInvestments)}/>
      </div>
    </PageLayout>
  );
};

export default Home;
