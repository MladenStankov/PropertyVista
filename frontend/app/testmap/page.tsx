"use client";

import React from "react";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

// interface IProps {
//   centerPosition?: { lat: number; lng: number };
// }

export default function MapComponent() {
  const position = { lat: 53.54992, lng: 10.00678 };

  return (
    <div className="h-[90svh] w-full">
      <APIProvider apiKey={String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)}>
        <Map
          defaultCenter={position}
          defaultZoom={15}
          mapId="DEMO_MAP_ID"
          style={{ width: "100%", height: "100%" }}
          disableDefaultUI
          fullscreenControl
          zoomControl
        >
          <AdvancedMarker position={position} />
        </Map>
      </APIProvider>
    </div>
  );
}
