import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";

export default async function Home() {
  return (
    <MaxWidthWrapper className="py-12">
      <Link href="/auth/login" className="text-4xl">
        Login
      </Link>
    </MaxWidthWrapper>
  );
}
