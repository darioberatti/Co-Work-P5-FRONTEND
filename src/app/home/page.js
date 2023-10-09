import HomeView from "@/components/HomeView";
import userData from "@/utils/getUser";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await userData();

  return <div>{user ? <HomeView /> : redirect("/", "replace")}</div>;
}
