import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SignoutButton from "@/components/SignoutButton";
import UpcomingLessons from "@/components/UpcomingLessons";
export default async function Page() {
  return (
    <MaxWidthWrapper className="py-12">
      <SignoutButton />
      <UpcomingLessons />
    </MaxWidthWrapper>
  );
}
