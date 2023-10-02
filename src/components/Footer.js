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
        fontFamily: "monserrat, sans-serif",
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
        <img
          src="https://www.plataforma5.la/static/media/LogoP5Footer.5278a9a1010612a25ba638427ecd72ef.svg"
          alt="P5Footer"
          width="100"
        />
      </div>
      <hr style={{ width: "130px", margin: "10px 0", borderColor: "white" }} />
      <div>© 2023 Co-work P5</div>
    </div>
  );
}
