import ActivityList from "@/components/ActivityList";
import getActivities from "../actions/getActivities";
import { Query } from "node-appwrite";

export default async function Page() {
  const activities = await getActivities(Query.limit(25));
  return <ActivityList activities={activities} showFilter />;
}
