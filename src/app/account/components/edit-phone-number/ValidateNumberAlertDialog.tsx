import { useSendOtp, useUpdateMyPhoneNumber } from "@/api/services/customers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import SubmitButton from "@/components/ui/submit-button";
import { editMyPhoneNumberFormSchema } from "@/form-validation/account/edit-my-phone-number";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import { UseFormReturn, useForm, useWatch } from "react-hook-form";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  form: UseFormReturn<
    {
      phoneNumber: string;
    },
    any,
    undefined
  >;
};

export default function ValidateNumberAlertDialog({
  open,
  setOpen,
  form,
}: Props) {
  const phoneNumber = useWatch({
    control: form.control,
    name: "phoneNumber",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Введіть код підтвердження</DialogTitle>
          <DialogDescription>
            Ми щойно відправили 6-значний код підтвердження на введений номер
            телефону &quot;{formatPhoneNumberIntl(phoneNumber)}&quot;.
          </DialogDescription>
        </DialogHeader>
        <ValidateForm phoneNumber={phoneNumber} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

type ValidateFormProps = {
  phoneNumber: string;
  setOpen: (val: boolean) => void;
};

function ValidateForm({ phoneNumber, setOpen }: ValidateFormProps) {
  const form = useForm<z.infer<typeof editMyPhoneNumberFormSchema>>({
    resolver: zodResolver(editMyPhoneNumberFormSchema),
    defaultValues: {
      phoneNumber,
      otp: "",
    },
  });

  const [errorMsg, setErrorMsg] = useState("");
  const { mutate, isPending, isError } = useUpdateMyPhoneNumber({
    onSuccess: async () => {
      toast.success("Ви успішно змінили свій номер телефону.");
      setOpen(false);
    },
    onError: (e: any) => {
      setErrorMsg(e.message);
    },
  });

  function onSubmit(values: z.infer<typeof editMyPhoneNumberFormSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        id="validate-number-dialog"
        onSubmit={form.handleSubmit(onSubmit)}
        aria-labelledby="form-title"
      >
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
          Icon={Pencil}
          isPending={isPending}
          text="Змінити номер телефону"
          formId="validate-number-dialog"
        />
      </form>
    </Form>
  );
}

function SendOtpAgain({ phoneNumber }: { phoneNumber: string }) {
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const { mutate } = useSendOtp({
    onSuccess: () => {
      toast.success("Ми щойно надіслали вам SMS із кодом підтвердження.");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const handleClick = () => {
    if (timeLeft === 0) {
      setTimeLeft(60);
      mutate({ phoneNumber });
    }
  };

  return (
    <span aria-live="polite">
      Не отримали код?{" "}
      {timeLeft === 0 ? (
        <span
          onClick={handleClick}
          className="underline text-primary cursor-pointer"
        >
          Натисніть тут, щоб надіслати його знову.
        </span>
      ) : (
        <span>
          Вам потрібно зачекати {timeLeft} секунд, перш ніж надіслати його
          знову.
        </span>
      )}
    </span>
  );
}
