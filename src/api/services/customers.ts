import { useMutation, useQuery } from "@tanstack/react-query";
import { MutationProps, authFetch } from "../helpers";
import { EditProfileFormSchema } from "@/form-validation/account/edit-profile";

export const KEYS = {
  GET_ME: "get-me",
  UPDATE_ME: "update-me",
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
