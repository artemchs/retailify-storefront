import { AlertCircle, MessageCircleWarningIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

type Props = {
  message?: string;
  isError: boolean;
};

export default function FormErrorAlert({ message, isError }: Props) {
  return (
    isError && (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Ой! Виникла помилка...</AlertTitle>
        <AlertDescription>
          {message ?? "Повідомлення не надано."}
        </AlertDescription>
      </Alert>
    )
  );
}
