import { redirect } from "next/navigation";

import userData from "@/utils/getUser";

export default async function StaffLayout({ children }) {
  const user = await userData();

  //console.log("USUARIO DE FUNCION STAFF---------------------", user);
  return (
    <>
      {user.role !== "admin" && user.role !== "staff"
        ? redirect("/home")
        : children}
    </>
  );
}
