import { Customer, useSendOtp, useUpdateMe } from "@/api/services/customers";
import CustomizedPhoneNumberInput from "@/components/ui/customized-phone-number-input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormErrorAlert from "@/components/ui/form-error-alert";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitButton from "@/components/ui/submit-button";
import { editMyPhoneNumberFormSchema } from "@/form-validation/account/edit-my-phone-number";
import { editProfileFormSchema } from "@/form-validation/account/edit-profile";
import { sendOtpFormSchema } from "@/form-validation/auth/send-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key, Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ValidateNumberAlertDialog from "./ValidateNumberAlertDialog";

type Props = {
  data: Customer | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export default function EditPhoneNumberForm({
  data,
  isError,
  isLoading,
  error,
}: Props) {
  const form = useForm<z.infer<typeof sendOtpFormSchema>>({
    resolver: zodResolver(sendOtpFormSchema),
    defaultValues: useMemo(
      () => ({
        phoneNumber: data?.phoneNumber,
      }),
      [data]
    ),
  });

  useEffect(() => {
    form.reset({
      phoneNumber: data?.phoneNumber,
    });
  }, [data, form]);

  const [validateAlertdialogOpen, setValidateAlertDialogOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const sendOtp = useSendOtp({
    onSuccess: () => {
      setValidateAlertDialogOpen(true);
    },
    onError: (e) => {
      setErrorMsg(e.message);
    },
  });

  function onSubmit(values: z.infer<typeof sendOtpFormSchema>) {
    sendOtp.mutate(values);
  }

  if (isError) {
    return <FormErrorAlert isError={isError} message={error?.message} />;
  }

  return (
    <>
      <ValidateNumberAlertDialog
        open={validateAlertdialogOpen}
        setOpen={setValidateAlertDialogOpen}
        form={form}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          aria-labelledby="form-title"
        >
          <h2 id="form-title" className="sr-only">
            Форма для редагування номера телефону.
          </h2>
          <FormErrorAlert isError={sendOtp.isError} message={errorMsg} />
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
                  {isLoading ? (
                    <Skeleton className="input-size" />
                  ) : (
                    <CustomizedPhoneNumberInput field={field} />
                  )}
                </FormControl>
                <FormDescription>
                  На цей номер телефону ми надішлемо SMS із 6-значним кодом.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton
            Icon={Key}
            isPending={sendOtp.isPending}
            text="Надіслати код"
          />
        </form>
      </Form>
    </>
  );
}
