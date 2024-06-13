import { z } from "zod";

export const editProfileFormSchema = z.object({
  firstName: z.string().min(1, "Ім'я має містити принаймні один символ"),
  lastName: z.string().min(1, "Прізвище має містити принаймні один символ"),
});

export type EditProfileFormSchema = z.infer<typeof editProfileFormSchema>;
