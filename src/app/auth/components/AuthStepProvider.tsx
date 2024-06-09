"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const AuthStepContext = createContext<{
  step: number;
  setStep?: Dispatch<SetStateAction<number>>;
  enteredPhoneNumber: string;
  setEnteredPhoneNumber?: Dispatch<SetStateAction<string>>;
  validatedOtp: string;
  setValidatedOtp?: Dispatch<SetStateAction<string>>;
}>({
  step: 1,
  enteredPhoneNumber: "",
  validatedOtp: "",
});

export function AuthStepProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [validatedOtp, setValidatedOtp] = useState("");

  return (
    <AuthStepContext.Provider
      value={{
        step,
        setStep,
        enteredPhoneNumber,
        setEnteredPhoneNumber,
        validatedOtp,
        setValidatedOtp,
      }}
    >
      {children}
    </AuthStepContext.Provider>
  );
}

export const useAuthStep = () => useContext(AuthStepContext);
