import getUserActivities from "@/app/actions/getUserActivities";
import ActivityRow from "@/components/ActvitityRow";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function MyActivities() {
  const activities = await getUserActivities();
  const now = new Date();
  const upcomingActivities = activities.filter(
    (activity) => new Date(activity.activity_date) > now
  );
  const pastActivities = activities.filter(
    (activity) => new Date(activity.activity_date) <= now
  );

  return (
    <div className="py-12">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-primary mb-6">My Activities</h2>
        <Button variant="default" asChild>
          <Link href="/activities/create">Create</Link>
        </Button>
      </div>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Upcoming</h2>
          {upcomingActivities.length === 0 ? (
            <p>No upcoming activities.</p>
          ) : (
            <div className="space-y-4">
              {upcomingActivities.map((activity) => (
                <Link key={activity.$id} href={`/activities/${activity.$id}`}>
                  <ActivityRow
                    key={activity.id}
                    activity={activity}
                    actionButtons
                  />
                </Link>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Past</h2>
          {pastActivities.length === 0 ? (
            <p>No past activities.</p>
          ) : (
            <div className="space-y-4">
              {pastActivities.map((activity) => (
                <Link key={activity.$id} href={`/activities/${activity.$id}`}>
                  <ActivityRow activity={activity} />
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
