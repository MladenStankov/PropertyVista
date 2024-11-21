"use client";

import { IAddress, IGeoLocation } from "@/app/utils/getGeoLocationByAddress";
import React, { useState } from "react";
import Step from "./Step";
import AddressForm from "./AddressForm";
import GeneralInformationForm from "./GeneralInformationForm";
import ImageForm from "./ImageForm";
import RoomForm from "./RoomForm";
import AmenitiesForm from "./AmenitiesForm";

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

  const handleImageChange = (images: File[]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, ...images],
    }));
  };

  const handleAmenityChange = (amenities: AmenityType[]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      amenities: [...amenities],
    }));
  };

  const handleNextStep = () => {
    console.log(step);
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center m-4 p-4 md:m-10 md:p-10 mx-auto max-w-screen-lg rounded-lg shadow-2xl ring-2 bg-white">
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
              <AddressForm formData={formData} handleChange={handleChange} />
            )}
            {step === 2 && (
              <GeneralInformationForm
                formData={formData}
                handleChange={handleChange}
              />
            )}
            {step === 3 && (
              <ImageForm
                formData={formData}
                handleImageChange={handleImageChange}
              />
            )}
            {step === 4 && (
              <RoomForm formData={formData} handleChange={handleChange} />
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
                disabled={step === 5}
                onClick={handleNextStep}
                className={`px-8 md:px-16 py-4 md:py-6 w-full md:w-1/2 ${
                  step === 5
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
