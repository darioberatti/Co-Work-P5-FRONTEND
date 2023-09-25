import Office from "@/components/Office";

export default function OfficeView({params}) {
  const {id} = params
  return (
    <div>
      <h1>Oficina particular con id: {id}</h1>
      <Office id={id}/>
    </div>
  );
}