import PageLayout from "@/components/PageLayout";
import OverviewCard from "@/components/OverviewCard";

const Settings: React.FC = () => {
  return (
    <PageLayout title="Inkomen">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center">
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
    </PageLayout>
  );
};

export default Settings;
