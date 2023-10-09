//"use client";
import Login from "../components/Login";
//import { useSelector } from "react-redux";
//import { useRouter } from "next/navigation";
import userData from "@/utils/getUser";
import { redirect } from "next/navigation";

export default async function App() {
  //const user = useSelector((state) => state.user.value);
  //const router = useRouter();
  const user = await userData();

  return <main>{user ? redirect("/home", "replace") : <Login />}</main>;
}
