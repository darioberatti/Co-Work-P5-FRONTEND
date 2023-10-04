import User from "@/commons/User";

export default function UserView({params}) {
  const {id} = params
  return (
   
      <User id={id}/>
   
  );
}
