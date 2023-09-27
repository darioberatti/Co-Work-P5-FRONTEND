import User from "@/components/User";

export default function UserView({params}) {
  const {id} = params
  return (
   
      <User id={id}/>
   
  );
}
