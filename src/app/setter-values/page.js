"use client"

import { SetterValues } from "@/components/SetterValues";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function SetterValuesView() {

  const router = useRouter()
  const user = useSelector((state) => state.user.value);
  
  if( user.role !== "admin"){
    router.push("/home")
  }

  return (
    <div>
      <SetterValues />
    </div>
  );
}