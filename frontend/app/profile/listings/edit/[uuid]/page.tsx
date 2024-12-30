"use client";

import Loading from "@/app/components/Loading";
import WizardForm from "@/app/components/profile/WizardForm";
import {
  AmenityType,
  IArea,
  IGeneralInformation,
} from "@/app/components/sell/WizardForm";
import { IAddress, IGeoLocation } from "@/app/utils/getGeoLocationByAddress";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface IListingEditing {
  address: IAddress;
  location: IGeoLocation;
  general: IGeneralInformation;
  images: string[];
  rooms: IArea;
  amenities: AmenityType[];
}

export interface IUpdatedListing extends IListingEditing {
  files: File[];
}

export default function EditListing() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listing, setListing] = useState<IListingEditing>(
    {} as IListingEditing
  );
  const [updatedListing, setUpdatedListing] = useState<IUpdatedListing>(
    {} as IUpdatedListing
  );
  const uuid = usePathname().split("/").pop();

  useEffect(() => {
    async function fetchListing() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/listings/for-editing/${uuid}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Failed to fetch listing");
      }

      const data = await response.json();
      setListing(data);
      setUpdatedListing(data);
      setUpdatedListing((prevUpdatedListing) => ({
        ...prevUpdatedListing,
        files: [],
      }));
      setIsLoading(false);
    }
    fetchListing();
  }, [uuid]);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : uuid &&
        listing.address &&
        listing.location &&
        listing.general &&
        listing.rooms &&
        listing.amenities ? (
        <WizardForm
          uuid={uuid}
          listing={listing}
          updatedListing={updatedListing}
          setUpdatedListing={setUpdatedListing}
        />
      ) : (
        <h1 className="text-4xl font-bold text-center m-10">Unauthorized</h1>
      )}
    </div>
  );
}
