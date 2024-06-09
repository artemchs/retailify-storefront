import { BRAND_NAME } from "@/shop-config";
import { Metadata } from "next";
import SendOtpHeader from "./components/send-otp/SendOtpHeader";
import SendOtpForm from "./components/send-otp/SendOtpForm";

export const metadata: Metadata = {
  title: "Аутентифікація",
  description: `Увійдіть у свій обліковий запис на ${BRAND_NAME}.`,
};

export default function Auth() {
  return (
    <main className="container py-6 h-full flex-grow flex items-center justify-center">
      <div className="max-w-sm flex flex-col gap-12">
        <SendOtpHeader />
        <SendOtpForm />
      </div>
    </main>
  );
}
