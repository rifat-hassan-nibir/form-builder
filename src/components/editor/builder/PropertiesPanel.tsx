import { useFormContext } from "../../../hooks/useFormContext";
import { Icons } from "../../ui/Icons";

export default function PropertiesPanel() {
  const { state, dispatch } = useFormContext();
  const { selectedField } = state;

  if (!selectedField) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 h-full flex flex-col items-center justify-center">
        <p className="text-lg text-gray-500">Select a field to edit its properties</p>
      </div>
    );
  }

  const handleChange = (key: string, value: string | boolean | object) => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: {
        id: selectedField.id,
        updates: {
          [key]: value,
        },
      },
    });
  };

  const showOptions = ["select", "checkbox", "radio"].includes(selectedField.type);

  const handleOptionChange = (index: number, key: "label" | "value", value: string) => {
    const newOptions = [...(selectedField.options || [])];
    newOptions[index] = { ...newOptions[index], [key]: value };
    handleChange("options", newOptions);
  };

  const addOption = () => {
    const newOptions = [
      ...(selectedField.options || []),
      { label: "New Option", value: "new_option" },
    ];
    handleChange("options", newOptions);
  };

  const removeOption = (index: number) => {
    const newOptions = [...(selectedField.options || [])];
    newOptions.splice(index, 1);
    handleChange("options", newOptions);
  };

  return (
    <div className="w-[400px] bg-white border-l border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Properties</h2>
        <button
          onClick={() => dispatch({ type: "SELECT_FIELD", payload: null })}
          className="text-gray-400 hover:text-gray-600 hover:cursor-pointer"
        >
          &times;
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Type Switcher */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={selectedField.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none hover:cursor-pointer"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="password">Password</option>
            <option value="textarea">Text Area</option>
            <option value="select">Select</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            <option value="date">Date</option>
          </select>
        </div>

        {/* Label */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
          <input
            type="text"
            value={selectedField.label}
            onChange={(e) => handleChange("label", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Placeholder */}
        {!["checkbox", "radio", "date", "select"].includes(selectedField.type) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
            <input
              type="text"
              value={selectedField.placeholder || ""}
              onChange={(e) => handleChange("placeholder", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        )}

        {/* Required Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="req-toggle"
            checked={selectedField.required}
            onChange={(e) => handleChange("required", e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded hover:cursor-pointer"
          />
          <label htmlFor="req-toggle" className="ml-2 block text-sm text-gray-900">
            Required Field
          </label>
        </div>
        {/* Options Editor */}
        {showOptions && (
          <div className="border-t pt-4 mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
            <div className="space-y-2">
              {selectedField.options?.map((opt, idx) => (
                <div key={idx} className="flex space-x-2">
                  <input
                    placeholder="Label"
                    value={opt.label}
                    onChange={(e) => handleOptionChange(idx, "label", e.target.value)}
                    className="flex-1 p-1 text-sm border border-gray-300 rounded"
                  />
                  <input
                    placeholder="Value"
                    value={opt.value}
                    onChange={(e) => handleOptionChange(idx, "value", e.target.value)}
                    className="flex-1 p-1 text-sm border border-gray-300 rounded"
                  />
                  <button
                    onClick={() => removeOption(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Icons.Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addOption}
              className="hover:cursor-pointer mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              <Icons.Plus className="w-3 h-3 mr-1" /> Add Option
            </button>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => dispatch({ type: "DELETE_FIELD", payload: selectedField.id })}
          className="w-full py-2 px-4 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center hover:cursor-pointer"
        >
          <Icons.Trash className="w-4 h-4 mr-2" /> Delete Field
        </button>
      </div>
    </div>
  );
}
