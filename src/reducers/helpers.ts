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
