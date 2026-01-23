import { useFormContext } from "../../../hooks/useFormContext";

export default function Preview() {
  const { state } = useFormContext();

  if (!state.activeForm) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg border-2 border-dashed border-gray-200 text-gray-500">
        <p className="text-lg font-medium">No form preview available</p>
        <p className="text-sm">Start building your form to see the preview here.</p>
      </div>
    );
  }

  const { title, description, fields } = state.activeForm;

  return (
    <div className="w-2xl mx-auto p-6 bg-white rounded-lg shadow-md my-8 border border-gray-200">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {fields.map((field) => (
          <div key={field.id} className="space-y-1">
            {/* Label logic: Single checkbox usually renders label differently */}
            {!(field.type === "checkbox" && (!field.options || field.options.length === 0)) && (
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
            )}

            {/* Field Renderers */}
            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder={field.placeholder}
                required={field.required}
                rows={4}
                // onChange={(e) => handleChange(field.id, e.target.value)}
              />
            ) : field.type === "select" ? (
              <select
                id={field.id}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required={field.required}
                // onChange={(e) => handleChange(field.id, e.target.value)}
              >
                <option value="">Select an option</option>
                {field.options?.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === "radio" ? (
              <div className="space-y-2">
                {field.options?.map((opt, i) => (
                  <div key={i} className="flex items-center">
                    <input
                      type="radio"
                      id={`${field.id}_${i}`}
                      name={field.id}
                      value={opt.value}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      required={field.required}
                      //   onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                    <label
                      htmlFor={`${field.id}_${i}`}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {opt.label}
                    </label>
                  </div>
                ))}
              </div>
            ) : field.type === "checkbox" ? (
              <div className="space-y-2">
                {field.options && field.options.length > 0 ? (
                  field.options.map((opt, i) => (
                    <div key={i} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${field.id}_${i}`}
                        name={field.id}
                        value={opt.value}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        // onChange={(e) =>
                        //   handleCheckboxChange(
                        //     field,
                        //     opt.value,
                        //     e.target.checked
                        //   )
                        // }
                      />
                      <label
                        htmlFor={`${field.id}_${i}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {opt.label}
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={field.id}
                      name={field.id}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      required={field.required}
                      //   onChange={(e) => handleCheckboxChange(field, "", e.target.checked)}
                    />
                    <label htmlFor={field.id} className="ml-2 block text-sm text-gray-700">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                  </div>
                )}
              </div>
            ) : (
              <input
                type={field.type}
                id={field.id}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder={field.placeholder}
                required={field.required}
                // onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}
            {/* {field.helpText && <p className="text-xs text-gray-500 mt-1">{field.helpText}</p>} */}
          </div>
        ))}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit Form
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Form Data State (Live)
        </h3>
        <pre className="bg-gray-800 text-gray-100 p-4 rounded text-xs overflow-auto">
          {/* {JSON.stringify(formData, null, 2)} */}
        </pre>
      </div>
    </div>
  );
}
