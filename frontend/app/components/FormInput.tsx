import React from "react";

interface FormInputProps {
  type?: string;
  id: string;
  value: string;
  label?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  type = "text",
  id,
  value,
  label = "",
  required = false,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <label className="mt-2 ml-2" htmlFor={id}>
        {label}
      </label>
      <input
        className="pl-4 py-2 pr-9 border border-gray-400 rounded-md w-full"
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default FormInput;
