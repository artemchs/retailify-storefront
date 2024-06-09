"use client";

import { useAuthStep } from "./AuthStepProvider";
import SendOtpForm from "./send-otp/SendOtpForm";
import SignUpForm from "./sign-up/SignUpForm";
import ValidateOtpForm from "./validate-otp/ValidateOtpForm";

type Props = {
  headerComponentsArray: any[];
};

export default function AuthScreen({ headerComponentsArray }: Props) {
  const {
    step,
    setStep,
    enteredPhoneNumber,
    setEnteredPhoneNumber,
    validatedOtp,
    setValidatedOtp,
  } = useAuthStep();

  return (
    <div className="w-screen max-w-screen-sm flex flex-col gap-12">
      {headerComponentsArray[step - 1]}
      {step === 1 ? (
        <SendOtpForm setStep={setStep} setPhoneNumber={setEnteredPhoneNumber} />
      ) : step === 2 ? (
        <ValidateOtpForm
          setValidatedOtp={setValidatedOtp}
          phoneNumber={enteredPhoneNumber}
          setStep={setStep}
        />
      ) : (
        <SignUpForm
          validatedOtp={validatedOtp}
          enteredPhoneNumber={enteredPhoneNumber}
        />
      )}
    </div>
  );
}
