"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { PropertyType } from "../components/sell/WizardForm";
import CustomInfoWindow from "../components/CustomInfoWindow";
import styles from "./Map.module.css";

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

        if (data && data.length > 0) {
          setCenter({ lat: data[0].lat, lng: data[0].lng });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchListings();
  }, []);

  const markers = useMemo(() => {
    if (!listings) return [];
    return listings.map((listing) => ({
      position: { lat: listing.lat, lng: listing.lng },
      listing,
    }));
  }, [listings]);

  const handleMarkerClick = useCallback((listing: IMapListing) => {
    setSelectedListing(listing);
    setCenter({ lat: listing.lat, lng: listing.lng });
  }, []);

  return (
    <APIProvider apiKey={String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)}>
      <Map
        className={styles.mapContainer}
        zoom={4}
        center={center}
        gestureHandling="greedy"
        mapId="property-map"
        disableDefaultUI
      >
        {markers.map((marker) => (
          <AdvancedMarker
            key={marker.listing.uuid}
            position={marker.position}
            onClick={() => handleMarkerClick(marker.listing)}
          >
            <div className={styles.markerContainer}>
              <div className={styles.price}>
                ${marker.listing.price.toLocaleString()}
              </div>
              <div className={styles.type}>{marker.listing.type}</div>
            </div>
          </AdvancedMarker>
        ))}
        {selectedListing && (
          <CustomInfoWindow
            listing={selectedListing}
            onClose={() => setSelectedListing(null)}
          />
        )}
      </Map>
    </APIProvider>
  );
}
