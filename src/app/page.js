"use client";
import Login from "../components/Login";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function App() {
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  return <main>{user.userId ? router.push("/home") : <Login />}</main>;
}
