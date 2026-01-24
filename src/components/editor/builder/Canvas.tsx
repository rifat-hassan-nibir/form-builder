import { useFormContext } from "../../../hooks/useFormContext";
import { Icons } from "../../ui/Icons";

export default function Canvas() {
  const { state, dispatch } = useFormContext();
  console.log("state ===>>>", state);

  if (!state.activeForm) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg font-medium">No active form</p>
          <p className="text-gray-400 text-sm">Create a new form to start building.</p>
        </div>
      </div>
    );
  }

  const { title, description, fields } = state.activeForm;
  const { id } = state?.selectedField || {};

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_FORM_META", payload: { title: e.target.value } });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "UPDATE_FORM_META", payload: { description: e.target.value } });
  };

  const handleDeleteField = (fieldId: string) => {
    dispatch({ type: "DELETE_FIELD", payload: fieldId });
  };

  return (
    <div className="flex-1 bg-gray-50 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 min-h-125">
          {/* Form Header */}
          <div className="p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors group">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full text-3xl font-bold text-gray-800 border-none focus:ring-0 bg-transparent placeholder-gray-300"
              placeholder="Form Title"
            />
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="w-full mt-2 text-gray-600 border-none focus:ring-0 bg-transparent resize-none placeholder-gray-300"
              placeholder="Form Description"
              rows={2}
            />
          </div>

          {/* Form Fields */}
          <div className="p-6 space-y-4">
            {fields.length > 0 ? (
              fields.map((field) => (
                <div
                  onClick={() => dispatch({ type: "SELECT_FIELD", payload: field })}
                  key={field.id}
                  className={`
                  ${id === field.id ? "border-blue-300 bg-blue-50" : "border-gray-200"} relative group border rounded-md p-4 cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50 hover:cursor-pointer
                `}
                >
                  {/* Drag Handle */}
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-grab opacity-100 p-2 hover:text-gray-600">
                    <Icons.GripVertical className="w-5 h-5" />
                  </div>

                  <div className="pl-10">
                    {/* Preview of the field in Editor Mode (Simplified) */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>

                    {/* Mock Inputs based on type */}
                    {["text", "email", "number", "password", "date"].includes(field.type) && (
                      <div className="h-9 w-full bg-gray-50 border border-gray-200 rounded px-3 flex items-center text-gray-400 text-sm">
                        {field.placeholder || `Enter ${field.label}...`}
                      </div>
                    )}
                    {field.type === "textarea" && (
                      <div className="h-20 w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-400 text-sm">
                        {field.placeholder || "Text area content..."}
                      </div>
                    )}
                    {field.type === "select" && (
                      <div className="h-9 w-full bg-gray-50 border border-gray-200 rounded px-3 flex items-center justify-between text-gray-400 text-sm">
                        <span>Dropdown Options</span>
                        <Icons.GripVertical className="w-4 h-4 rotate-90" />
                      </div>
                    )}
                    {(field.type === "checkbox" || field.type === "radio") && (
                      <div className="space-y-2">
                        {field.options && field.options.length > 0 ? (
                          field.options.map((opt, i) => (
                            <div key={i} className="flex items-center">
                              <div
                                className={`w-4 h-4 border border-gray-300 ${field.type === "radio" ? "rounded-full" : "rounded"}`}
                              ></div>
                              <span className="ml-2 text-sm text-gray-600">{opt.label}</span>
                            </div>
                          ))
                        ) : (
                          // Single checkbox fallback
                          <div className="flex items-center">
                            <div className="w-4 h-4 border border-gray-300 rounded"></div>
                            <span className="ml-2 text-sm text-gray-600">Checkbox Option</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteField(field.id);
                      }}
                      className="p-1 text-red-400 hover:bg-red-50 rounded hover:text-red-600 hover:cursor-pointer"
                    >
                      <Icons.Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6">
                <p className="text-gray-500">No fields added yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
