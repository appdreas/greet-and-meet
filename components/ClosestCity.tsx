import { Activity } from "@/config/types";
import { MapPinIcon } from "lucide-react";

export default function ClosestCity({ activity }: { activity: Activity }) {
  const latitude = activity.location?.latitude;
  const longitude = activity.location?.longitude;

  // try {
  //   const data = await fetch(
  //     `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  //   );
  //   placeData = await data.json();
  // } catch (error) {
  //   console.log(error);
  // }

  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <MapPinIcon className="mr-2 h-4 w-4" />
      Latitude: {latitude?.toFixed(6)}, Longitude: {longitude?.toFixed(6)}
    </div>
  );
}
