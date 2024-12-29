"use client";

import { IAddress, IGeoLocation } from "@/app/utils/getGeoLocationByAddress";
import React, { useState } from "react";
import Step from "./Step";
import AddressForm from "./AddressForm";
import GeneralInformationForm from "./GeneralInformationForm";
import ImageForm from "./ImageForm";
import RoomForm from "./RoomForm";
import AmenitiesForm from "./AmenitiesForm";
import Link from "next/link";
import {
  IListingEditing,
  IUpdatedListing,
} from "@/app/profile/listings/edit/[uuid]/page";

export type PropertyType = "buy" | "rent";

export enum ConstructionType {
  HOUSE = "house",
  APARTMENT = "apartment",
}

export enum AmenityType {
  AIR_CONDITIONING = "air_conditioning",
  HEATING = "heating",
  WASHER = "washer",
  DRYER = "dryer",
  SMART_HOME = "smart_home",
  SWIMMING_POOL = "swimming_pool",
  PARKING = "parking",
  EV_CHARGING = "ev_charging",
  GARDEN = "garden",
  TERRACE = "terrace",
  FITNESS_CENTER = "fitness_center",
  SAUNA = "sauna",
  GARAGE = "garage",
}

export interface IGeneralInformation {
  type: PropertyType;
  price: string;
  constructionType: ConstructionType;
  surfaceArea: string;
  constructionYear: string;
  description: string;
}

export interface IArea {
  numberOfBedrooms: string;
  numberOfBathrooms: string;
  numberOfOtherRooms: string;
  numberOfFloors: string;
}

export interface IWizardForm {
  address: IAddress;
  location: IGeoLocation;
  general: IGeneralInformation;
  images: File[];
  rooms: IArea;
  amenities: AmenityType[];
}

