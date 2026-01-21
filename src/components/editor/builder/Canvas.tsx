import { useState } from "react";
import { Icons } from "../../ui/Icons";

export default function Canvas() {
  const [formTitle, setFormTitle] = useState("Form Title");
  const [formDescription, setFormDescription] = useState("Form Description");
  const [fields, setFields] = useState([
    {
      id: 1,
      type: "text",
      label: "Name",
      value: "",
      placeholder: "Enter your name...",
      required: true,
    },
  ]);

  return (
    <div className="flex-1 bg-gray-50 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 min-h-125">
          {/* Form Header */}
          <div className="p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors group">
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full text-3xl font-bold text-gray-800 border-none focus:ring-0 bg-transparent placeholder-gray-300"
              placeholder="Form Title"
            />
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="w-full mt-2 text-gray-600 border-none focus:ring-0 bg-transparent resize-none placeholder-gray-300"
              placeholder="Form Description"
              rows={2}
            />
          </div>

          {/* Form Fields */}
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
                    Name
                    <span className="text-red-500">*</span>
                  </label>

                  {/* Mock Inputs based on type */}

                  <div>
                    <input
                      type="text"
                      placeholder="Enter your name..."
                      className="h-9 w-full bg-gray-50 border border-gray-200 rounded px-3 flex items-center text-gray-400 text-sm"
                      value={fields[0].value}
                      onChange={(e) =>
                        setFields(
                          fields.map((field) => {
                            if (field.id === 1) {
                              return {
                                ...field,
                                value: e.target.value,
                              };
                            }
                            return field;
                          }),
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-1 text-red-400 hover:bg-red-50 rounded hover:text-red-600"
                >
                  <Icons.Trash className="w-4 h-4 cursor-pointer" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
