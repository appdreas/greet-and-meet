"use client";

import { Activity } from "@/config/types";
import { Badge } from "./ui/badge";
import { useAuth } from "@/context/authContext";

export default function AttendeesList({ activity }: { activity: Activity }) {
  const { isAuthenticated } = useAuth();
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Attendees</h3>
      {isAuthenticated ? (
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
      ) : (
        <div className="space-y-4">
          <h4 className="text-md">
            Sign in to see who is attending this activity!
          </h4>
        </div>
      )}
    </div>
  );
}
