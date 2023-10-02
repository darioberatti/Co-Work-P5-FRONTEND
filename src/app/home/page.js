"use client";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "@/hooks/fetchUser";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  return (
    <div
      style={{
        fontFamily: "monserrat, sans-serif",
        fontWeight: "400",
        fontSize: "1.5rem",
      }}
    >
      Vista Home Usuarios
    </div>
  );
}
