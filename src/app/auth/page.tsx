import { BRAND_NAME } from "@/shop-config";
import { Metadata } from "next";
import SendOtpHeader from "./components/send-otp/SendOtpHeader";
import { AuthStepProvider } from "./components/AuthStepProvider";
import AuthScreen from "./components/AuthScreen";
import ValidateOtpHeader from "./components/validate-otp/ValidateOtpHeader";

export const metadata: Metadata = {
  title: "Аутентифікація",
  description: `Увійдіть у свій обліковий запис на ${BRAND_NAME}.`,
};

export default function Auth() {
  return (
    <main className="container py-6 h-full flex-grow flex items-center justify-center">
      <AuthStepProvider>
        <AuthScreen
          headerComponentsArray={[
            <SendOtpHeader key={1} />,
            <ValidateOtpHeader key={2} />,
          ]}
        />
      </AuthStepProvider>
    </main>
  );
}
