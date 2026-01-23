import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { FormBuilderContextProvider } from "./context/FormBuilderContext.tsx";
import EditorLayout from "./components/editor/EditorLayout.tsx";
import Builder from "./components/editor/builder/Builder.tsx";
import Preview from "./components/editor/preview/Preview.tsx";
import Code from "./components/editor/code/Code.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormBuilderContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/editor">
            <Route element={<EditorLayout />}>
              <Route path="/editor/builder/:formId" element={<Builder />} />
              <Route path="/editor/preview/:formId" element={<Preview />} />
              <Route path="/editor/code/:formId" element={<Code />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </FormBuilderContextProvider>
  </StrictMode>,
);
