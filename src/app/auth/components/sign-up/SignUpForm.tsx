import { useSignUp } from "@/api/services/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormErrorAlert from "@/components/ui/form-error-alert";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import { signUpFormSchema } from "@/form-validation/auth/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRoundCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  validatedOtp: string;
  enteredPhoneNumber: string;
};

export default function SignUpForm({
  enteredPhoneNumber,
  validatedOtp,
}: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      phoneNumber: enteredPhoneNumber,
      validatedOtp,
      firstName: "",
      lastName: "",
    },
  });

  const [errorMsg, setErrorMsg] = useState("");
  const { mutate, isPending, isError } = useSignUp({
    onSuccess: () => {
      router.push("/");
      router.refresh();
      toast.success("Ви успішно ввійшли у свій профіль.");
    },
    onError: (e: any) => {
      setErrorMsg(e.message);
    },
  });

  function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} aria-labelledby="form-title">
        <h2 id="form-title" className="sr-only">
          Реєстраційна форма
        </h2>
        <FormErrorAlert isError={isError} message={errorMsg} />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Ваше ім&apos;я:{" "}
                <span aria-hidden className="text-destructive">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Введіть своє ім'я..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Ваше прізвище:{" "}
                <span aria-hidden className="text-destructive">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Введіть своє прізвище..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          Icon={UserRoundCheck}
          isPending={isPending}
          text="Зареєструватися"
        />
      </form>
    </Form>
  );
}
