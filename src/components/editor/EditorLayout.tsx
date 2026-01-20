import { Link } from "react-router";
import { Icons } from "../ui/Icons";
import Builder from "./builder/Builder";

export default function Editor() {
  const activeTab = "builder";

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between z-10">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <button
              className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
              title="Back to Dashboard"
            >
              <Icons.ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div className="flex items-center space-x-3 border-l pl-4 border-gray-200">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Icons.Code className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-semibold text-gray-800 truncate max-w-[200px]">
              "Untitled Form"
            </span>
          </div>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            className={`flex items-center px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === "builder"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icons.Settings className="w-4 h-4 mr-2" /> Builder
          </button>
          <button
            className={`flex items-center px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === "preview"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icons.Eye className="w-4 h-4 mr-2" /> Preview
          </button>
          <button
            className={`flex items-center px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === "code"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icons.Code className="w-4 h-4 mr-2" /> Code
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button className="text-sm text-red-500 hover:text-red-700 px-3">Clear Form</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex">
        {activeTab === "builder" && <Builder />}

        {/* {activeTab === "preview" && (
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <FormPreview />
          </div>
        )} */}

        {/* {activeTab === "code" && (
          <div className="flex-1 overflow-y-auto bg-gray-800">
            <CodeViewer />
          </div>
        )} */}
      </main>
    </div>
  );
}
