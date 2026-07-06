"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  CalendarClock,
  Home,
  LineChart,
  Lightbulb,
  Share2,
  UserRound,
} from "lucide-react";
import { memberData } from "@/lib/data";

const navItems = [
  { label: "My VitaMap", href: "/dashboard", icon: Home },
  { label: "My Results", href: "/dashboard#markers", icon: Activity },
  { label: "Progress", href: "/progress", icon: LineChart },
  { label: "Recommendations", href: "/recommendations", icon: Lightbulb },
  { label: "Next Test", href: "/dashboard#next-test", icon: CalendarClock },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const syncHash = () => setCurrentHash(window.location.hash);

    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  const currentRoute = `${pathname}${currentHash}`;
  const isNavItemActive = (href: string) => {
    if (href.includes("#")) {
      return currentRoute === href;
    }

    return pathname === href && currentHash === "";
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1D1D1F]">
      <aside className="no-print fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-[#E8E8E8] bg-[#FAFAFA] px-4 py-6 md:flex md:flex-col">
        <Link href="/" className="mb-8 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#0F766E] text-lg font-bold text-white">
            V
          </div>
          <div>
            <p className="text-lg font-semibold text-[#1D1D1F]">VitaMap</p>
            <p className="text-xs text-[#86868B]">Preventive health</p>
          </div>
        </Link>

        <div className="mb-6 rounded-xl border border-[#E5E5EA] bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-[#E6FFFB] text-sm font-bold text-[#0F766E]">
              RS
            </div>
            <div>
              <p className="font-semibold">{memberData.member}</p>
              <p className="text-xs text-[#86868B]">Last tested {memberData.lastTested}</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = isNavItemActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition duration-200 ${
                  active
                    ? "bg-white text-[#0F766E]"
                    : "text-[#6E6E73] hover:bg-[#F0F0F0] hover:text-[#1D1D1F]"
                }`}
              >
                {active && <span className="absolute left-0 top-2 h-6 w-[3px] rounded-full bg-[#0F766E]" />}
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3">
          <div className="rounded-xl border border-[#0F766E]/15 bg-white p-4">
            <p className="text-sm font-semibold text-[#1D1D1F]">Next test due: {memberData.nextTestDue}</p>
            <p className="mt-2 inline-flex rounded-full bg-[#E6FFFB] px-3 py-1 text-xs font-semibold text-[#0F766E]">
              {memberData.daysToNextTest} days left
            </p>
          </div>
          <div className="rounded-xl border border-[#FF9F0A]/20 bg-[#FFFBEB] p-4">
            <p className="text-sm font-semibold text-[#B45309]">
              Checked in {memberData.streak} months in a row
            </p>
          </div>
        </div>
      </aside>

      <main className="pb-24 md:ml-60 md:pb-0">{children}</main>

      <nav className="no-print fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-[#E5E5EA] bg-white/95 px-2 py-2 shadow-lg backdrop-blur md:hidden">
        {navItems.slice(0, 5).map((item) => {
          const active = isNavItemActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex min-w-0 flex-col items-center gap-1 rounded-lg px-1 py-2 text-[10px] font-semibold transition duration-200 ${
                active ? "bg-[#E6FFFB] text-[#0F766E]" : "text-[#6E6E73]"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span className="max-w-full truncate">{item.label.replace("My ", "")}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => window.print()}
        className="no-print fixed bottom-24 right-5 z-40 hidden items-center gap-2 rounded-lg bg-[#0F766E] px-4 py-3 text-sm font-semibold text-white shadow-lg transition duration-200 hover:scale-[1.02] hover:bg-[#115E59] md:flex"
      >
        <Share2 size={17} />
        Share with doctor
      </button>

      <div className="hidden print:block p-8">
        <div className="flex items-center gap-3">
          <UserRound />
          <div>
            <h1 className="text-2xl font-bold">Doctor Summary</h1>
            <p className="text-slate-600">{memberData.member} - flagged markers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
