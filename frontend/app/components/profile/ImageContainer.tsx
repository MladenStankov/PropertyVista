import React from "react";
import { FaTrashAlt } from "react-icons/fa";

interface IImageContainer {
  image: File | string;
  handleDelete: (image: File | string) => void;
}

export default function ImageContainer({
  image,
  handleDelete,
}: IImageContainer) {
  return (
    <div className="grid grid-cols-5 gap-4 items-center bg-slate-100 border rounded-md p-4 h-auto">
      <img
        className="w-full sm:w-auto sm:h-20 object-cover aspect-video"
        src={image instanceof File ? URL.createObjectURL(image) : image}
        alt="Uploaded Image"
      />

      <p
        className={`font-semibold text-center sm:text-left text-xs col-span-2 break-words line-clamp-1 ${
          image instanceof File ? "" : "hidden"
        }`}
      >
        {image instanceof File && image.name}
      </p>

      <p
        className={`font-light text-center sm:text-left text-xs ${
          image instanceof File ? "" : "hidden"
        }`}
      >
        {image instanceof File && (image.size / 1024).toFixed(2)} KB
      </p>

      <FaTrashAlt
        size={30}
        className="text-red-400 cursor-pointer hover:text-red-700 justify-self-center sm:justify-self-end"
        onClick={() => handleDelete(image)}
      />
    </div>
  );
}
