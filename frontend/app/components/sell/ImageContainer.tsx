import Image from "next/image";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";

interface IImageContainer {
  image: File;
  index: number;
  handleRemoveImage: (index: number) => void;
}

export default function ImageContainer({
  image,
  index,
  handleRemoveImage,
}: IImageContainer) {
  return (
    <div className="grid grid-cols-5 gap-4 items-center bg-slate-100 border rounded-md p-4 h-auto">
      <div className="relative w-full sm:w-auto sm:h-20 aspect-video">
        <Image
          className="object-cover rounded-md"
          src={image instanceof File ? URL.createObjectURL(image) : image}
          alt="Uploaded Image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <p className="font-semibold text-center sm:text-left text-xs col-span-2 break-words line-clamp-1">
        {image.name}
      </p>

      <p className="font-light text-center sm:text-left text-xs">
        {(image.size / 1024).toFixed(2)} KB
      </p>

      <FaTrashAlt
        size={30}
        className="text-red-400 cursor-pointer hover:text-red-700 justify-self-center sm:justify-self-end"
        onClick={() => handleRemoveImage(index)}
      />
    </div>
  );
}
