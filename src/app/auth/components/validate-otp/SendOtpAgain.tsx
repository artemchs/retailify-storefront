import { useSendOtp } from "@/api/services/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  phoneNumber: string;
};

export default function SendOtpAgain({ phoneNumber }: Props) {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const { mutate } = useSendOtp({
    onSuccess: () => {
      toast.success("Ми щойно надіслали вам SMS із кодом підтвердження.");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const handleClick = () => {
    if (timeLeft === 0) {
      setTimeLeft(60);
      mutate({ phoneNumber });
    }
  };

  return (
    <>
      Не отримали код?{" "}
      {timeLeft === 0 ? (
        <span
          onClick={handleClick}
          className="underline text-primary cursor-pointer"
        >
          Натисніть тут, щоб надіслати його знову.
        </span>
      ) : (
        <span>
          Вам потрібно зачекати {timeLeft} секунд, перш ніж надіслати його
          знову.
        </span>
      )}
    </>
  );
}
