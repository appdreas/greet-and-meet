import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, Users } from "lucide-react";
import getActivities from "@/app/actions/getActivities";
import JoinActivity from "@/components/JoinActivity";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log(id);

  const activities = await getActivities();

  const attendees = [
    { id: "1", name: "Andreas", message: "I want to play", status: "pending" },
    { id: "2", name: "Emma", message: "Fun", status: "accepted" },
  ];

  const activity = { ...activities[0], attendees };

  const date = new Date(activity.activity_date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{activity.title}</CardTitle>
          <CardDescription>{activity.description}</CardDescription>
        </CardHeader>
        <CardContent>
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
                  key={attendee.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{attendee.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {attendee.message}
                    </p>
                  </div>
                  <Badge
                    variant={
                      attendee.status === "accepted" ? "default" : "secondary"
                    }
                  >
                    {attendee.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
