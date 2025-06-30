"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NavLink = ({
  children,
  href,
  activeClassName,
  nonActiveClassName,
  className,
  onClick,
  ...rest
}: {
  children: React.ReactNode;
  href: string;
  activeClassName?: string;
  nonActiveClassName?: string;
  className?: string;
  onClick?: () => void;
  rest?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname.endsWith(href) || (href.includes(pathname) && pathname !== "/");
  const newClassName = `${
    isActive ? activeClassName : nonActiveClassName
  } ${className} `;
  return (
    <Link href={href} className={newClassName} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
};
export default NavLink;
