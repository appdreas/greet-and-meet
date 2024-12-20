import getActivity from "@/app/actions/getActivity";
import AttendeesList from "@/components/AttendeesList";
import ClosestCity from "@/components/ClosestCity";
import JoinActivity from "@/components/JoinActivity";
import MapLocation from "@/components/MapLocation";
import PreviousPageButton from "@/components/PreviousPageButton";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatTime } from "@/lib/formatters";
import { CalendarIcon, ChevronLeftIcon, Users } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const activity = await getActivity(id);

  const formattedDate = formatDate(activity.activity_date);
  const formattedTime = formatTime(activity.activity_date);

  const acceptedAttendees = activity.attendees.filter(
    (attendee) => attendee.status === "Accepted"
  );

  const pendingAttendees = activity.attendees.filter(
    (attendee) => attendee.status === "Pending"
  );

  return (
    <>
      <PreviousPageButton className="flex items-center mt-2">
        <ChevronLeftIcon className="text-muted-foreground" />
        <h2 className="text-sm text-muted-foreground">Back</h2>
      </PreviousPageButton>
      <div className="py-6">
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <h2 className="text-3xl font-bold text-primary mb-2">
              {activity.title}
            </h2>
            <h2 className="text-base text-muted-foreground mb-6">
              {activity.description}
            </h2>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Created by: {activity.name}
              </div>
              <Badge>{activity.type}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formattedDate} at {formattedTime}
              </div>
              <ClosestCity activity={activity} />
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                {acceptedAttendees.length} attending ({pendingAttendees.length}{" "}
                pending)
              </div>
              <JoinActivity activity={activity} />
            </div>
          </div>
          <div className="col-span-2">
            <MapLocation activity={activity} />
          </div>
        </div>

        <AttendeesList activity={activity} status="Pending" />
        <AttendeesList activity={activity} status="Accepted" />
        <AttendeesList activity={activity} status="Rejected" />
      </div>
    </>
  );
}
