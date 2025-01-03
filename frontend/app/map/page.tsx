"use client";

import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { PropertyType } from "../components/sell/WizardForm";
import CustomInfoWindow from "../components/CustomInfoWindow";
import CustomMarker from "../components/CustomMarker";

const mapContainerStyle = {
  width: "100%",
  height: "85dvh",
};

export interface IMapListing {
  uuid: string;
  lat: number;
  lng: number;
  price: number;
  imageUrl: string;
  type: PropertyType;
}

export default function ListingMap() {
  const [listings, setListings] = useState<IMapListing[] | null>(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY),
  });
  const [selectedListing, setSelectedListing] = useState<IMapListing | null>(
    null
  );
  const [center, setCenter] = useState({ lat: 40, lng: 40 });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/listings/map/locations`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchListings();
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={4}
      center={center}
      options={{
        clickableIcons: false,
        disableDefaultUI: true,
        gestureHandling: "greedy",
      }}
    >
      {listings?.map((listing) => (
        <Marker
          key={listing.uuid}
          position={{ lat: listing.lat, lng: listing.lng }}
          onClick={() => {
            setSelectedListing(listing);
            setCenter({ lat: listing.lat, lng: listing.lng });
          }}
          icon={{
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(
                CustomMarker({ price: listing.price, type: listing.type })
              ),
            scaledSize: new window.google.maps.Size(120, 50),
          }}
        />
      ))}

      {selectedListing && (
        <InfoWindow
          position={{
            lat: selectedListing.lat,
            lng: selectedListing.lng,
          }}
          onCloseClick={() => setSelectedListing(null)}
        >
          <CustomInfoWindow listing={selectedListing} />
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
