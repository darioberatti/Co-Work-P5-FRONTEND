import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h2>Hubo un problema.</h2>
      <p>No pudimos encontrar la página que estabas buscando.</p>
      <p>Volver a la <Link href="/">Página Principal</Link>.</p>
    </main>
  );
}
