"use client";

import NewOffice from "@/components/NewOffice";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function NewOfficeView() {
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  if (user.role !== "admin") {
    router.push("/home");
  }

  return (
    <div>
      <NewOffice />
    </div>
  );
}
