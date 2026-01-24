import { ActionTypes } from "../../constants";
import type { FormAction, FormField, FormState } from "../../types";
import { generateRandomId } from "../utils/generateRandomId";
import { createNewForm } from "./helpers";

export const INITIAL_STATE: FormState = {
  activeForm: null,
  selectedFieldId: null,
  savedForms: [],
};

export const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    // Create New Form
    case ActionTypes.CREATE_NEW_FORM: {
      const newForm = action.payload || createNewForm();

      return {
        ...state,
        activeForm: newForm,
      };
    }

    // Save Form
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

    // Clear Form
    case ActionTypes.CLEAR_FORM:
      return {
        ...state,
        activeForm: null,
      };

    // Delete Form
    case ActionTypes.DELETE_FORM:
      return {
        ...state,
        savedForms: state.savedForms.filter((form) => form.id !== action.payload),
      };

    // Load Form
    case ActionTypes.LOAD_FORM: {
      const form = state.savedForms.find((f) => f.id === action.payload);

      return {
        ...state,
        activeForm: form || null,
      };
    }

    // Update Form Meta
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

    // Add Field
    case ActionTypes.ADD_FIELD:
      if (!state.activeForm) return state;

      const newField: FormField = {
        id: generateRandomId(),
        type: action.payload,
        label: `New ${action.payload} field`,
        placeholder: `Enter your ${action.payload}`,
        required: false,
        defaultValue: "",
        options:
          action.payload === "select" || action.payload === "checkbox" || action.payload === "radio"
            ? [
                { label: "Option 1", value: "Option 1" },
                { label: "Option 2", value: "Option 2" },
                { label: "Option 3", value: "Option 3" },
              ]
            : [],
      };

      return {
        ...state,
        activeForm: {
          ...state.activeForm,
          fields: [...state.activeForm.fields, newField],
        },
      };

    // Delete Field
    case ActionTypes.DELETE_FIELD:
      if (!state.activeForm) return state;

      return {
        ...state,
        activeForm: {
          ...state.activeForm,
          fields: state.activeForm.fields.filter((field) => field.id !== action.payload),
        },
      };

    default:
      return state;
  }
};
