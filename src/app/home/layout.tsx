import Navbar from "@/components/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-16">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
