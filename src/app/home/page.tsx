import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SignoutButton from "@/components/SignoutButton";
export default async function Page() {
  return (
    <MaxWidthWrapper className="py-12">
      <SignoutButton />
    </MaxWidthWrapper>
  );
}
