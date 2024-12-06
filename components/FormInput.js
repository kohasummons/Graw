import React from "react";

const FormInput = ({
  label,
  name,
  type,
  handleInputChange,
  file,
  bgWhite,
  value,
}) => {
  if (file) {
    return (
      <div className="space-y-1">
        <label
          htmlFor={`${name}`}
          className="text-[10px] text-[#A3A3A3] font-lato font-bold"
        >
          {label}
        </label>
        <input
          type={`${type}`}
          name={`${name}`}
          className="w-full border border-[#E7E7E7] rounded-xl p-2 font-lato text-sm font-bold bg-transparent outline-none"
          onChange={handleInputChange}
        />
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label
        htmlFor={`${name}`}
        className="text-[10px] text-[#A3A3A3] font-lato font-bold"
      >
        {label}
      </label>
      <input
        type={`${type}`}
        name={`${name}`}
        className={`w-full border border-[#E7E7E7] rounded-xl p-2 font-lato text-sm font-bold ${
          bgWhite ? "bg-white" : ""
        }bg-transparent outline-none`}
        onChange={handleInputChange}
        value={value}
      />
    </div>
  );
};

export default FormInput;
