import OfficesList from "@/components/OfficesList";
import userData from "@/utils/getUser";
import { redirect } from "next/navigation";

export default async function OfficesView() {
  const user = await userData();

  return <div>{user ? <OfficesList /> : redirect("/", "replace")}</div>;
}
