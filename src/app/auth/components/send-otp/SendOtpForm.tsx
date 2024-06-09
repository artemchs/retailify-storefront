"use client";

import { sendOtpFormSchema } from "@/form-validation/auth/send-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ua from "react-phone-number-input/locale/ua";
import { PhoneInput } from "@/components/ui/phone-input";
import { Key } from "lucide-react";
import { useSendOtp } from "@/api/services/auth";
import SubmitButton from "@/components/ui/submit-button";
import FormErrorAlert from "@/components/ui/form-error-alert";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  setStep?: (newValue: number) => void;
  setPhoneNumber?: (newValue: string) => void;
};

export default function SendOtpForm({ setStep, setPhoneNumber }: Props) {
  const form = useForm<z.infer<typeof sendOtpFormSchema>>({
    resolver: zodResolver(sendOtpFormSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const [errorMsg, setErrorMsg] = useState("");
  const { mutate, isPending, isError } = useSendOtp({
    onSuccess: () => {
      toast.success("Ми щойно надіслали вам SMS із кодом підтвердження.");
      if (setStep) {
        setStep(2);
      }
      if (setPhoneNumber) {
        setPhoneNumber(form.getValues("phoneNumber"));
      }
    },
    onError: (e) => {
      setErrorMsg(e.message);
    },
  });

  function onSubmit(values: z.infer<typeof sendOtpFormSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} aria-labelledby="form-title">
        <h2 id="form-title" className="sr-only">
          Форма для відправки коду підтвердження
        </h2>
        <FormErrorAlert isError={isError} message={errorMsg} />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="phoneNumber">
                Номер телефону:{" "}
                <span aria-hidden className="text-destructive">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <PhoneNumberInput field={field} />
              </FormControl>
              <FormDescription>
                На цей номер телефону ми надішлемо SMS із 6-значним кодом.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton Icon={Key} isPending={isPending} text="Надіслати код" />
      </form>
    </Form>
  );
}

function PhoneNumberInput({
  field,
}: {
  field: ControllerRenderProps<
    {
      phoneNumber: string;
    },
    "phoneNumber"
  >;
}) {
  return (
    <PhoneInput
      {...field}
      id="phoneNumber"
      labels={ua}
      countries={["UA"]}
      defaultCountry="UA"
      placeholder="000 000 0000"
      international={false}
    />
  );
}
