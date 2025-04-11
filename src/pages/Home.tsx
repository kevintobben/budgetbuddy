import OverviewCard from "@/components/OverviewCard";

const Home: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Home Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
        <OverviewCard
          title="Geld over deze maand"
          description="Wat je nog over hebt"
          amount="€ 820,00"
          amountColor="text-green-600"
          footerText="Laatst bijgewerkt: 10 april"
        />
        <OverviewCard
          title="Vaste lasten"
          description="Totaal deze maand"
          amount="€ 1.120,00"
          amountColor="text-red-500"
          footerText="Inclusief huur, abonnementen, etc."
        />
        <OverviewCard
          title="Inkomen"
          description="Totale inkomsten deze maand"
          amount="€ 2.100,00"
          amountColor="text-blue-600"
          footerText="Laatste salaris ontvangen op 1 april"
        />
        <OverviewCard
          title="Uitgaven"
          description="Alles wat je hebt uitgegeven"
          amount="€ 1.280,00"
          amountColor="text-orange-500"
          footerText="Inclusief boodschappen, vervoer, enz."
        />
      </div>
    </div>
  );
};

export default Home;
