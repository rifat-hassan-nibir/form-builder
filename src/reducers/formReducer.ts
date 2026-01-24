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
      };
    }

    case ActionTypes.SAVE_FORM: {
      if (!state.activeForm) return state;
      const exists = state.savedForms.find((f) => f.id === state.activeForm?.id);
      const updatedSavedForms = exists
        ? state.savedForms.map((f) => (f.id === state.activeForm?.id ? state.activeForm! : f))
        : [...state.savedForms, state.activeForm];

      return {
        ...state,
        savedForms: updatedSavedForms,
      };
    }

    case ActionTypes.CLEAR_FORM:
      return {
        ...state,
        activeForm: null,
      };

    case ActionTypes.DELETE_FORM:
      return {
        ...state,
        savedForms: state.savedForms.filter((form) => form.id !== action.payload),
      };

    case ActionTypes.LOAD_FORM: {
      const form = state.savedForms.find((f) => f.id === action.payload);

      return {
        ...state,
        activeForm: form || null,
      };
    }

    case ActionTypes.UPDATE_FORM_META:
      if (!state.activeForm) return state;

      return {
        ...state,
        activeForm: {
          ...state.activeForm,
          ...action.payload,
          updatedAt: Date.now(),
        },
      };

    default:
      return state;
  }
};
