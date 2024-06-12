import { SendOtpFormSchemaType } from "@/form-validation/auth/send-otp";
import { SignUpFormSchema } from "@/form-validation/auth/sign-up";
import { ValidateOtpFormSchema } from "@/form-validation/auth/validate-otp";
import { useMutation } from "@tanstack/react-query";
import { fetchConfig } from "../helpers";

export const KEYS = {
  SEND_OTP: "send-otp",
  VALIDATE_OTP: "validate-otp",
  SIGN_UP: "sign-up",
};

export const useSendOtp = ({ onSuccess, onError }: MutationProps) =>
  useMutation({
    mutationKey: [KEYS.SEND_OTP],
    mutationFn: async (data: SendOtpFormSchemaType) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/send-otp`,
        {
          ...fetchConfig,
          method: "POST",
          cache: "no-cache",
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
          ...fetchConfig,
          method: "POST",
          cache: "no-cache",
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message ?? `Error ${res.status} - Something went wrong.`
        );
      }

      console.log(res.headers.getSetCookie());

      return await res.json();
    },
    onSuccess,
    onError,
  });

export const useSignUp = ({ onSuccess, onError }: MutationProps) =>
  useMutation({
    mutationKey: [KEYS.SIGN_UP],
    mutationFn: async (data: SignUpFormSchema) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sign-up`,
        {
          ...fetchConfig,
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message ?? `Error ${res.status} - Something went wrong.`
        );
      }

      return await res.json();
    },
    onSuccess,
    onError,
  });
