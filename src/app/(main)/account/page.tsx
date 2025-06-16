import Profile from "@/components/profile/Profile";
export default function page() {
  return (
    <main className="p-5">
      <div className="scrollbar-hide h-[calc(100dvh-118px)] overflow-auto">
        <Profile />
      </div>
    </main>
  );
}
