import { isAxiosError } from "axios";

export const checkAxiosError = (error: unknown): string => {
  if (isAxiosError(error)) {
    return error.message || "An unexpected error occurred";
  } else {
    return "An unexpected error occurred";
  }
};
