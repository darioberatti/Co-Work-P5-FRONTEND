import SetterValues from "@/components/SetterValues";

export default function SetterValueView({ params }) {
  const { id } = params;
  return (
    <div>
      <SetterValues id={id} />
    </div>
  );
}
