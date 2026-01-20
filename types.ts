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
