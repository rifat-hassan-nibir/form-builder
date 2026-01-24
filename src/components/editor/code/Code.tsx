import { useState } from "react";
import { Icons } from "../../ui/Icons";

export default function Code() {
  // const code = generateFormCode(state.activeForm);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 h-150 flex flex-col bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-sm ml-4 font-mono">GeneratedForm.jsx</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 text-xs text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded transition-colors"
        >
          {copied ? (
            <span>Copied!</span>
          ) : (
            <>
              <Icons.Copy className="w-3 h-3" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        <pre className="text-blue-300">
          <code></code>
        </pre>
      </div>
    </div>
  );
}
