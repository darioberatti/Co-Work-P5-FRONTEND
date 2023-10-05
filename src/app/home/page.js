"use client";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "@/utils/fetchUser";
import HomeView from "@/components/HomeView";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  return (
    <div>
      <HomeView />
    </div>
  );
}
