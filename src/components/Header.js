"use client";

import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import background from "../../public/background.svg";
import Image from "next/image";

export default function Header() {
  const user = useSelector((state) => state.user.value);

  const path = usePathname();

  let text1 = "";
  let text2 = "";
  let text3 = "";
  let role = "";

  if (user.role === "admin") {
    role = "Administrador";
  } else if (user.role === "staff") {
    role = "Staff";
  } else if (user.role === "student") {
    role = "Alumno";
  } else {
    role = "";
  }
  if (path === "/") {
    text1 = "Bienvenido a ";
    text2 = "Co-Work P5";
    text3 = "Debes Iniciar Sesión";
  } else if (path === "/home") {
    text1 = "Perfil de ";
    text2 = `${role}`;
  } else if (path === "/offices") {
    text1 = "Lista de ";
    text2 = "Oficinas";
    text3 = "disponibles";
  } else if (path === "/bookings") {
    text1 = "Lista de ";
    text2 = "Reservas";
    text3 = "e Historial";
  } else {
    text1 = "Perfil de ";
    text2 = `${role}`;
  }

  return (
    <div
      style={{
        boxSizing: "border - box",
        width: "100%",
        height: "180px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0px 0px 100px 100px",
        backgroundColor: "rgb(0, 31, 85)",
        position: "relative",
      }}
    >
      <div
        style={{
          color: "white",
          marginTop: "15px",
          textAlign: "center",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "400",
          fontSize: "1.5rem",
          position: "relative",
        }}
      >
        <span style={{ margin: "0" }}>{text1}</span>
        <span
          style={{
            margin: "0",
            fontWeight: "bold",
          }}
        >
          {text2}
        </span>

        <br></br>
        <p style={{ margin: "0" }}>{text3}</p>
      </div>
      <Image
        src={background}
        alt="Background"
        width={"100%"}
        height={180}
        style={{
          position: "absolute",
        }}
      />
    </div>
  );
}
