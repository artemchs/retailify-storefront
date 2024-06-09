import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const sendOtpFormSchema = z.object({
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, {
      message: "Цей номер телефону неправильний або недійсний.",
    }),
});

export type SendOtpFormSchemaType = z.infer<typeof sendOtpFormSchema>;
