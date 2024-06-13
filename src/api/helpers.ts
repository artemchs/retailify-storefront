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

type AuthFetchProps = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  isSMS?: boolean;
};

export async function authFetch({
  method,
  url,
  body,
  isSMS = false,
}: AuthFetchProps) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`, {
    ...fetchConfig,
    body: JSON.stringify(body),
    method,
  });

  if (!res.ok) {
    if (res.status === 401) {
      const rtRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
        {
          ...fetchConfig,
          method: "POST",
        }
      );

      if (!rtRes.ok) {
        const rtErrorData = await res.json();
        throw new Error(
          rtErrorData.message ?? `Error ${res.status} - Something went wrong.`
        );
      }

      return await res.json();
    }

    if (res.status === 429 && isSMS) {
      throw new Error(
        "Ви надіслали забагато SMS-повідомлень. Зачекайте ще одну хвилину, перш ніж надсилати наступне SMS."
      );
    }

    const errorData = await res.json();
    throw new Error(
      errorData.message ?? `Error ${res.status} - Something went wrong.`
    );
  }

  const data = await res.json();

  return data;
}
