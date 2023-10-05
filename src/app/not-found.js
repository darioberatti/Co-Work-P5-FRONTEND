import Link from "next/link";
import { Button } from "@radix-ui/themes";

export default function NotFound() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "monserrat, sans-serif",
        color: "rgb(0, 31, 85)",
      }}
    >
      <h2 style={{ fontSize: "30px" }}>ERROR</h2>
      <p>No hemos encontrado la página que buscas.</p>
      <p>Código de error: 404</p>
      <Link href={"/home"}>
        {" "}
        <Button color="indigo" style={{ marginTop: "20px" }}>
          Volver al Inicio
        </Button>
      </Link>

      <img
        src="error.webp"
        style={{ width: "300px" }}
      />
    </main>
  );
}
