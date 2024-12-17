import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, Users } from "lucide-react";
import { Activity } from "@/config/types";
import { formatDate, formatTime } from "@/lib/formatters";

export default function ActivityCard({ activity }: { activity: Activity }) {
  const formattedDate = formatDate(activity.activity_date);
  const formattedTime = formatTime(activity.activity_date);

  return (
    <Card className="h-full transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle>{activity.title}</CardTitle>
        <CardDescription>{activity.short_description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge className="mb-2">RUN</Badge>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formattedDate} at {formattedTime}
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <MapPinIcon className="mr-2 h-4 w-4" />
          Stockholm (12 km)
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Users className="mr-2 h-4 w-4" />
          {activity.attendees?.length} attending
        </div>
      </CardContent>
    </Card>
  );
}
