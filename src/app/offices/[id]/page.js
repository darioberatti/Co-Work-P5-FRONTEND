import Office from "@/components/Office";

export default function OfficeView({ params }) {
  const { id } = params;
  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "monserrat, sans-serif",
        fontWeight: "400",
      }}
    >
      <h1>Detalles de la Oficina</h1>
      <Office id={id} />
    </div>
  );
}
