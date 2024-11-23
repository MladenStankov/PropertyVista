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

type PropertyType = "buy" | "rent";

type ConstructionType = "house" | "apartment";

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

interface IGeneralInformation {
  type: PropertyType;
  price: string;
  constructionType: ConstructionType;
  surfaceArea: string;
  constructionYear: string;
  description: string;
}

interface IArea {
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
  formData: IWizardForm;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export default function WizardForm() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<IWizardForm>({
    address: {
      streetNumber: "",
      streetName: "",
      postalCode: "",
      city: "",
      state: "",
      country: "",
    },
    location: {
      latitude: 0,
      longitude: 0,
    },
    general: {
      type: "buy",
      price: "",
      constructionType: "house",
      surfaceArea: "",
      constructionYear: "",
      description: "",
    },
    images: [],
    rooms: {
      numberOfBedrooms: "",
      numberOfBathrooms: "",
      numberOfOtherRooms: "",
      numberOfFloors: "",
    },
    amenities: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [newListingUUID, setNewListingUUID] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const keys = name.split(".");
      const updatedFormData = { ...prevFormData };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let currentLevel: any = updatedFormData;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i] as keyof typeof currentLevel;
        if (!currentLevel[key]) currentLevel[key] = {};
        currentLevel = currentLevel[key];
      }

      const lastKey = keys[keys.length - 1] as keyof typeof currentLevel;
      currentLevel[lastKey] = value;

      return updatedFormData;
    });
  };

  const handleLocationChange = (longitude: number, latitude: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      location: { longitude: longitude, latitude: latitude },
    }));
  };

  const handleImageChange = (images: File[]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...images],
    }));
  };

  const handleAmenityChange = (amenities: AmenityType[]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
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

    const { address, general, rooms, images } = formData;
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

      console.log(firstErrorStep);

      setStep(Number(firstErrorStep));
      return;
    }

    setIsSubmitting(true);

    try {
      const requestBody = new FormData();
      requestBody.append(
        "createListing",
        JSON.stringify({
          description: formData.general.description,
          constructionType: formData.general.constructionType,
          constructionYear: formData.general.constructionYear,
          price: formData.general.price,
          livingSurface: formData.general.surfaceArea,
          type: formData.general.type,
        })
      );

      requestBody.append(
        "createLocation",
        JSON.stringify({
          streetNumber: formData.address.streetNumber,
          streetName: formData.address.streetName,
          postalCode: formData.address.postalCode,
          city: formData.address.city,
          state: formData.address.state,
          country: formData.address.country,
          longitude: formData.location.longitude,
          latitude: formData.location.latitude,
        })
      );

      formData.images.forEach((imageFile) => {
        requestBody.append("createImages", imageFile);
      });

      requestBody.append(
        "createAmenities",
        JSON.stringify(
          formData.amenities.map((amenity) => {
            return { type: amenity };
          })
        )
      );

      requestBody.append(
        "createRooms",
        JSON.stringify([
          { type: "bedroom", amount: formData.rooms.numberOfBedrooms },
          { type: "bathroom", amount: formData.rooms.numberOfBathrooms },
          { type: "other_room", amount: formData.rooms.numberOfOtherRooms },
          { type: "floor", amount: formData.rooms.numberOfFloors },
        ])
      );

      const response = await fetch(
        `${String(process.env.NEXT_PUBLIC_API_URL)}/listings`,
        {
          method: "POST",
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
      <div className="flex flex-col justify-center items-center m-4 p-4 md:m-10 md:p-10 mx-auto max-w-screen-lg rounded-lg shadow-2xl ring-2 bg-white relative">
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
          <span className="underline">Create a Listing</span>
        </h1>

        <div className="flex flex-wrap md:flex-nowrap justify-between w-full mt-10 divide-y-2 md:divide-y-0 md:divide-x-2">
          <div className="flex flex-col md:flex-row md:pr-10 w-full md:w-1/3 mb-6 md:mb-0">
            <ul className="flex md:flex-col gap-10 max-md:gap-1 w-full justify-around">
              {Array.from({ length: 5 }).map((_, index) => (
                <li
                  key={index}
                  className="flex flex-col md:flex-row items-center md:items-start text-center
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
                formData={formData}
                handleChange={handleChange}
                handleLocationChange={handleLocationChange}
                errors={errors}
              />
            )}
            {step === 2 && (
              <GeneralInformationForm
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />
            )}
            {step === 3 && (
              <ImageForm
                formData={formData}
                handleImageChange={handleImageChange}
                errors={errors}
              />
            )}
            {step === 4 && (
              <RoomForm
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />
            )}
            {step === 5 && (
              <AmenitiesForm
                formData={formData}
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
