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
    <nav className="no-print fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 rounded-2xl border border-white/70 bg-white/88 p-1.5 shadow-[0_18px_55px_rgba(15,23,42,0.16)] backdrop-blur-xl md:hidden">
      {navItems.map((item) => {
        const active = activePath === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex min-w-0 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-semibold transition duration-200 ${
              active
                ? "flowing-green-cta text-white shadow-[0_12px_28px_rgba(15,118,110,0.24)]"
                : "text-[#6E6E73] hover:bg-[#F3F7F5] hover:text-[#1D1D1F]"
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
