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
import { IListingEditing } from "@/app/profile/listings/edit/[uuid]/page";

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
  formData: IWizardForm;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

interface IProps {
  isEditing?: boolean;
  uuid?: string;
  initialListing?: IListingEditing;
}

export default function WizardForm({
  isEditing,
  uuid,
  initialListing,
}: IProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<IWizardForm>({
    address: {
      streetNumber: initialListing?.address.streetNumber || "",
      streetName: initialListing?.address.streetName || "",
      postalCode: initialListing?.address.postalCode || "",
      city: initialListing?.address.city || "",
      state: initialListing?.address.state || "",
      country: initialListing?.address.country || "",
    },
    location: {
      latitude: initialListing?.location.latitude || 0,
      longitude: initialListing?.location.longitude || 0,
    },
    general: {
      type: initialListing?.general.type || "buy",
      price: initialListing?.general.price || "",
      constructionType:
        initialListing?.general.constructionType || ConstructionType.HOUSE,
      surfaceArea: initialListing?.general.surfaceArea || "",
      constructionYear: initialListing?.general.constructionYear || "",
      description: initialListing?.general.description || "",
    },
    images: [],
    rooms: {
      numberOfBedrooms: initialListing?.rooms.numberOfBedrooms || "",
      numberOfBathrooms: initialListing?.rooms.numberOfBathrooms || "",
      numberOfOtherRooms: initialListing?.rooms.numberOfOtherRooms || "",
      numberOfFloors: initialListing?.rooms.numberOfFloors || "",
    },
    amenities: initialListing?.amenities || [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [newListingUUID, setNewListingUUID] = useState<string | null>(null);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

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

  const handleDeleteImage = (imageUrl: string) => {
    setDeletedImages((prev) => [...prev, imageUrl]);
  };

  const handleAmenityChange = (amenities: AmenityType[]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      amenities: [...amenities],
    }));
  };

  const validateAddressStep = (): {
    isValid: boolean;
    errors: Record<string, string>;
  } => {
    const errors: Record<string, string> = {};
    const { address } = formData;

    if (!address.streetNumber)
      errors["address.streetNumber"] = "Street number is required.";
    if (!address.streetName)
      errors["address.streetName"] = "Street name is required.";
    if (!address.postalCode)
      errors["address.postalCode"] = "Postal code is required.";
    if (!address.city) errors["address.city"] = "City is required.";
    if (!address.country) errors["address.country"] = "Country is required.";

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const validateGeneralStep = (): {
    isValid: boolean;
    errors: Record<string, string>;
  } => {
    const errors: Record<string, string> = {};
    const { general } = formData;

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

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const validateImagesStep = (): {
    isValid: boolean;
    errors: Record<string, string>;
  } => {
    const errors: Record<string, string> = {};
    const { images } = formData;
    const remainingImages =
      initialListing?.images?.filter((img) => !deletedImages.includes(img)) ||
      [];

    if (images.length <= 0 && remainingImages.length <= 0)
      errors["images"] = "At least one image is required.";

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const validateRoomsStep = (): {
    isValid: boolean;
    errors: Record<string, string>;
  } => {
    const errors: Record<string, string> = {};
    const { rooms } = formData;

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

  const validateCurrentStep = (): {
    isValid: boolean;
    errors: Record<string, string>;
  } => {
    switch (step) {
      case 1:
        return validateAddressStep();
      case 2:
        return validateGeneralStep();
      case 3:
        return validateImagesStep();
      case 4:
        return validateRoomsStep();
      case 5:
        return { isValid: true, errors: {} }; // Amenities are optional
      default:
        return { isValid: false, errors: {} };
    }
  };

  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { isValid, errors } = validateCurrentStep();
    setErrors(errors);

    if (isValid) {
      setStep((prev) => Math.min(prev + 1, 5));
    }
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
    const { address, general, rooms } = formData;
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

    const remainingImages =
      initialListing?.images?.filter((img) => !deletedImages.includes(img)) ||
      [];
    if (formData.images.length <= 0 && remainingImages.length <= 0)
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

      // Common data for both create and edit
      requestBody.append(
        "listing",
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
        "location",
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
        requestBody.append("images", imageFile);
      });

      if (isEditing && initialListing) {
        // Handle deleted images for edit mode
        const deletedImagesData = deletedImages.map((imageUrl) => ({
          imageUrl,
        }));
        requestBody.append("deletedImages", JSON.stringify(deletedImagesData));

        // Handle amenities for edit mode
        const newAmenities = formData.amenities.filter(
          (amenity) => !initialListing.amenities.includes(amenity)
        );
        requestBody.append(
          "amenities",
          JSON.stringify(newAmenities.map((amenity) => ({ type: amenity })))
        );

        const deletedAmenities = initialListing.amenities.filter(
          (amenity) => !formData.amenities.includes(amenity)
        );
        requestBody.append(
          "deletedAmenities",
          JSON.stringify(deletedAmenities.map((amenity) => ({ type: amenity })))
        );
      } else {
        // Handle amenities for create mode
        requestBody.append(
          "amenities",
          JSON.stringify(
            formData.amenities.map((amenity) => {
              return { type: amenity };
            })
          )
        );
      }

      requestBody.append(
        "rooms",
        JSON.stringify([
          { type: "bedroom", amount: formData.rooms.numberOfBedrooms },
          { type: "bathroom", amount: formData.rooms.numberOfBathrooms },
          { type: "other_room", amount: formData.rooms.numberOfOtherRooms },
          { type: "floor", amount: formData.rooms.numberOfFloors },
        ])
      );

      const endpoint = isEditing
        ? `${String(process.env.NEXT_PUBLIC_API_URL)}/listings/${uuid}`
        : `${String(process.env.NEXT_PUBLIC_API_URL)}/listings`;

      const response = await fetch(endpoint, {
        method: isEditing ? "PATCH" : "POST",
        credentials: "include",
        body: requestBody,
      });

      const responseBody = await response.json();
      setNewListingUUID(responseBody.uuid);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto ">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {newListingUUID && (
            <div className="absolute inset-0 w-full h-full bg-white/95 backdrop-blur-sm z-[1] flex flex-col items-center justify-center gap-10 p-10">
              <div className="text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {isEditing
                    ? "Your listing has been updated!"
                    : "Your listing has been published!"}
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Congratulations! Your property listing is now live and ready
                  to be discovered by potential buyers.
                </p>
              </div>
              <Link href={`/listings/${newListingUUID}`}>
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-xl font-semibold rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                  View Your Listing
                </button>
              </Link>
            </div>
          )}

          <div className="p-6 md:p-10 border-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
              {isEditing ? "Update Your Listing" : "Create a New Listing"}
            </h1>

            <div className="flex flex-col lg:flex-row gap-10">
              {/* Sidebar */}
              <div className="w-full lg:w-72 shrink-0">
                <div className="bg-gray-50 rounded-xl p-6">
                  <ul className="space-y-8">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <li key={index} className="py-2">
                        <Step
                          step={index + 1}
                          title={handleStepTitle(index)}
                          current={index + 1 === step}
                          completed={index + 1 < step}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <div className="bg-gray-50/50 rounded-xl p-6 md:p-8">
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
                      existingImages={initialListing?.images}
                      deletedImages={deletedImages}
                      onDeleteImage={handleDeleteImage}
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

                  <div className="flex gap-4 mt-8">
                    <button
                      disabled={step === 1}
                      onClick={handlePreviousStep}
                      className={`px-6 py-3 rounded-xl font-medium text-white transition-all duration-200 flex-1 ${
                        step === 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
                      }`}
                    >
                      Back
                    </button>

                    <button
                      onClick={(e) =>
                        step === 5 ? handleSubmit(e) : handleNextStep(e)
                      }
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 flex-1 disabled:from-blue-300 disabled:to-indigo-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {step === 5 ? (
                        isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          "Submit"
                        )
                      ) : (
                        "Next"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
