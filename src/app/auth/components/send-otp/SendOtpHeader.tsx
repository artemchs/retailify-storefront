export default function SendOtpHeader() {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">
        Вітаємо!{" "}
        <span role="img" aria-label="Емоджі, що махає рукою">
          👋
        </span>
      </h1>
      <p>Ви можете увійти за допомогою свого номера телефону.</p>
    </header>
  );
}
