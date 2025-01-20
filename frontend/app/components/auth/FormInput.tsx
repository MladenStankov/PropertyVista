import React from "react";
import { IconType } from "react-icons";

interface FormInputProps {
  type?: string;
  id: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  Icon?: IconType;
  iconHandler?: () => void;
}

const FormInput: React.FC<FormInputProps> = ({
  type = "text",
  id,
  value,
  label = "",
  required = false,
  placeholder = "",
  onChange,
  error,
  Icon,
  iconHandler,
}) => {
  return (
    <div className="flex flex-col relative">
      <label className="mt-2 ml-2" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          className={`pl-4 py-2 pr-9 border rounded-md w-full ${
            error ? "border-red-500" : "border-gray-400"
          }`}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
        />
        {Icon && (
          <Icon
            onClick={iconHandler}
            className="absolute right-3 bottom-3 text-gray-500 hover:cursor-pointer"
          />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
