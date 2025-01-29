import LoginForm from "@/components/LoginForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect("/"); // Redirect to home if signed in
  } else return <LoginForm />;
}
