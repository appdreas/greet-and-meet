import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ChevronLeftIcon, MapPinIcon, Users } from "lucide-react";
import JoinActivity from "@/components/JoinActivity";
import getActivity from "@/app/actions/getActivity";
import { formatDate, formatTime } from "@/lib/formatters";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const activity = await getActivity(id);

  const formattedDate = formatDate(activity.activity_date);
  const formattedTime = formatTime(activity.activity_date);

  return (
    <>
      <Link href="/activities" className="flex items-center mt-2  ">
        <ChevronLeftIcon className="text-muted-foreground" />
        <h2 className="text-sm text-muted-foreground">Back</h2>
      </Link>
      <div className="py-6">
        <h2 className="text-3xl font-bold text-primary mb-2">
          {activity.title}
        </h2>
        <h2 className="text-base text-muted-foreground mb-6">
          {activity.description}
        </h2>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Created by: {activity.user_id}
          </div>
          <Badge>{activity.type}</Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formattedDate} at {formattedTime}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPinIcon className="mr-2 h-4 w-4" />
            Stockholm (12 km)
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-2 h-4 w-4" />
            {activity.attendees.length} attending
          </div>
          <JoinActivity />
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Attendees</h3>
          <ul className="space-y-4">
            {activity.attendees.map((attendee) => (
              <li
                key={attendee.$id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{attendee.user_id}</p>
                  <p className="text-sm text-muted-foreground">
                    {attendee.message}
                  </p>
                </div>
                <Badge
                  variant={
                    attendee.status === "Accepted" ? "default" : "secondary"
                  }
                >
                  {attendee.status}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
