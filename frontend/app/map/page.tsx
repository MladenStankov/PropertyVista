"use client";

import { useEffect, useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import useSupercluster from "use-supercluster";
import type { BBox } from "geojson";
import CustomInfoWindow from "../components/CustomInfoWindow";
import styles from "./Map.module.css";

export interface IMapListing {
  uuid: string;
  lat: number;
  lng: number;
  price: number;
  imageUrl: string;
  type: string;
}

interface ClusterProperties {
  cluster: boolean;
  listingId: string;
  price: number;
  imageUrl: string;
  propertyType: string;
  listing: IMapListing;
  cluster_id?: number;
  point_count?: number;
}

export default function ListingMap() {
  const [listings, setListings] = useState<IMapListing[] | null>(null);
  const [selectedListing, setSelectedListing] = useState<IMapListing | null>(
    null
  );
  const [bounds, setBounds] = useState<BBox>([0, 0, 0, 0]);
  const [zoom, setZoom] = useState(4);
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
        console.log("Fetched listings:", data);

        if (data && data.length > 0) {
          setCenter({ lat: data[0].lat, lng: data[0].lng });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchListings();
  }, []);

  const points =
    listings?.map((listing) => ({
      type: "Feature" as const,
      properties: {
        cluster: false,
        listingId: listing.uuid,
        price: listing.price,
        imageUrl: listing.imageUrl,
        propertyType: listing.type,
        listing,
      },
      geometry: {
        type: "Point" as const,
        coordinates: [listing.lng, listing.lat],
      },
    })) || [];

  const { clusters, supercluster } = useSupercluster<ClusterProperties>({
    points,
    bounds,
    zoom,
    options: {
      radius: 75,
      maxZoom: 20,
    },
  });

  return (
    <APIProvider apiKey={String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)}>
      <Map
        className={styles.mapContainer}
        defaultZoom={zoom}
        defaultCenter={center}
        gestureHandling="greedy"
        mapId="property-map"
        disableDefaultUI
        onCameraChanged={(ev) => {
          const viewBounds = ev.map?.getBounds();
          const zoom = ev.map?.getZoom() || 4;

          if (viewBounds) {
            const ne = viewBounds.getNorthEast();
            const sw = viewBounds.getSouthWest();
            setBounds([sw.lng(), sw.lat(), ne.lng(), ne.lat()]);
            setZoom(zoom);
          }
        }}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount = 0,
            cluster_id: clusterId,
            listing,
          } = cluster.properties;

          if (isCluster && supercluster && clusterId !== undefined) {
            return (
              <AdvancedMarker
                key={`cluster-${clusterId}`}
                position={{ lat: latitude, lng: longitude }}
              >
                <div className={styles.clusterMarker}>{pointCount}</div>
              </AdvancedMarker>
            );
          }

          if (!listing) return null;

          return (
            <AdvancedMarker
              key={cluster.properties.listingId}
              position={{ lat: latitude, lng: longitude }}
              onClick={() => {
                setSelectedListing(listing);
                setCenter({ lat: latitude, lng: longitude });
              }}
            >
              <div className={styles.markerContainer}>
                {selectedListing?.uuid !== cluster.properties.listingId && (
                  <div className={styles.price}>
                    €{cluster.properties.price.toLocaleString()}
                    <p className="text-sm text-gray-500">
                      {cluster.properties.propertyType === "rent"
                        ? "/month"
                        : ""}
                    </p>
                  </div>
                )}

                {selectedListing?.uuid === cluster.properties.listingId &&
                  selectedListing && (
                    <CustomInfoWindow
                      listing={selectedListing}
                      onClose={() => setSelectedListing(null)}
                    />
                  )}
              </div>
            </AdvancedMarker>
          );
        })}
      </Map>
    </APIProvider>
  );
}
