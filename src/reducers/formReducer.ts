import { ActionTypes } from "../../constants";
import type { FormAction, FormState } from "../../types";
import { createNewForm } from "./helpers";

export const INITIAL_STATE: FormState = {
  activeForm: null,
  selectedFieldId: null,
  savedForms: [],
  activeTab: "builder",
};

export const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_FORM: {
      const newForm = action.payload || createNewForm();

      return {
        ...state,
        activeForm: newForm,
        savedForms: [...state.savedForms, newForm],
      };
    }

    case ActionTypes.SAVE_FORM:
      if (!state.activeForm) return state;
      return {
        ...state,
        savedForms: [...state.savedForms, state.activeForm],
      };

    case ActionTypes.DELETE_FORM:
      return {
        ...state,
        savedForms: state.savedForms.filter((form) => form.id !== action.payload),
      };

    default:
      return state;
  }
};
