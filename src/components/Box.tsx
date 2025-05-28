export function Box({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border-2 bg-white ${className}`}>
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
      className={`flex justify-between border-b px-5 py-2.5 font-medium ${className}`}
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
