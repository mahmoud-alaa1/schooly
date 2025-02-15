import Navbar from "@/components/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-10">
      <Navbar className="mb-4"/>
      <main>{children}</main>
    </div>
  );
}
