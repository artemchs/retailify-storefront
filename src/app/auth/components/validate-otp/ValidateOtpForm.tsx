"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { validateOtpFormSchema } from "@/form-validation/auth/validate-otp";
import { useState } from "react";
import { useValidateOtp } from "@/api/services/auth";
import FormErrorAlert from "@/components/ui/form-error-alert";
import SubmitButton from "@/components/ui/submit-button";
import { Check } from "lucide-react";
import SendOtpAgain from "./SendOtpAgain";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  phoneNumber: string;
  setStep?: (newValue: number) => void;
  setValidatedOtp?: (newValue: string) => void;
};

export default function ValidateOtpForm({
  phoneNumber,
  setStep,
  setValidatedOtp,
}: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof validateOtpFormSchema>>({
    resolver: zodResolver(validateOtpFormSchema),
    defaultValues: {
      otp: "",
      phoneNumber,
    },
  });

  const [errorMsg, setErrorMsg] = useState("");
  const { mutate, isPending, isError } = useValidateOtp({
    onSuccess: ({ firstTime }: { firstTime: boolean }) => {
      if (firstTime) {
        if (setStep) setStep(3);
        if (setValidatedOtp) setValidatedOtp(form.getValues("otp"));
      } else {
        router.push("/");
        toast.success("Ви успішно ввійшли у свій профіль.");
      }
    },
    onError: (e) => {
      setErrorMsg(e.message);
    },
  });

  function onSubmit(values: z.infer<typeof validateOtpFormSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} aria-labelledby="form-title">
        <h2 id="form-title" className="sr-only">
          Форма для перевірки коду підтвердження
        </h2>
        <FormErrorAlert isError={isError} message={errorMsg} />
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Код підтвердження:{" "}
                <span aria-hidden className="text-destructive">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                <SendOtpAgain phoneNumber={phoneNumber} />
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          Icon={Check}
          isPending={isPending}
          text="Перевірити код"
        />
      </form>
    </Form>
  );
}
