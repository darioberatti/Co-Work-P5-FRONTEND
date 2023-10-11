import BookingsPanel from "@/components/BookingsPanel";

export default function BookingPanelView({ params }) {
  const { id } = params;

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "400",
      }}
    >
      <h1>Detalle de Reservas</h1>
      <BookingsPanel id={id} />
    </div>
  );
}
