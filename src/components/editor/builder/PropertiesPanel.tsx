import { Icons } from "../../ui/Icons";

export default function PropertiesPanel() {
  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Properties</h2>
        <button className="text-gray-400 hover:text-gray-600 hover:cursor-pointer">&times;</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Label */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Type Switcher */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none hover:cursor-pointer">
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

        {/* Placeholder */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
          <input
            type="text"
            value={"Placeholder"}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Required Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="req-toggle"
            checked={true}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded hover:cursor-pointer"
          />
          <label htmlFor="req-toggle" className="ml-2 block text-sm text-gray-900">
            Required Field
          </label>
        </div>

        {/* Help Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Help Text</label>
          <input
            type="text"
            value={"Help Text"}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button className="w-full py-2 px-4 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center hover:cursor-pointer">
          <Icons.Trash className="w-4 h-4 mr-2" /> Delete Field
        </button>
      </div>
    </div>
  );
}
