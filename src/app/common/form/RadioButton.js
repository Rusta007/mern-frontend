import React from "react";
import { useField } from "formik";

function RadioButton({ name }) {
  const [field, meta] = useField(name);

  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-[#4c4b59]">
        Gender
      </label>
      <div>
        <label htmlFor={`${name}-male`} className="mr-2">
          <input
            id={`${name}-male`}
            type="radio"
            {...field}
            value="male"
            className="mr-1"
          />
          Male
        </label>
        <label htmlFor={`${name}-female`}>
          <input
            id={`${name}-female`}
            type="radio"
            {...field}
            value="female"
            className="mr-1"
          />
          Female
        </label>
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
}

export default RadioButton;
