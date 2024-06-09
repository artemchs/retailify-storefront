import { z } from "zod";

export const signUpFormSchema = z.object({
  validatedOtp: z.string(),
  phoneNumber: z.string(),
  firstName: z.string().min(1, "Ім'я має містити принаймні один символ"),
  lastName: z.string().min(1, "Прізвище має містити принаймні один символ"),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
