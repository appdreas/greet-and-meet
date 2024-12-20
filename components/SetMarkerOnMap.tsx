"use client";

import { Location } from "@/config/types";
import "mapbox-gl/dist/mapbox-gl.css";
import { Dispatch, SetStateAction } from "react";
import Map, { Marker } from "react-map-gl";

export type MarkerType = Pick<Location, "latitude" | "longitude"> | null;

export default function SetMarkerOnMap({
  newMarker,
  setNewMarker,
}: {
  newMarker: MarkerType;
  setNewMarker: Dispatch<SetStateAction<MarkerType>>;
}) {
  const handleClick = (e: { lngLat: { lat: number; lng: number } }) => {
    const { lat, lng } = e.lngLat;
    setNewMarker({
      latitude: lat,
      longitude: lng,
    });
  };

  return (
    <div className="flex h-[300px] w-full items-center justify-center z-10">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle={"mapbox://styles/mapbox/streets-v11"}
        onClick={handleClick}
        cursor="pointer"
      >
        {newMarker && (
          <Marker
            latitude={newMarker.latitude}
            longitude={newMarker.longitude}
            color="red"
            anchor="bottom"
            offset={[0, 10]}
          ></Marker>
        )}
      </Map>
    </div>
  );
}
