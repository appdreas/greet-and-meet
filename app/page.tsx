import ActivityList from "@/components/ActivityList";
import Hero from "@/components/Hero";
import getActivities from "./actions/getActivities";

export default async function Home() {
  const activities = await getActivities();
  return (
    <>
      <Hero />
      <ActivityList activities={activities} />
    </>
  );
}
