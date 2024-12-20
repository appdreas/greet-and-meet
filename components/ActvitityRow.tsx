import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "@/config/types";
import { formatDate, formatTime } from "@/lib/formatters";
import { formatDistanceToNowStrict, isAfter } from "date-fns";
import ActionButtons from "./ActionButtons";
import ClosestCity from "./ClosestCity";

export default function ActivityRow({
  activity,
  actionButtons = false,
  displayCountdown = false,
}: {
  activity: Activity;
  actionButtons?: boolean;
  displayCountdown?: boolean;
}) {
  const formattedDate = formatDate(activity.activity_date);
  const formattedTime = formatTime(activity.activity_date);

  const timeToActivity =
    displayCountdown && formatDistanceToNowStrict(formattedDate);

  const upcoming = isAfter(activity.activity_date, new Date());

  return (
    <Card key={activity.id} className="w-full mb-2">
      <div className="grid grid-cols-2 lg:grid-cols-12 lg:gap-4 gap-1">
        <CardHeader className="flex-shrink-0 lg:col-span-3">
          <CardTitle>{activity.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {`${formattedDate} at ${formattedTime}`}
          </p>
        </CardHeader>
        <div className="flex items-center col-span-3 pl-6 lg:pl-0">
          <p className="text-xs text-muted-foreground">
            {activity.description}
          </p>
        </div>
        <div className="flex items-center lg:col-span-1 col-span-2 pl-6 lg:pl-0">
          <Badge>{activity.type}</Badge>
        </div>
        <ClosestCity activity={activity} />
        <div className="flex items-start lg:items-center lg:col-span-1 col-span-2 pl-6 lg:pl-0">
          {activity.attendees ? (
            <p>{activity.attendees.length} attending</p>
          ) : activity.status ? (
            <Badge
              variant={
                activity.status === "Accepted"
                  ? "default"
                  : activity.status === "Rejected"
                  ? "destructive"
                  : "secondary"
              }
            >
              {activity.status}
            </Badge>
          ) : (
            <></>
          )}
        </div>
        <div
          className={`flex items-start lg:items-center lg:col-span-2 col-span-2 pr-2 lg:pb-0 pb-4 ${
            displayCountdown ? "justify-end" : "justify-end"
          }`}
        >
          {actionButtons && <ActionButtons activity={activity} />}
          {timeToActivity && (
            <div className="text-sm">
              {upcoming
                ? `Activity starts in ${timeToActivity}`
                : `Activity started ${timeToActivity} ago`}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
