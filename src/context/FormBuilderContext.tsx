import { createContext, useReducer } from "react";
import type { FormAction, FormState } from "../../types";
import { formReducer, INITIAL_STATE } from "../reducers/formReducer";

interface FormBuilderContextType {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}

export const FormBuilderContext = createContext<FormBuilderContextType | null>(null);

export const FormBuilderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  return (
    <FormBuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </FormBuilderContext.Provider>
  );
};