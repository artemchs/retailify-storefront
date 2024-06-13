"use client";

import { useGetMe } from "@/api/services/customers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditProfileForm from "./EditProfileForm";

export default function EditProfile() {
  const { data, isLoading, isError, error } = useGetMe();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Редагувати профіль</CardTitle>
        <CardDescription>
          Тут ви можете редагувати інформацію про свій профіль.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EditProfileForm
          data={data}
          isError={isError}
          isLoading={isLoading}
          error={error}
        />
      </CardContent>
    </Card>
  );
}
