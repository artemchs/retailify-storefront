import SignOutCard from "./components/SignOutCard";

export default function Account() {
  return (
    <main className="container max-w-screen-sm py-8 flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1>Ваш обліковий запис 🔐</h1>
        <p>
          Тут ви можете переглядати і редагувати все, що пов&apos;язано з вашим
          акаунтом.
        </p>
      </header>
      <SignOutCard />
    </main>
  );
}
