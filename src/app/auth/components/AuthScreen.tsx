"use client";

import { useAuthStep } from "./AuthStepProvider";
import SendOtpForm from "./send-otp/SendOtpForm";
import ValidateOtpForm from "./validate-otp/ValidateOtpForm";

type Props = {
  headerComponentsArray: any[];
};

export default function AuthScreen({ headerComponentsArray }: Props) {
  const { step, setStep, enteredPhoneNumber, setEnteredPhoneNumber } =
    useAuthStep();

  return (
    <div className="w-screen max-w-screen-sm flex flex-col gap-12">
      {headerComponentsArray[step - 1]}
      {step === 1 ? (
        <SendOtpForm setStep={setStep} setPhoneNumber={setEnteredPhoneNumber} />
      ) : (
        <ValidateOtpForm phoneNumber={enteredPhoneNumber} />
      )}
    </div>
  );
}
