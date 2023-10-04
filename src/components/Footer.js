import Image from "next/image";
import logoP5Footer from "../../public/LogoP5Footer.svg";

export default function MyFooter() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        height: "90px",
        width: "100%",
        color: "white",
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "400",
        backgroundColor: "rgb(0, 31, 85)",
        position: "fixed",
        bottom: "0",
        left: "0",
      }}
    >
      <div
        style={{
          marginTop: "10px",
        }}
      >
        <Image
          src={logoP5Footer}
          alt="Logo P5 Footer"
          width={150}
          height={30}
        />
      </div>
      <hr style={{ width: "130px", margin: "10px 0", borderColor: "white" }} />
      <div>© 2023 Co-work P5</div>
    </div>
  );
}
