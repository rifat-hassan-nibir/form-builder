import { STORAGE_KEY } from "../../constants";
import type { FormSchema } from "../../types";
import { generateRandomId } from "../utils/generateRandomId";

// Create new empty form
export const createNewForm = () => ({
  id: generateRandomId(),
  title: "Untitled Form",
  description: "",
  fields: [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

export const loadSavedForms = (): FormSchema[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading forms from localStorage:", error);
    return [];
  }
};

export const saveFormsToLocalStorage = (forms: FormSchema[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
  } catch (error) {
    console.error("Error saving forms to localStorage:", error);
  }
};
