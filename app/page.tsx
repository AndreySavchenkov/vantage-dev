import { fetchBuildings } from "./lib/data";
import CreateBuildingForm from "./ui/CreateBuildingForm";

export default async function Home() {
  const buildings = await fetchBuildings();

  return (
    <main>
      <p className="text-xl font-medium mt-3">Buildings in Poland:</p>
      <div className="mt-3">
        {buildings.map((building) => (
          <div key={building.id} className="flex gap-1">
            <span>{building.address}</span>
            <span className="text-orange-400">{building.city}</span>
          </div>
        ))}
      </div>
      <CreateBuildingForm />
    </main>
  );
}
