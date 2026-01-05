import axios from "axios";
import { useState } from "react";

type EmailStatus =
  | "idle"
  | "checking"
  | "available"
  | "notAvailable"
  | "failed";

export const useEmailCheck = () => {
  const [available, setAvailable] = useState<EmailStatus>("idle");
  const [emailInput, setEmailInput] = useState<null | string>();

  const checkEmail = async (email: string) => {
    setEmailInput(email);
    setAvailable("checking");
    try {
      const res = await axios.get(`/users?email=${email}`);
      if (!res.data.length) {
        setAvailable("available");
      } else {
        setAvailable("notAvailable");
      }
    } catch (error) {
      setAvailable("failed");
    }
  };

  const resetCheckEmail = () => {
    setAvailable("idle");
    setEmailInput(null);
  };

  return {
    available,
    emailInput,
    checkEmail,
    resetCheckEmail,
  };
};
