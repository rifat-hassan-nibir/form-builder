import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { ActionTypes } from "../../../constants";
import { useFormContext } from "../../hooks/useFormContext";
import { Icons } from "../ui/Icons";

type Tab = "builder" | "preview" | "code";

export default function EditorLayout() {
  const { state, dispatch } = useFormContext();
  const { id } = useParams();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [activeTab, setActiveTab] = useState<Tab>("builder");
  const navigate = useNavigate();

  const handleSave = () => {
    setSaveStatus("saving");
    dispatch({ type: ActionTypes.SAVE_FORM });

    // Simulate micro-feedback
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => {
        setSaveStatus("idle");
      }, 2000);
    }, 600);
  };

  useEffect(() => {
    if (id && state.activeForm?.id !== id) {
      dispatch({ type: ActionTypes.LOAD_FORM, payload: id });
    }
  }, [id, state.activeForm?.id, dispatch]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              dispatch({ type: ActionTypes.CLEAR_FORM });
              navigate("/");
            }}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors hover:cursor-pointer"
            title="Back to Dashboard"
          >
            <Icons.ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3 border-l pl-4 border-gray-200">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Icons.Code className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-semibold text-gray-800 truncate max-w-50">
              {state.activeForm?.title || "Untitled Form"}
            </span>
          </div>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => {
              setActiveTab("builder");
              navigate(`/editor/builder/${state?.activeForm?.id}`);
            }}
            className={`hover:cursor-pointer flex items-center px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === "builder"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icons.Settings className="w-4 h-4 mr-2" /> Builder
          </button>
          <button
            onClick={() => {
              setActiveTab("preview");
              navigate(`/editor/preview/${state?.activeForm?.id}`);
            }}
            className={`hover:cursor-pointer flex items-center px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === "preview"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icons.Eye className="w-4 h-4 mr-2" /> Preview
          </button>
          <button
            onClick={() => {
              setActiveTab("code");
              navigate(`/editor/code/${state?.activeForm?.id}`);
            }}
            className={`hover:cursor-pointer flex items-center px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === "code"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icons.Code className="w-4 h-4 mr-2" /> Code
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => dispatch({ type: ActionTypes.CLEAR_FORM })}
            className="text-sm text-gray-500 hover:text-red-500 px-3 hover:cursor-pointer transition-colors"
          >
            Clear Form
          </button>
          <button
            onClick={handleSave}
            disabled={saveStatus !== "idle"}
            className={`flex items-center px-4 py-2 text-white text-sm font-medium rounded-lg transition-all shadow-sm hover:cursor-pointer min-w-32 justify-center ${
              saveStatus === "saved"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            } ${saveStatus === "saving" ? "opacity-80" : ""}`}
          >
            {saveStatus === "idle" && (
              <>
                <Icons.Save className="w-4 h-4 mr-2" />
                Save Form
              </>
            )}
            {saveStatus === "saving" && (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Saving...
              </>
            )}
            {saveStatus === "saved" && (
              <>
                <Icons.Check className="w-4 h-4 mr-2" />
                Saved!
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex">
        <Outlet />
      </main>
    </div>
  );
}
