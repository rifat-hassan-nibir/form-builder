import Canvas from "./Canvas";
import PropertiesPanel from "./PropertiesPanel";
import Sidebar from "./Sidebar";

export default function Builder() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <Canvas />
      <PropertiesPanel />
    </div>
  );
}
