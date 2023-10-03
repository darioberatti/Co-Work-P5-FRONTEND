"use client"

import UsersList from "@/components/UsersList";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";


export default function UsersView() {

  const router = useRouter()
  const user = useSelector((state) => state.user.value);
  
  if( user.role === "student"){
    router.push("/home")
  }

  return (
    <div>
      <UsersList />
    </div>
  );
}
