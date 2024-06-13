import { Customer, useUpdateMe } from "@/api/services/customers";
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
import { Skeleton } from "@/components/ui/skeleton";
import SubmitButton from "@/components/ui/submit-button";
import { editProfileFormSchema } from "@/form-validation/account/edit-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  data: Customer | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export default function EditProfileForm({
  data,
  isError,
  isLoading,
  error,
}: Props) {
  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: useMemo(
      () => ({
        firstName: data?.firstName,
        lastName: data?.lastName,
      }),
      [data]
    ),
  });

  useEffect(() => {
    form.reset({
      firstName: data?.firstName,
      lastName: data?.lastName,
    });
  }, [data, form]);

  const [errorMsg, setErrorMsg] = useState("");
  const updateMe = useUpdateMe({
    onSuccess: () => {},
    onError: (e) => {
      setErrorMsg(e.message);
    },
  });

  function onSubmit(values: z.infer<typeof editProfileFormSchema>) {
    updateMe.mutate(values);
  }

  if (isError) {
    return <FormErrorAlert isError={isError} message={error?.message} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} aria-labelledby="form-title">
        <h2 id="form-title" className="sr-only">
          Форма для редагування контактної інформації.
        </h2>
        <FormErrorAlert isError={updateMe.isError} message={errorMsg} />
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
                {isLoading ? (
                  <Skeleton className="input-size" />
                ) : (
                  <Input placeholder="Введіть своє ім'я..." {...field} />
                )}
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
                {isLoading ? (
                  <Skeleton className="input-size" />
                ) : (
                  <Input placeholder="Введіть своє прізвище..." {...field} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          Icon={Save}
          isPending={updateMe.isPending}
          text="Зберегти"
        />
      </form>
    </Form>
  );
}
