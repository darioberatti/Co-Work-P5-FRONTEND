"use client";
import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axiosConfig";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/redux/user";
import { toast } from "sonner";
import Image from "next/image";
import LogoP5Desktop from "../../public/LogoP5Desktop.svg";
import LogoP5Mobile from "../../public/LogoP5Mobile.svg";
import logout from "../../public/logout.png";

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
      toast.success("Se ha cerrado la sesión", {className:"alerts"});

      router.push("/");
    } catch (error) {
      toast.error(error.response.data, {className:"alerts"});
    }
  };

  return (
    <>
      {/* all users access */}
      {user.userId ? (
        <Menubar.Root className="MenubarRoot" style={{ marginBottom: "10px" }}>
          <Menubar.Menu>
            <Menubar.Trigger>
              <Link
                className="MenubarTrigger"
                href={"/home"}
                style={{
                  display: "flex",
                  textDecoration: "none",
                  marginRight: "5px",
                }}
              >
                <Image
                  src={LogoP5Mobile}
                  alt="P5 Header"
                  width={30}
                  height={30}
                />
              </Link>
            </Menubar.Trigger>
          </Menubar.Menu>

          {/* staff & admin access Users & Register */}
          {user.role === "admin" || user.role === "staff" ? (
            <>
              <Link href={"/register"} style={{ textDecoration: "none" }}>
                <Menubar.Menu>
                  <Menubar.Trigger className="MenubarTrigger">
                    REGISTRAR
                  </Menubar.Trigger>
                </Menubar.Menu>
              </Link>
              <Link href={"/users"} style={{ textDecoration: "none" }}>
                <Menubar.Menu>
                  <Menubar.Trigger className="MenubarTrigger">
                    USUARIOS
                  </Menubar.Trigger>
                </Menubar.Menu>
              </Link>
            </>
          ) : null}

          <Link href={"/offices"} style={{ textDecoration: "none" }}>
            <Menubar.Menu>
              <Menubar.Trigger className="MenubarTrigger">
                OFICINAS
              </Menubar.Trigger>
            </Menubar.Menu>
          </Link>

          {/* all users access */}
          <Menubar.Menu>
            <Menubar.Trigger className="MenubarTrigger" onClick={handleLogout}>
              <Image src={logout} alt="Logout" width={25} height={25} />
            </Menubar.Trigger>
          </Menubar.Menu>
        </Menubar.Root>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            height: "50px",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <Image src={LogoP5Desktop} alt="P5 Header" width={200} height={50} />
        </div>
      )}
    </>
  );
}
