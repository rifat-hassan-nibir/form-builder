import type { FormState } from "../../types";

export const formReducer = (state: FormState, action: any) => {
  switch (action.type) {
    case "ADD_FORM":
      return {
        ...state,
        forms: [...state.forms, action.payload],
      };
    case "DELETE_FORM":
      return {
        ...state,
        forms: state.forms.filter((form) => form.id !== action.payload),
      };
    default:
      return state;
  }
};
