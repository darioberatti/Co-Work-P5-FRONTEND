"use client";
import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import Link from "next/link";

export default function Menu() {
  return (
    <Menubar.Root className="MenubarRoot">
      <Link href={"/"}>
        <Menubar.Menu>
          <Menubar.Trigger className="MenubarTrigger">Home</Menubar.Trigger>
        </Menubar.Menu>
      </Link>
      <Link href={"/register"}>
        <Menubar.Menu>
          <Menubar.Trigger className="MenubarTrigger">Register</Menubar.Trigger>
        </Menubar.Menu>
      </Link>
      <Link href={"/users"}>
        <Menubar.Menu>
          <Menubar.Trigger className="MenubarTrigger">Users</Menubar.Trigger>
        </Menubar.Menu>
      </Link>
      <Link href={"/offices"}>
        <Menubar.Menu>
          <Menubar.Trigger className="MenubarTrigger">Offices</Menubar.Trigger>
        </Menubar.Menu>
      </Link>
    </Menubar.Root>
  );
}
