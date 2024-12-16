import getActivities from "./actions/getActivities";
import Hero from "@/components/Hero";
import ActivityList from "@/components/ActivityList";

export default async function Home() {
  const activities = await getActivities();
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ActivityList activities={activities} />
      </div>
    </main>
  );
}
