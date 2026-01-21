import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Editor from "./components/editor/EditorLayout.tsx";
import { FormBuilderContextProvider } from "./context/FormBuilderContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormBuilderContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/editor">
            <Route index element={<Editor />} />
            <Route path="/editor/:formId" element={<Editor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FormBuilderContextProvider>
  </StrictMode>,
);
