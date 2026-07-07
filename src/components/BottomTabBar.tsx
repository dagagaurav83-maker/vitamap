"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Home, LineChart, Lightbulb } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/dashboard", icon: Activity },
  { label: "Progress", href: "/progress", icon: LineChart },
  { label: "Recommendation", href: "/recommendations", icon: Lightbulb },
];

function normalizePath(pathname: string) {
  const withoutBasePath = pathname.replace(/^\/vitamap(?=\/|$)/, "") || "/";
  return withoutBasePath.length > 1 ? withoutBasePath.replace(/\/$/, "") : withoutBasePath;
}

export function BottomTabBar() {
  const activePath = normalizePath(usePathname());

  return (
    <nav className="no-print fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-[#E5E5EA] bg-white/95 px-2 py-2 shadow-lg backdrop-blur md:hidden">
      {navItems.map((item) => {
        const active = activePath === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex min-w-0 flex-col items-center gap-1 rounded-lg px-1 py-2 text-[10px] font-semibold transition duration-200 ${
              active
                ? "bg-[#DCFCE7] text-[#15803D] shadow-[inset_0_0_0_1px_rgba(21,128,61,0.18)]"
                : "text-[#6E6E73]"
            }`}
          >
            <Icon size={20} strokeWidth={active ? 2.6 : 2} />
            <span className="max-w-full text-center leading-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
