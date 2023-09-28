import Office from "@/components/Office";

export default function OfficeView({ params }) {
  const { id } = params;
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>Detalles de la Oficina</h1>
      <Office id={id} />
    </div>
  );
}
