import ActivityList from "@/components/ActivityList";
import getActivities from "../actions/getActivities";

export default async function Page() {
  const activities = await getActivities();
  return <ActivityList activities={activities} showFilter />;
}
