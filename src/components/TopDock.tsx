"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const dockItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Progress", href: "/progress" },
  { label: "Recommendation", href: "/recommendations" },
];

function normalizePath(pathname: string) {
  const withoutBasePath = pathname.replace(/^\/vitamap(?=\/|$)/, "") || "/";
  return withoutBasePath.length > 1 ? withoutBasePath.replace(/\/$/, "") : withoutBasePath;
}

export function TopDock({ className = "" }: { className?: string }) {
  const activePath = normalizePath(usePathname());

  return (
    <nav
      aria-label="Primary sections"
      className={`no-print no-scrollbar mx-auto flex w-max max-w-[calc(100vw-24px)] items-center gap-0 overflow-x-auto rounded-full border border-white/80 bg-white/76 p-1.5 text-[13px] font-semibold text-[#58606B] shadow-[0_14px_38px_rgba(15,23,42,0.14)] backdrop-blur-2xl sm:gap-2 sm:p-2 sm:text-base ${className}`}
    >
      {dockItems.map((item) => {
        const active = activePath === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap rounded-full px-3 py-2.5 transition duration-200 sm:px-6 ${
              active
                ? "bg-[#E8F8EF] text-[#0F766E] shadow-[inset_0_0_0_1px_rgba(15,118,110,0.12)]"
                : "hover:bg-white/80 hover:text-[#16181D]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
