import React from "react";

export default function ShortAnswerField({
  type = "text",
  label,
  labelVisible = true,
  helpText,
  placeholder,
  handleChange,
  hasError,
  autoFocus = false,
  value = "",
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={label}
        className="block text-base font-medium leading-6 text-gray-900"
      >
        {labelVisible && label}
      </label>
      <div className="">
        <input
          type={type}
          name={label}
          id={label}
          className="
            block w-full rounded-lg border-0 py-3 text-gray-900 shadow-sm
            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
            focus:ring-2 focus:ring-inset focus:ring-gray-900
            leading-6 text-sm md:text-base
          "
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          autoFocus={autoFocus}
          value={value}
        />
      </div>
      {(helpText || hasError) && (
        <p
          className={`ml-1 mt-1 text-sm ${
            hasError ? "text-red-700" : "text-gray-500"
          }`}
        >
          {hasError ? "This field is required" : helpText}
        </p>
      )}
    </div>
  );
}
