"use client"

import Register from "@/components/Register";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function RegisterView() {

// Buscar otro metodo para restringir el acceso, ahora renderiza el componente y luego hace el push, pero no esta bien.

  const router = useRouter()
  const user = useSelector((state) => state.user.value);
  
  if( user.role === "student"){
    router.push("/home")
  }

  return (
    <div>
      <Register />
    </div>
  );
}
