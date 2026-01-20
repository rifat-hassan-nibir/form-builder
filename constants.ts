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
