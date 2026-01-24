export type FieldType =
  | "text"
  | "email"
  | "number"
  | "password"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date";

export interface FieldOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder: string;
  required: boolean;
  defaultValue?: string;
  options?: FieldOption[]; // For select, checkbox, radio
}

export interface FormSchema {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  updatedAt: number;
  createdAt: number;
}

// Action Interfaces
export type FormAction =
  | { type: "CREATE_NEW_FORM"; payload: FormSchema }
  | { type: "UPDATE_FORM_META"; payload: { title?: string; description?: string } }
  | { type: "LOAD_FORM"; payload: string } // form id
  | { type: "SAVE_FORM" }
  | { type: "DELETE_FORM"; payload: string } // form id
  | { type: "CLEAR_FORM" }
  | { type: "ADD_FIELD"; payload: FieldType }
  | { type: "UPDATE_FIELD"; payload: { fieldId: string; updates: Partial<FormField> } }
  | { type: "DELETE_FIELD"; payload: string } // field id
  | { type: "REORDER_FIELDS"; payload: { fromIndex: number; toIndex: number } }
  | { type: "SELECT_FIELD"; payload: string | null } // field id or null
  | { type: "DUPLICATE_FIELD"; payload: string } // field id
  | { type: "SET_ACTIVE_TAB"; payload: "builder" | "preview" | "code" }
  | { type: "TOGGLE_PROPERTIES_PANEL" };

// State Interface
export interface FormState {
  activeForm: FormSchema | null;
  selectedFieldId: string | null;
  savedForms: FormSchema[];
}
