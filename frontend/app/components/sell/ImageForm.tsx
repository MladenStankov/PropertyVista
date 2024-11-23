import React from "react";
import ImageContainer from "./ImageContainer";
import { IWizardForm } from "./WizardForm";

interface IImageForm {
  formData: IWizardForm;
  handleImageChange: (images: File[]) => void;
  errors: { [key: string]: string };
}

export default function ImageForm({
  formData,
  handleImageChange,
  errors,
}: IImageForm) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const allFiles = [...formData.images, ...files];
    handleImageChange(allFiles.filter((_, index) => index < 10));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const allFiles = [...formData.images, ...files];
    handleImageChange(allFiles.filter((_, index) => index < 10));
  };

  const handleRemoveImage = (index: number) => {
    handleImageChange(formData.images.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
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
          <p className="text-xs">Max 10 images</p>
        </div>
        {errors["images"] && (
          <span className="text-red-500 text-sm mt-1 self-center">
            {errors["images"]}
          </span>
        )}
        {formData.images.length > 0 && (
          <div className="h-60 overflow-y-scroll grid grid-cols-1 gap-2 border p-4 rounded-md">
            {formData.images.map((image, index) => (
              <ImageContainer
                key={index}
                image={image}
                index={index}
                handleRemoveImage={handleRemoveImage}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
