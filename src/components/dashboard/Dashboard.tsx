import { Icons } from "../ui/Icons";
import type { savedForms } from "../../../types";

export const Dashboard = () => {
  const savedForms: savedForms[] = [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Forms</h1>
            <p className="text-gray-500 mt-1">Manage and create your forms</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
            <Icons.Plus className="w-5 h-5 mr-2" />
            Create New Form
          </button>
        </div>

        {/* Form Grid */}
        {savedForms.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icons.Code className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No forms created yet</h3>
            <p className="text-gray-500 mb-6">Start building your first form to see it here.</p>
            <button className="text-blue-600 font-medium hover:text-blue-800">
              Create a form &rarr;
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedForms.map((form) => (
              <div
                key={form.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className="text-xl font-semibold text-gray-800 line-clamp-1"
                      title={form.title}
                    >
                      {form.title || "Untitled Form"}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">
                    {form.description || "No description provided."}
                  </p>

                  <div className="flex items-center text-xs text-gray-400 space-x-4">
                    <span>{form.fields.length} Fields</span>
                    {/* <span>Updated {formatDate(form.lastModified)}</span> */}
                  </div>
                </div>

                <div className="border-t border-gray-100 p-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                  <button
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete"
                  >
                    <Icons.Trash className="w-4 h-4" />
                  </button>
                  <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-blue-600 hover:border-blue-300 transition-all">
                    <Icons.Edit className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
