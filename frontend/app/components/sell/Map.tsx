"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import getGeoLocationByCurrentLocation from "../../utils/getGeoLocationByCurrentLocation";
import getGeoLocationByAddress, {
  IAddress,
  IGeoLocation,
} from "../../utils/getGeoLocationByAddress";

const containerStyle = {
  width: "100%",
  height: "200px",
};

interface IMapComponent extends IAddress {
  handleLocationChange: (longitude: number, latitude: number) => void;
}

function MapComponent({
  streetNumber,
  streetName,
  postalCode,
  city,
  state,
  country,
  handleLocationChange,
}: IMapComponent) {
  const [location, setLocation] = useState<IGeoLocation | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY),
    libraries: ["maps", "marker"],
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let coordinates = await getGeoLocationByAddress({
          streetNumber,
          streetName,
          postalCode,
          city,
          state,
          country,
        });
        if (coordinates === null) {
          coordinates = await getGeoLocationByCurrentLocation();
        }
        if (coordinates === null) {
          coordinates = { latitude: 0, longitude: 0 };
        }

        handleLocationChange(coordinates.longitude, coordinates.latitude);
        setLocation(coordinates);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, [streetName, streetNumber, postalCode, city, country, state]);

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
