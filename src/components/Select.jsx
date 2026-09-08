import React, { useId } from "react";

function Select({ label, options = [], className = "", ...props }, ref) {
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

        <select
          className={`w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2.5 text-white outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          ref={ref}
          id={id}
          {...props}
        >
          {options.length === 0
            ? null
            : options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
        </select>
      </div>
    </>
  );
}

export default React.forwardRef(Select);
