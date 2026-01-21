export interface savedForms {
  id: string;
  title: string;
  description: string;
  fields: any[];
  lastModified: Date;
}

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
  lastModified: number;
  createdAt: number;
}

export interface FormState {
  activeForm: FormSchema;
  savedForms: FormSchema[];
}
