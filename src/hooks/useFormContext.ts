import { useContext } from "react";
import { FormBuilderContext } from "../context/FormBuilderContext";

export const useFormContext = () => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormBuilderProvider");
  }
  return context;
};
