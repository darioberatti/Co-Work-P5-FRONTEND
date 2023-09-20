import Link from "next/link";
import Login from "../components/Login";
import { Card } from "@radix-ui/themes";

export default function Home() {
  return (
    <main>
      
        <Login />
        <Link href="/register">
          <button>Register</button>
        </Link>
      
    </main>
  );
}
