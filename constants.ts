import type { FieldType } from "./types";

export const FIELD_TYPES: { type: FieldType; label: string; icon: string }[] = [
  { type: "text", label: "Text Input", icon: "Type" },
  { type: "email", label: "Email", icon: "Mail" },
  { type: "password", label: "Password", icon: "Lock" },
  { type: "number", label: "Number", icon: "Hash" },
  { type: "textarea", label: "Text Area", icon: "AlignJustify" },
  { type: "select", label: "Select Dropdown", icon: "ChevronDown" },
  { type: "checkbox", label: "Checkbox", icon: "CheckSquare" },
  { type: "radio", label: "Radio Group", icon: "CircleDot" },
  { type: "date", label: "Date Picker", icon: "Calendar" },
];

// Action Types
export const ActionTypes = {
  // Form Management
  CREATE_NEW_FORM: "CREATE_NEW_FORM",
  UPDATE_FORM_META: "UPDATE_FORM_META",
  LOAD_FORM: "LOAD_FORM",
  SAVE_FORM: "SAVE_FORM",
  DELETE_FORM: "DELETE_FORM",
  CLEAR_FORM: "CLEAR_FORM",

  // Field Management
  ADD_FIELD: "ADD_FIELD",
  UPDATE_FIELD: "UPDATE_FIELD",
  DELETE_FIELD: "DELETE_FIELD",
  REORDER_FIELDS: "REORDER_FIELDS",
  SELECT_FIELD: "SELECT_FIELD",
  DUPLICATE_FIELD: "DUPLICATE_FIELD",

  // UI State
  SET_ACTIVE_TAB: "SET_ACTIVE_TAB",
  TOGGLE_PROPERTIES_PANEL: "TOGGLE_PROPERTIES_PANEL",
};
