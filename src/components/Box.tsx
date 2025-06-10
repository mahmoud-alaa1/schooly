import { HTMLAttributes } from "react";

export function Box({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border-2 bg-white ${className || ""}`}
      {...(props as any)}
    >
      {children}
    </div>
  );
}

export function BoxHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex justify-between rounded-[inherit] rounded-b-none border-b px-5 py-2.5 font-medium ${className}`}
    >
      {children}
    </div>
  );
}
export function BoxBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`px-5 py-2.5 ${className}`}>{children}</div>;
}
