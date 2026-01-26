import { ActionTypes } from "../../constants";
import type { FormAction, FormField, FormState } from "../../types";
import { generateRandomId } from "../utils/generateRandomId";
import { createNewForm } from "./helpers";
import { loadSavedForms, saveFormsToLocalStorage } from "./helpers";

export const INITIAL_STATE: FormState = {
  activeForm: null,
  selectedField: null,
  savedForms: loadSavedForms(),
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

      saveFormsToLocalStorage(updatedSavedForms);

      return {
        ...state,
        savedForms: updatedSavedForms,
      };
    }

    // Delete Form
    case ActionTypes.DELETE_FORM: {
      const updatedSavedForms = state.savedForms.filter((form) => form.id !== action.payload);
      saveFormsToLocalStorage(updatedSavedForms);

      return {
        ...state,
        savedForms: updatedSavedForms,
      };
    }

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
        selectedField: newField,
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

    // Select field
    case ActionTypes.SELECT_FIELD:
      return {
        ...state,
        selectedField: action.payload,
      };

    // Update Field
    case ActionTypes.UPDATE_FIELD:
      if (!state.activeForm) return state;

      return {
        ...state,
        activeForm: {
          ...state.activeForm,
          fields: state.activeForm.fields.map((field) =>
            field.id === state.selectedField?.id ? { ...field, ...action.payload.updates } : field,
          ),
        },
        selectedField: state.selectedField
          ? { ...state.selectedField, ...action.payload.updates }
          : null,
      };

    default:
      return state;
  }
};
