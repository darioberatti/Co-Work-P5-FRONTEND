"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "@/redux/user";
import axiosInstance from "../../../axiosConfig";
import { useRouter, usePathname } from "next/navigation";
import { fetchUser } from "@/utils/fetchUser";

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  

  return <div>Vista Home Usuarios</div>;
}
