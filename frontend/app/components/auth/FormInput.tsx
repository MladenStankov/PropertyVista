import React from "react";
import { IconType } from "react-icons";
import { motion } from "framer-motion";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  Icon?: IconType;
  iconHandler?: () => void;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, Icon, iconHandler, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="relative">
          <input
            {...props}
            ref={ref}
            className={`w-full px-4 py-3 pl-11 rounded-xl border bg-white/50 focus:bg-white transition-all duration-200
              ${
                error
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
              }
              focus:outline-none focus:ring-4 peer`}
            placeholder=" "
          />
          {Icon && (
            <button
              type="button"
              onClick={iconHandler}
              className={`absolute left-3 top-1/2 -translate-y-1/2 text-lg
                ${error ? "text-red-400" : "text-gray-400"}
                ${
                  iconHandler
                    ? "cursor-pointer hover:text-gray-600 transition-colors"
                    : "cursor-default"
                }`}
            >
              <Icon />
            </button>
          )}
          <label
            className={`absolute text-sm duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 
              ${
                error
                  ? "text-red-500"
                  : "text-gray-500 peer-focus:text-blue-600"
              }
              peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
              peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 
              peer-focus:scale-75 peer-focus:z-10 left-9`}
          >
            {label}
          </label>
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
