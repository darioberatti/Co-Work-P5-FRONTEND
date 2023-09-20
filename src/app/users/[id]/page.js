import User from "@/components/User";

export default function UserView({params}) {
  const {id} = params
  return (
    <div>
      <h1>Usuario particular con id: {id}</h1>
      <User/>
    </div>
  );
}
