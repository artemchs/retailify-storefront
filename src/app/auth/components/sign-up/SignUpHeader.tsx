export default function SignUpHeader() {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">
        Останній крок{" "}
        <span role="img" aria-label="Емодзі вечірки">
          🎉
        </span>
      </h1>
      <p>Введіть основну інформацію для зручності покупок.</p>
    </header>
  );
}
