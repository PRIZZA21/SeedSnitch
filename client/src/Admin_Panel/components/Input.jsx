import React from "react";

const Input = ({ label, type, name, placeholder, required, onChange }) => {
  return (
    <div className="flex flex-wrap -mx-3 mb-4">
    <div className="w-full px-3">
      <label
        className="block tracking-wide text-darkBlue text-xs font-bold mb-2"
        htmlFor={`grid-${name}`}
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-white text-darkBlue border border-grabg-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id={`grid-${name}`}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
    </div>
  );
};

export default Input;
