import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity } from "@/config/types";
import { formatDate, formatTime } from "@/lib/formatters";
import { CalendarIcon, Users } from "lucide-react";
import ClosestCity from "./ClosestCity";

export default function ActivityCard({ activity }: { activity: Activity }) {
  const formattedDate = formatDate(activity.activity_date);
  const formattedTime = formatTime(activity.activity_date);

  return (
    <Card className="h-full transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle>{activity.title}</CardTitle>
        <CardDescription>{activity.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge className="mb-2">{activity.type}</Badge>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formattedDate} at {formattedTime}
        </div>
        <ClosestCity activity={activity} />
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Users className="mr-2 h-4 w-4" />
          {activity.attendees?.length} attending
        </div>
      </CardContent>
    </Card>
  );
}