export interface IForm {
  updatedListing: IUpdatedListing;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

interface IProps {
  uuid: string;
  listing: IListingEditing;
  updatedListing: IUpdatedListing;
  setUpdatedListing: React.Dispatch<React.SetStateAction<IUpdatedListing>>;
}

export default function WizardForm({
  uuid,
  listing,
  updatedListing,
  setUpdatedListing,
}: IProps) {
  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [newListingUUID, setNewListingUUID] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setUpdatedListing((prevUpdatedListing) => {
      const keys = name.split(".");
      const updatedUpdatedListing = { ...prevUpdatedListing };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let currentLevel: any = updatedUpdatedListing;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i] as keyof typeof currentLevel;
        if (!currentLevel[key]) currentLevel[key] = {};
        currentLevel = currentLevel[key];
      }

      const lastKey = keys[keys.length - 1] as keyof typeof currentLevel;
      currentLevel[lastKey] = value;

      return updatedUpdatedListing;
    });
  };

  const handleLocationChange = (longitude: number, latitude: number) => {
    setUpdatedListing((prevUpdatedListing) => ({
      ...prevUpdatedListing,
      location: { longitude: longitude, latitude: latitude },
    }));
  };

  const handleImageChange = (images: File[]) => {
    setUpdatedListing((prevUpdatedListing) => ({
      ...prevUpdatedListing,
      files: [...images],
    }));
  };

  const handleAmenityChange = (amenities: AmenityType[]) => {
    setUpdatedListing((prevUpdatedListing) => ({
      ...prevUpdatedListing,
      amenities: [...amenities],
    }));
  };

  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePreviousStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepTitle = (index: number) => {
    switch (index) {
      case 0:
        return "Address and Location";
      case 1:
        return "General Information";
      case 2:
        return "Images";
      case 3:
        return "Room Information";
      case 4:
        return "Amenities";
      default:
        return "";
    }
  };

  const validateForm = (): {
    isValid: boolean;
    errors: Record<string, string>;
  } => {
    const errors: Record<string, string> = {};

    const { address, general, rooms, images } = updatedListing;
    if (!address.streetNumber)
      errors["address.streetNumber"] = "Street number is required.";
    if (!address.streetName)
      errors["address.streetName"] = "Street name is required.";
    if (!address.postalCode)
      errors["address.postalCode"] = "Postal code is required.";
    if (!address.city) errors["address.city"] = "City is required.";
    if (!address.country) errors["address.country"] = "Country is required.";

    if (!general.price) errors["general.price"] = "Price is required.";
    if (!general.surfaceArea)
      errors["general.surfaceArea"] = "Surface area is required.";
    if (!general.constructionYear) {
      errors["general.constructionYear"] = "Construction year is required.";
    } else if (
      isNaN(Number(general.constructionYear)) ||
      Number(general.constructionYear) < 0 ||
      Number(general.constructionYear) > 2024
    ) {
      errors["general.constructionYear"] =
        "Construction year must be between 0 and 2024.";
    }
    if (!general.description)
      errors["general.description"] = "Description is required.";

    if (images.length <= 0)
      errors["images"] = "At least one image is required.";

    if (!rooms.numberOfBedrooms)
      errors["rooms.numberOfBedrooms"] = "Number of bedrooms is required.";
    if (!rooms.numberOfBathrooms)
      errors["rooms.numberOfBathrooms"] = "Number of bathrooms is required.";
    if (!rooms.numberOfOtherRooms)
      errors["rooms.numberOfOtherRooms"] = "Number of other rooms is required.";
    if (!rooms.numberOfFloors)
      errors["rooms.numberOfFloors"] = "Number of floors is required.";

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { isValid, errors } = validateForm();
    setErrors(errors);

    if (!isValid) {
      let firstErrorStep = 0;

      Object.keys(errors).forEach((key) => {
        if (firstErrorStep == 0) {
          if (key.startsWith("address")) firstErrorStep = 1;
          else if (key.startsWith("general")) firstErrorStep = 2;
          else if (key.startsWith("images")) firstErrorStep = 3;
          else if (key.startsWith("rooms")) firstErrorStep = 4;
          else firstErrorStep = 5;
        }
      });

      setStep(Number(firstErrorStep));
      return;
    }

    setIsSubmitting(true);

    try {
      const requestBody = new FormData();
      requestBody.append(
        "listing",
        JSON.stringify({
          description:
            updatedListing.general.description !== listing.general.description
              ? updatedListing.general.description
              : listing.general.description,
          constructionType:
            updatedListing.general.constructionType !==
            listing.general.constructionType
              ? updatedListing.general.constructionType
              : listing.general.constructionType,
          constructionYear:
            updatedListing.general.constructionYear !==
            listing.general.constructionYear
              ? updatedListing.general.constructionYear
              : listing.general.constructionYear,
          price:
            updatedListing.general.price !== listing.general.price
              ? updatedListing.general.price
              : listing.general.price,
          livingSurface:
            updatedListing.general.surfaceArea !== listing.general.surfaceArea
              ? updatedListing.general.surfaceArea
              : listing.general.surfaceArea,
          type:
            updatedListing.general.type !== listing.general.type
              ? updatedListing.general.type
              : listing.general.type,
        })
      );

      requestBody.append(
        "location",
        JSON.stringify({
          streetNumber:
            updatedListing.address.streetNumber !== listing.address.streetNumber
              ? updatedListing.address.streetNumber
              : listing.address.streetNumber,
          streetName:
            updatedListing.address.streetName !== listing.address.streetName
              ? updatedListing.address.streetName
              : listing.address.streetName,
          postalCode:
            updatedListing.address.postalCode !== listing.address.postalCode
              ? updatedListing.address.postalCode
              : listing.address.postalCode,
          city:
            updatedListing.address.city !== listing.address.city
              ? updatedListing.address.city
              : listing.address.city,
          state:
            updatedListing.address.state !== listing.address.state
              ? updatedListing.address.state
              : listing.address.state,
          country:
            updatedListing.address.country !== listing.address.country
              ? updatedListing.address.country
              : listing.address.country,
          longitude:
            updatedListing.location.longitude !== listing.location.longitude
              ? updatedListing.location.longitude
              : listing.location.longitude,
          latitude:
            updatedListing.location.latitude !== listing.location.latitude
              ? updatedListing.location.latitude
              : listing.location.latitude,
        })
      );

      updatedListing.files?.forEach((imageFile) => {
        requestBody.append("images", imageFile);
      });

      const deletedImages = listing.images.filter(
        (image) => !updatedListing.images.includes(image)
      );

      requestBody.append(
        "deletedImages",
        JSON.stringify(
          deletedImages.map((image) => {
            return { imageUrl: image };
          })
        )
      );

      const newAmenities = updatedListing.amenities.filter(
        (amenity) => !listing.amenities.includes(amenity)
      );

      requestBody.append(
        "amenities",
        JSON.stringify(
          newAmenities.map((amenity) => {
            return { type: amenity };
          })
        )
      );

      const deletedAmenities = listing.amenities.filter(
        (amenity) => !updatedListing.amenities.includes(amenity)
      );

      requestBody.append(
        "deletedAmenities",
        JSON.stringify(
          deletedAmenities.map((amenity) => {
            return { type: amenity };
          })
        )
      );

      requestBody.append(
        "rooms",
        JSON.stringify([
          { type: "bedroom", amount: updatedListing.rooms.numberOfBedrooms },
          { type: "bathroom", amount: updatedListing.rooms.numberOfBathrooms },
          {
            type: "other_room",
            amount: updatedListing.rooms.numberOfOtherRooms,
          },
          { type: "floor", amount: updatedListing.rooms.numberOfFloors },
        ])
      );

      const response = await fetch(
        `${String(process.env.NEXT_PUBLIC_API_URL)}/listings/${uuid}`,
        {
          method: "PATCH",
          credentials: "include",
          body: requestBody,
        }
      );

      const responseBody = await response.json();
      setNewListingUUID(responseBody.uuid);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center m-4 p-4 md:m-10 md:p-10 mx-auto min-w-[calc(80%)] max-h-full rounded-lg shadow-2xl ring-2 bg-white relative">
        {newListingUUID && (
          <div className="inset-0 w-full h-full bg-white absolute z-[1] flex flex-col items-center justify-center gap-10 p-10  ">
            <h1 className="text-center text-5xl font-medium drop-shadow-2xl text-slate-600 ">
              Your have successfully published your listing!
            </h1>
            <Link href={`/listings/${newListingUUID}`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 text-2xl font-semibold shadow-md rounded-md">
                Check out your listing
              </button>
            </Link>
          </div>
        )}

        <h1 className="text-left self-start text-2xl md:text-4xl">
          <span className="underline">Update a Listing</span>
        </h1>

        <div className="flex flex-wrap md:flex-nowrap justify-between w-full mt-10 divide-y-2 md:divide-y-0 md:divide-x-2">
          <div className="flex flex-col md:flex-row md:pr-10 w-full md:w-1/3 mb-6 md:mb-0">
            <ul className="flex md:flex-col gap-10 max-md:gap-1 w-full justify-around">
              {Array.from({ length: 5 }).map((_, index) => (
                <li
                  key={index}
                  className="flex flex-col md:flex-row items-center md:items-start text-center gap-10
                   hover:bg-slate-100 hover:cursor-pointer p-2 rounded-full"
                  onClick={() => setStep(index + 1)}
                >
                  <Step
                    step={index + 1}
                    title={handleStepTitle(index)}
                    current={index + 1 === step}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-6 md:gap-10 px-4 md:px-10 relative">
            {step === 1 && (
              <AddressForm
                updatedListing={updatedListing}
                handleChange={handleChange}
                handleLocationChange={handleLocationChange}
                errors={errors}
              />
            )}
            {step === 2 && (
              <GeneralInformationForm
                updatedListing={updatedListing}
                handleChange={handleChange}
                errors={errors}
              />
            )}
            {step === 3 && (
              <ImageForm
                updatedListing={updatedListing}
                handleImageChange={handleImageChange}
                errors={errors}
                setUpdatedListing={setUpdatedListing}
              />
            )}
            {step === 4 && (
              <RoomForm
                updatedListing={updatedListing}
                handleChange={handleChange}
                errors={errors}
              />
            )}
            {step === 5 && (
              <AmenitiesForm
                updatedListing={updatedListing}
                handleAmenityChange={handleAmenityChange}
              />
            )}

            <div className="text-white flex  gap-4 justify-center text-sm md:text-xl mt-auto">
              <button
                disabled={step === 1}
                onClick={handlePreviousStep}
                className={`px-8 md:px-16 py-4 md:py-6 w-full md:w-1/2 ${
                  step === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Back
              </button>

              <button
                onClick={(e) =>
                  step === 5 ? handleSubmit(e) : handleNextStep(e)
                }
                disabled={isSubmitting}
                className={`px-8 md:px-16 py-4 md:py-6 w-full md:w-1/2 bg-blue-500 hover:bg-blue-600 `}
              >
                {step === 5
                  ? isSubmitting
                    ? "Submitting..."
                    : "Submit"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
