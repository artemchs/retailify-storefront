// type ResData = {
//   error: string;
//   message: string | string[];
//   statusCode: number;
// };

// type Props = {
//   setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
// };

// export default function onErrorHandler({ error, setErrorMessage }: Props) {
//   const data = error.response?.data as ResData;
//   if (setErrorMessage) {
//     const message = data.message;
//     if (Array.isArray(message)) {
//       setErrorMessage(message[0]);
//     } else if (typeof message === "string") {
//       setErrorMessage(message);
//     }
//   }
// }

export const fetchConfig: RequestInit = {
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
  },
  credentials: "include",
};

export type MutationProps = {
  onSuccess: (data?: any) => void;
  onError: (e: Error) => void;
};
