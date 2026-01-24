import { ActionTypes, FIELD_TYPES } from "../../../../constants";
import type { FieldType } from "../../../../types";
import { useFormContext } from "../../../hooks/useFormContext";

export default function Sidebar() {
  const { dispatch } = useFormContext();

  const handleAddField = (type: FieldType) => {
    dispatch({ type: ActionTypes.ADD_FIELD, payload: type });
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Elements</h2>
        <p className="text-xs text-gray-500 mt-1">Click to add fields</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {FIELD_TYPES.map((item) => (
          <button
            key={item.type}
            onClick={() => handleAddField(item.type)}
            className="w-full flex items-center p-3 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors hover:cursor-pointer"
          >
            <span className="mr-3 text-gray-400">
              {/* Fallback to simple circle if icon logic is complex, but here we just use label */}
              +
            </span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
