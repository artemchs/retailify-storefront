import { useMutation, useQuery } from "@tanstack/react-query";
import { MutationProps, authFetch } from "../helpers";
import { EditProfileFormSchema } from "@/form-validation/account/edit-profile";
import { SendOtpFormSchemaType } from "@/form-validation/auth/send-otp";
import { EditMyPhoneNumberFormSchema } from "@/form-validation/account/edit-my-phone-number";

export const KEYS = {
  GET_ME: "get-me",
  UPDATE_ME: "update-me",
  SEND_OTP: "send-otp",
  UPDATE_MY_PHONE_NUMBER: "update-my-phone-number",
};

export type Customer = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export const useGetMe = () =>
  useQuery({
    queryKey: [KEYS.GET_ME],
    queryFn: async () => {
      const data: Customer | undefined = await authFetch({
        method: "GET",
        url: "customers/me",
      });

      return data;
    },
  });

export const useUpdateMe = ({ onSuccess, onError }: MutationProps) =>
  useMutation({
    mutationKey: [KEYS.UPDATE_ME],
    mutationFn: async (body: EditProfileFormSchema) => {
      const data: Customer = await authFetch({
        method: "PUT",
        url: "customers/me",
        body,
      });

      return data;
    },
    onSuccess,
    onError,
  });

export const useSendOtp = ({ onSuccess, onError }: MutationProps) =>
  useMutation({
    mutationKey: [KEYS.SEND_OTP],
    mutationFn: async (body: SendOtpFormSchemaType) => {
      const data: { msg: string } = await authFetch({
        method: "POST",
        url: "customers/send-otp",
        body,
        isSMS: true,
      });

      return data;
    },
    onSuccess,
    onError,
  });

export const useUpdateMyPhoneNumber = ({ onSuccess, onError }: MutationProps) =>
  useMutation({
    mutationKey: [KEYS.UPDATE_MY_PHONE_NUMBER],
    mutationFn: async (body: EditMyPhoneNumberFormSchema) => {
      const data: { msg: string } = await authFetch({
        method: "PUT",
        url: "customers/my-phone-number",
        body,
      });

      return data;
    },
    onSuccess,
    onError,
  });
