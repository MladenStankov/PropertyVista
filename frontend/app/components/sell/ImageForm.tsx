import React from "react";
import ImageContainer from "./ImageContainer";
import { IWizardForm } from "./WizardForm";

interface IImageForm {
  formData: IWizardForm;
  handleImageChange: (images: File[]) => void;
}

export default function ImageForm({ formData, handleImageChange }: IImageForm) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleImageChange([...formData.images, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleImageChange([...formData.images, ...files]);
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
          className="border-2 border-blue-500 border-dashed flex justify-center text-center p-8 flex-col gap-6"
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
        </div>
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
