import React, { useEffect } from "react";
import ImageContainer from "./ImageContainer";
import { IUpdatedListing } from "@/app/profile/listings/edit/[uuid]/page";

interface IImageForm {
  updatedListing: IUpdatedListing;
  handleImageChange: (images: File[]) => void;
  errors: { [key: string]: string };
  setUpdatedListing: React.Dispatch<React.SetStateAction<IUpdatedListing>>;
}

export default function ImageForm({
  updatedListing,
  handleImageChange,
  errors,
  setUpdatedListing,
}: IImageForm) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const allFiles = updatedListing.files
      ? [...updatedListing.files, ...files]
      : [...files];
    handleImageChange(allFiles.filter((_, index) => index < 10));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log(files);
    const allFiles = updatedListing.files
      ? [...updatedListing.files, ...files]
      : [...files];
    console.log(allFiles);
    handleImageChange(allFiles.filter((_, index) => index <= 50));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDelete = (image: File | string) => {
    if (image instanceof File && updatedListing.files) {
      handleImageChange(updatedListing.files?.filter((file) => file !== image));
    } else {
      setUpdatedListing((prevUpdatedListing) => ({
        ...prevUpdatedListing,
        images: prevUpdatedListing.images?.filter((img) => img !== image),
      }));
    }
  };

  const renderImages = (): boolean => {
    return (
      updatedListing.images?.length > 0 || updatedListing.files?.length > 0
    );
  };
  return (
    <>
      <div className="flex flex-col gap-5">
        <div
          className={`border-2 border-blue-500 border-dashed flex justify-center text-center p-8 flex-col gap-6 ${
            errors["images"] && "border-red-500"
          }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p className="text-xl font-medium">Drag and Drop images</p>
          <p className="text-gray-400">Or</p>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
            id="image-upload-input"
          />
          <label
            htmlFor="image-upload-input"
            className="cursor-pointer text-blue-500 shadow-2xl w-fit self-center px-4 py-2 ring-2 font-bold hover:bg-gray-200"
          >
            Select Images
          </label>
          <p className="text-xs">Max 50 images</p>
        </div>
        {errors["images"] && (
          <span className="text-red-500 text-sm mt-1 self-center">
            {errors["images"]}
          </span>
        )}
        {renderImages() && (
          <div className="h-60 overflow-y-scroll grid grid-cols-1 gap-2 border p-4 rounded-md">
            {updatedListing.images.map((image, index) => (
              <ImageContainer
                key={index}
                image={image}
                handleDelete={handleDelete}
              />
            ))}
            {updatedListing.files?.map((image, index) => (
              <ImageContainer
                key={index}
                image={image}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
