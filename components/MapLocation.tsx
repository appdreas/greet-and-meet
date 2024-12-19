"use client";

import { Activity } from "@/config/types";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";

export default function MapLocation({ activity }: { activity: Activity }) {
  const latitude = activity.location?.latitude;
  const longitude = activity.location?.longitude;

  return (
    <div className="flex h-[300px] w-full items-center justify-center">
      {latitude && longitude && (
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={{
            latitude,
            longitude,
            zoom: 10,
          }}
          mapStyle={"mapbox://styles/mapbox/streets-v11"}
        >
          <Marker
            latitude={latitude}
            longitude={longitude}
            color="red"
            anchor="bottom"
          ></Marker>
        </Map>
      )}
    </div>
  );
}
