import Bookings from "@/components/Bookings";
import userData from "@/utils/getUser";
import { redirect } from "next/navigation";

export default async function BookingsView() {
  const user = await userData();

  return <div>{user ? <Bookings /> : redirect("/", "replace")}</div>;
}
