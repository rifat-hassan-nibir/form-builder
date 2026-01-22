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
    case ActionTypes.CREATE_NEW_FORM:
      return {
        ...state,
        activeForm: createNewForm(),
      };

    case ActionTypes.SAVE_FORM:
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
