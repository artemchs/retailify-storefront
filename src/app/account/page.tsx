import { cookies } from "next/headers";
import SignOutCard from "./components/sign-out/SignOutCard";
import { redirect } from "next/navigation";
import EditProfile from "./components/edit-profile/EditProfile";

export default async function Account() {
  const rt = cookies().get("storefront-jwt-refresh-token");
  if (!rt) redirect("/auth");

  return (
    <main className="container max-w-screen-sm py-8 flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1>Ваш обліковий запис 🔐</h1>
        <p>
          Тут ви можете переглядати і редагувати все, що пов&apos;язано з вашим
          акаунтом.
        </p>
      </header>
      <EditProfile />
      <SignOutCard />
    </main>
  );
}
