"use client";

import { useGetMe } from "@/api/services/customers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditPhoneNumberForm from "./EditPhoneNumberForm";

export default function EditPhoneNumber() {
  const { data, isLoading, isError, error } = useGetMe();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Номер телефону</CardTitle>
        <CardDescription>
          Тут ви можете змінити номер телефону, прив&apos;язаний до вашого
          облікового запису.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EditPhoneNumberForm
          data={data}
          error={error}
          isError={isError}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
