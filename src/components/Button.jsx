import React from "react";

function Button({ children, type = "button", className = "", ...props }) {
  return (
    <button
    type={type}
      className={`rounded-md bg-orange-500 px-5 py-2.5 font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
