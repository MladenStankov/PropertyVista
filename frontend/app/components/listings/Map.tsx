"use client";

import {
  GoogleMap,
  Libraries,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { IGeoLocation } from "../../utils/getGeoLocationByAddress";

await google.maps;

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface MapProps {
  coordinates: IGeoLocation;
}

function MapComponent({ coordinates }: MapProps) {
  const [location, setLocation] = useState<IGeoLocation | null>(null);
  const [libraries] = useState<Libraries>(["maps", "marker"]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY),
    libraries: libraries,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLocation(coordinates);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, [coordinates]);

  const isValidLocation =
    location && !isNaN(location.latitude) && !isNaN(location.longitude);

  return isLoaded && isValidLocation ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: location.latitude, lng: location.longitude }}
      zoom={15}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
      }}
    >
      <Marker position={{ lat: location.latitude, lng: location.longitude }} />
    </GoogleMap>
  ) : (
    <div>Loading map...</div>
  );
}

const Map = React.memo(MapComponent);

export default Map;
