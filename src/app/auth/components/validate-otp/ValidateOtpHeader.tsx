"use client";

import { formatPhoneNumberIntl } from "react-phone-number-input";
import { useAuthStep } from "../AuthStepProvider";

export default function ValidateOtpHeader() {
  const { enteredPhoneNumber } = useAuthStep();

  return (
    <header className="flex flex-col gap-2">
      <h3>Код підтвердження 🔑</h3>
      <p>
        SMS надіслано на{" "}
        <span className="text-nowrap">
          &quot;{formatPhoneNumberIntl(enteredPhoneNumber)}&quot;
        </span>
        .
      </p>
    </header>
  );
}
