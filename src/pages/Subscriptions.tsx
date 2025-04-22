import PageLayout from "@/components/PageLayout";
import OverviewCard from "@/components/OverviewCard";

const Subscriptions: React.FC = () => {
  return (
    <PageLayout title="Vaste lasten">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center">
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
    </PageLayout>
  );
};

export default Subscriptions;
