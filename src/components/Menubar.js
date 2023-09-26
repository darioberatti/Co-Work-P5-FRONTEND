"use client";
import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axiosConfig";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/redux/user";

export default function Menu() {
  const user = useSelector((state) => state.user.value);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(
        "/user/logout",
        {},
        { withCredentials: true }
      );
      dispatch(logoutUser());
      alert("Se ha cerrado la sesión");
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {user.userId ? (
        <Menubar.Root className="MenubarRoot">
          <Link href={"/home"}>
            <Menubar.Menu>
              <Menubar.Trigger className="MenubarTrigger">Home</Menubar.Trigger>
            </Menubar.Menu>
          </Link>
          <Link href={"/register"}>
            <Menubar.Menu>
              <Menubar.Trigger className="MenubarTrigger">
                Register
              </Menubar.Trigger>
            </Menubar.Menu>
          </Link>
          <Link href={"/users"}>
            <Menubar.Menu>
              <Menubar.Trigger className="MenubarTrigger">
                Users
              </Menubar.Trigger>
            </Menubar.Menu>
          </Link>
          <Link href={"/offices"}>
            <Menubar.Menu>
              <Menubar.Trigger className="MenubarTrigger">
                Offices
              </Menubar.Trigger>
            </Menubar.Menu>
          </Link>

          <Menubar.Menu>
            <Menubar.Trigger className="MenubarTrigger" onClick={handleLogout}>
              LogOut
            </Menubar.Trigger>
          </Menubar.Menu>
        </Menubar.Root>
      ) : (
        ""
      )}
    </>
  );
}
