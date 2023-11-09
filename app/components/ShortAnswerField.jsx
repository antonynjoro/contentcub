import React from "react";

export default function ShortAnswerField({
  type = "text",
  label,
  labelVisible = true,
  helpText,
  placeholder,
  handleChange,
  hasError,
}) {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {labelVisible && label}
      </label>
      <div className="">
        <input
          type={type}
          name={label}
          id={label}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {helpText ||
        (hasError && (
          <p
            className={`mt-1 text-sm ${
              hasError ? "text-red-700" : "text-gray-500"
            }`}
          >
            {hasError ? "This field is required" : helpText}
          </p>
        ))}
    </div>
  );
}
