import { SendOtpFormSchemaType } from "@/form-validation/auth/send-otp";
import { ValidateOtpFormSchema } from "@/form-validation/auth/validate-otp";
import { useMutation } from "@tanstack/react-query";

export const KEYS = {
  SEND_OTP: "send-otp",
  VALIDATE_OTP: "validate-otp",
};

export const useSendOtp = ({ onSuccess, onError }: MutationProps) =>
  useMutation({
    mutationKey: [KEYS.SEND_OTP],
    mutationFn: async (data: SendOtpFormSchemaType) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/send-otp`,
        {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();

        if (res.status === 429) {
          throw new Error(
            "Ви надіслали забагато SMS-повідомлень. Зачекайте ще одну хвилину, перш ніж надсилати наступне SMS."
          );
        }
        throw new Error(
          errorData.message ?? `Error ${res.status} - Something went wrong.`
        );
      }
    },
    onSuccess,
    onError,
  });

export const useValidateOtp = ({ onSuccess, onError }: MutationProps) =>
  useMutation({
    mutationKey: [KEYS.VALIDATE_OTP],
    mutationFn: async (data: ValidateOtpFormSchema) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/validate-otp`,
        {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message ?? `Error ${res.status} - Something went wrong.`
        );
      }

      const resData = await res.json();

      return resData as {
        firstTime: boolean;
      };
    },
    onSuccess,
    onError,
  });
