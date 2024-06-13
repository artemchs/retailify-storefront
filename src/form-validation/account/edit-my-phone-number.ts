import { z } from "zod";

const message = "Ваш код підтвердження має містити 6 цифр.";

export const editMyPhoneNumberFormSchema = z.object({
  phoneNumber: z.string(),
  otp: z
    .string()
    .min(6, {
      message,
    })
    .max(6, { message }),
});

export type EditMyPhoneNumberFormSchema = z.infer<
  typeof editMyPhoneNumberFormSchema
>;
