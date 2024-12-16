import getActivities from "./actions/getActivities";

export default async function Home() {
  const activities = await getActivities();
  console.log(activities);
  return (
    <div>
      {activities.map((activity) => (
        <div key={activity.$id}>{activity.$createdAt}</div>
      ))}
    </div>
  );
}
