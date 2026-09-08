import React from "react";

function ErrorMessage({ message = "", onClose, ...props }) {
  if (!message) return null;
  return (
    <div
      {...props}
      className={`fixed right-5 top-5 z-50 w-[calc(100%-2.5rem)] max-w-sm rounded-xl border border-red-500/20 bg-[#111111] px-4 py-3 shadow-xl shadow-black/40 animate-[slideDown_0.35s_ease-out] ${props.className || ""}`}
    >
      {" "}
      <div className="flex items-start gap-3">
        {" "}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          {" "}
          !{" "}
        </div>{" "}
        <div className="min-w-0 flex-1 pt-0.5">
          {" "}
          <p className="text-sm font-semibold text-red-400">
            {" "}
            Something went wrong{" "}
          </p>{" "}
          <p className="mt-0.5 break-words text-sm leading-relaxed text-gray-400">
            {" "}
            {message}{" "}
          </p>{" "}
        </div>{" "}
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-lg leading-none text-gray-600 transition hover:text-gray-300"
          aria-label="Close error message"
        >
          {" "}
          ×{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
}

export default ErrorMessage;
