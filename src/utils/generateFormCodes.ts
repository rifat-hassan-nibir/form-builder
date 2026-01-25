import type { FormField, FormSchema } from "../../types";

const generateFieldCode = (field: FormField): string => {
  const commonProps = `
        id="${field.id}"
        name="${field.id}"
        label="${field.label}"
        ${field.required ? "required" : ""}
        ${field.placeholder ? `placeholder="${field.placeholder}"` : ""}
  `.trim();

  // Helper to generate Tailwind class strings
  const inputClass =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  let inputElement = "";

  switch (field.type) {
    case "textarea":
      inputElement = `<textarea
          ${commonProps}
          className="${inputClass}"
          rows={4}
          onChange={handleChange}
        />`;
      break;
    case "select":
      inputElement = `<select
          ${commonProps}
          className="${inputClass}"
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          ${field.options?.map((opt) => `<option value="${opt.value}">${opt.label}</option>`).join("\n          ")}
        </select>`;
      break;
    case "checkbox":
      // If it has options, it's a group, otherwise a single boolean
      if (field.options && field.options.length > 0) {
        inputElement = `<div className="space-y-2">
          ${field.options
            .map(
              (opt) => `
            <div key="${opt.value}" className="flex items-center">
              <input
                type="checkbox"
                id="${field.id}_${opt.value}"
                name="${field.id}"
                value="${opt.value}"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="${field.id}_${opt.value}" className="ml-2 block text-sm text-gray-900">
                ${opt.label}
              </label>
            </div>
          `,
            )
            .join("")}
        </div>`;
      } else {
        inputElement = `<div className="flex items-center">
          <input
            type="checkbox"
            id="${field.id}"
            name="${field.id}"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            onChange={handleChange}
          />
          <label htmlFor="${field.id}" className="ml-2 block text-sm text-gray-900">
            ${field.label}
          </label>
        </div>`;
      }
      break;
    case "radio":
      inputElement = `<div className="space-y-2">
          ${field.options
            ?.map(
              (opt) => `
            <div key="${opt.value}" className="flex items-center">
              <input
                type="radio"
                id="${field.id}_${opt.value}"
                name="${field.id}"
                value="${opt.value}"
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                required={${field.required}}
                onChange={handleChange}
              />
              <label htmlFor="${field.id}_${opt.value}" className="ml-2 block text-sm text-gray-900">
                ${opt.label}
              </label>
            </div>
          `,
            )
            .join("")}
        </div>`;
      break;
    default:
      inputElement = `<input
          type="${field.type}"
          ${commonProps}
          className="${inputClass}"
          onChange={handleChange}
        />`;
  }

  // Wrapper with Label (except single checkbox where label is inline)
  const isSingleCheckbox =
    field.type === "checkbox" && (!field.options || field.options.length === 0);

  if (isSingleCheckbox) {
    return `
      <div className="mb-4">
        ${inputElement}
      </div>`;
  }

  return `
      <div className="mb-4">
        <label htmlFor="${field.id}" className="${labelClass}">
          ${field.label} ${field.required ? '<span className="text-red-500">*</span>' : ""}
        </label>
        ${inputElement}
      </div>`;
};

export const generateFormCode = (schema: FormSchema): string => {
  const fieldsCode = schema.fields.map(generateFieldCode).join("\n");

  return `import React, { useState } from 'react';

export default function GeneratedForm() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' && !name.includes('group') ? checked : value
    }));
  };

  const handleCheckboxChange = (e) => {
     const { name, value, checked } = e.target;
     // Handle multi-select checkboxes for array values
     setFormData(prev => {
       const currentValues = prev[name] || [];
       if (checked) {
         return { ...prev, [name]: [...currentValues, value] };
       } else {
         return { ...prev, [name]: currentValues.filter(v => v !== value) };
       }
     });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Form Submitted! Check console for data.');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">${schema.title}</h1>
      <p className="text-gray-600 mb-6">${schema.description}</p>
      
      <form onSubmit={handleSubmit}>
        ${fieldsCode}
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}`;
};
