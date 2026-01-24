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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_FORM_META", payload: { title: e.target.value } });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "UPDATE_FORM_META", payload: { description: e.target.value } });
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
          {fields.length > 0 ? (
            <div className="p-6 space-y-4">
              <div
                className={`
                  relative group border rounded-md p-4 cursor-pointer transition-all
                  border-gray-200 hover:border-blue-300 bg-white
                `}
              >
                {/* Drag Handle */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-grab opacity-100 p-2 hover:text-gray-600">
                  <Icons.GripVertical className="w-5 h-5" />
                </div>

                <div className="pl-10">
                  <div>
                    {/* Preview of the field in Editor Mode (Simplified) */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {fields[0].label}
                      {fields[0].required && <span className="text-red-500">*</span>}
                    </label>

                    {/* Mock Inputs based on type */}

                    <div>
                      <input
                        type="text"
                        placeholder={fields[0].placeholder}
                        className="h-9 w-full bg-gray-50 border border-gray-200 rounded px-3 flex items-center text-gray-400 text-sm"
                        value={fields[0].defaultValue || ""}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="p-1 text-red-400 hover:bg-red-50 rounded hover:text-red-600 hover:cursor-pointer"
                  >
                    <Icons.Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <p className="text-gray-500">No fields added yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
