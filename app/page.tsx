import ActivityList from "@/components/ActivityList";
import Hero from "@/components/Hero";
import getActivities from "./actions/getActivities";
import { Query } from "appwrite";

export default async function Home() {
  const activities = await getActivities(Query.limit(3));
  return (
    <>
      <Hero />
      <ActivityList activities={activities} />
    </>
  );
}
