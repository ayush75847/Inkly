import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <>
      <div>
        {label && (
          <label
            className="mb-2 block text-sm font-medium text-gray-300"
            htmlFor={id}
          >
            {label}
          </label>
        )}

        <input
          type={type}
          className={`w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2.5 text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50${className}`}
          id={id}
          ref={ref}
          {...props}
        />
      </div>
    </>
  );
});

export default Input;
