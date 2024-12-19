"use client";

import { Activity, Status } from "@/config/types";
import { useAuth } from "@/context/authContext";
import ChangeActivityStatus from "./ChangeActivityStatus";

export default function AttendeesList({
  activity,
  status,
}: {
  activity: Activity;
  status: Status;
}) {
  const { user } = useAuth();

  const attendees = activity.attendees.filter(
    (attendee) => attendee.status === status
  );
  return (
    user?.id === activity.user_id && (
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">{status} Attendees</h3>
        <ul className="space-y-4">
          {attendees.map((attendee) => (
            <li
              key={attendee.$id}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{attendee.name}</p>
                <p className="text-sm text-muted-foreground">
                  {attendee.message}
                </p>
              </div>
              <ChangeActivityStatus activity={activity} attendee={attendee} />
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
