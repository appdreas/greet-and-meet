import Link from "next/link";
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

export default function ActivityCard({ activity }: { activity: Activity }) {
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
    <Link href={`/activity/${activity.activity_id}`}>
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
            12 attending
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
