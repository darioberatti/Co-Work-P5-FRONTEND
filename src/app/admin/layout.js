import { redirect } from "next/navigation";
import userData from "@/utils/getUser";

export default async function AdminLayout({ children }) {
  const user = await userData();

  //console.log("USUARIO DE ADMIN---------------------", user);
  return <>{user.role !== "admin" ? redirect("/home") : children}</>;
}
