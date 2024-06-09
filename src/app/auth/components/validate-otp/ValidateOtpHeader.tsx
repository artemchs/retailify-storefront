"use client";

import { formatPhoneNumberIntl } from "react-phone-number-input";
import { useAuthStep } from "../AuthStepProvider";

export default function ValidateOtpHeader() {
  const { enteredPhoneNumber } = useAuthStep();

  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">
        Код підтвердження{" "}
        <span role="img" aria-label="Емодзі ключа">
          🔑
        </span>
      </h1>
      <p>
        SMS надіслано на{" "}
        <span aria-live="polite" className="text-nowrap">
          &quot;<span className="sr-only">номер телефону:</span>{" "}
          {formatPhoneNumberIntl(enteredPhoneNumber)}&quot;
        </span>
        .
      </p>
    </header>
  );
}
