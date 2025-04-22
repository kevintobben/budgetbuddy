import PageLayout from "@/components/PageLayout";
import OverviewCard from "@/components/OverviewCard";

const Home: React.FC = () => {
  return (
    <PageLayout title="">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center">
      <OverviewCard
          title="Geld over deze maand"
          amount="364,95"
        />
        <OverviewCard
          title="Inkomen"
          amount="1634,95"
        />
        <OverviewCard
          title="Uitgaven"
          amount="€ 485,37"
        />
        <OverviewCard
          title="Vaste lasten"
          amount="€ 2.303,40"
        />
      </div>
    </PageLayout>
  );
};

export default Home;
