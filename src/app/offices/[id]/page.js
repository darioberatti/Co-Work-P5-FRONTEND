import Office from "@/components/Office";

export default function OfficeView({params}) {
  const {id} = params
  return (
    <div>
      <h1>Oficina #{id}</h1>
      <Office id={id}/>
    </div>
  );
}