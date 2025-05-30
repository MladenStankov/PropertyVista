import React from "react";
import { useDropzone } from "react-dropzone";
import { IWizardForm } from "./WizardForm";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";

interface IImageForm {
  formData: IWizardForm;
  handleImageChange: (images: File[]) => void;
  errors: Record<string, string>;
  existingImages?: string[];
  deletedImages?: string[];
  onDeleteImage?: (imageUrl: string) => void;
}

interface ImageContainerProps {
  image: File | string;
  index: number;
  handleRemoveImage: (index: number) => void;
  isExistingImage?: boolean;
}

function ImageContainer({
  image,
  index,
  handleRemoveImage,
  isExistingImage,
}: ImageContainerProps) {
  const imageUrl = isExistingImage
    ? (image as string)
    : URL.createObjectURL(image as File);

  return (
    <div className="relative w-full h-32 bg-gray-100 rounded-md overflow-hidden group">
      <Image
        src={imageUrl}
        alt={`Image ${index + 1}`}
        layout="fill"
        objectFit="cover"
        className="group-hover:opacity-75 transition-opacity"
      />
      <button
        onClick={() => handleRemoveImage(index)}
        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <FaTrashAlt size={16} />
      </button>
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
        {isExistingImage ? "Existing Image" : (image as File).name}
      </div>
    </div>
  );
}

export default function ImageForm({
  formData,
  handleImageChange,
  errors,
  existingImages = [],
  deletedImages = [],
  onDeleteImage,
}: IImageForm) {
  const onDrop = (acceptedFiles: File[]) => {
    const allFiles = [...formData.images, ...acceptedFiles];
    handleImageChange(allFiles.filter((_, index) => index < 50));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 50,
  });

  const handleRemoveNewImage = (index: number) => {
    handleImageChange(formData.images.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index: number) => {
    if (onDeleteImage && existingImages[index]) {
      onDeleteImage(existingImages[index]);
    }
  };

  const remainingExistingImages = existingImages.filter(
    (img) => !deletedImages.includes(img)
  );

  return (
    <>
      <div className="flex flex-col gap-5">
        <h2 className="font-medium text-lg md:text-xl">Images</h2>
        <div
          {...getRootProps()}
          className={`border-2 border-blue-500 border-dashed flex justify-center text-center p-8 flex-col gap-6 cursor-pointer hover:bg-gray-50 ${
            errors["images"] ? "border-red-500" : ""
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-xl font-medium">Drag and Drop images</p>
          <p className="text-gray-400">Or</p>
          <button
            type="button"
            className="cursor-pointer text-blue-500 shadow-2xl w-fit self-center px-4 py-2 ring-2 font-bold hover:bg-gray-200"
          >
            Select Images
          </button>
          <p className="text-xs">Max 50 images</p>
        </div>
        {errors["images"] && (
          <span className="text-red-500 text-sm mt-1">{errors["images"]}</span>
        )}

        {(formData.images.length > 0 || remainingExistingImages.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {remainingExistingImages.map((image, index) => (
              <ImageContainer
                key={`existing-${index}`}
                image={image}
                index={index}
                handleRemoveImage={handleRemoveExistingImage}
                isExistingImage={true}
              />
            ))}
            {formData.images.map((image, index) => (
              <ImageContainer
                key={`new-${index}`}
                image={image}
                index={index}
                handleRemoveImage={handleRemoveNewImage}
                isExistingImage={false}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
