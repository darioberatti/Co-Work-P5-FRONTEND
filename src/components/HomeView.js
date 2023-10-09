//"use client";
import Image from "next/image";
import Coworking from "../../public/Coworking.png";
import LogoP5Mobile from "../../public/LogoP5Mobile.svg";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
//import { useSelector } from "react-redux";
import userData from "@/utils/getUser";

export default async function HomeView() {
  //const user = useSelector((state) => state.user.value);
  const user = await userData();

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "800",
        fontSize: "1.3rem",
      }}
    >
      <div>
        <p style={{ height: "15px", fontSize: "1.6rem" }}>¡Hola {user.name}!</p>
        <span>Te damos la bienvenida a</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          fontSize: "1.7rem",
          alignItems: "center",
          marginTop: "5px",
        }}
      >
        <div style={{ marginRight: "10px", color: "rgb(0, 31, 85)" }}>
          CO-WORK
        </div>
        <Image src={LogoP5Mobile} alt="Logo P5" width={35} height={35} />
      </div>
      <Image src={Coworking} alt="Coding" width={350} height={250} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "30px",
          gap: "40px",
        }}
      >
        <Link href={"/bookings"}>
          <Button color="indigo" variant="soft">
            Ver Reservas
          </Button>
        </Link>
        <Link href={"/offices"}>
          <Button color="indigo" variant="soft">
            Ver Oficinas
          </Button>
        </Link>
      </div>
    </div>
  );
}
