"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "@/redux/user";
import axiosInstance from "../../../axiosConfig";
import { useRouter, usePathname } from "next/navigation";

export default function Home() {
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  const pathname = usePathname();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axiosInstance.get("/user/me", {
          withCredentials: true,
        });
        dispatch(loginUser(user.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [pathname]);

  return <div>Vista Home Usuarios</div>;
}
