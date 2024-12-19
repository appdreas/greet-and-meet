import { Activity } from "@/config/types";
import { MapPinIcon } from "lucide-react";

export default async function ClosestCity({
  activity,
}: {
  activity: Activity;
}) {
  const latitude = activity.location?.latitude;
  const longitude = activity.location?.longitude;

  const data = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  );
  const placeData = await data.json();

  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <MapPinIcon className="mr-2 h-4 w-4" />
      {placeData?.address?.village} ({placeData?.address?.country})
    </div>
  );
}
