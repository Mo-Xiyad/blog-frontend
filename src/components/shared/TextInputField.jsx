import React from "react";

export default function TextInputField({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  disabled,
  required,
  id,
  autoComplete
}) {
  return (
    <div className="py-5">
      <label htmlFor="email-address" className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-md border bg-white border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
