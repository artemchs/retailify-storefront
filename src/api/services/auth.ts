import { SendOtpFormSchemaType } from "@/form-validation/auth/send-otp";
import { useMutation } from "@tanstack/react-query";

export const KEYS = {
  SEND_OTP: "send-otp",
};

export const useSendOtp = ({ onSuccess, onError }: MutationProps) =>
  useMutation({
    mutationKey: [KEYS.SEND_OTP],
    mutationFn: async (data: SendOtpFormSchemaType) => {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/send-otp`, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess,
    onError,
  });
