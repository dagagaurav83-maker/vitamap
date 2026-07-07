"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Home,
  LineChart,
  Lightbulb,
  Share2,
  UserRound,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { BottomTabBar } from "@/components/BottomTabBar";
import { memberData } from "@/lib/data";

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

export function AppShell({ children }: { children: React.ReactNode }) {
  const activePath = normalizePath(usePathname());
  const isNavItemActive = (href: string) => activePath === href;

  return (
    <div className="soft-page-bg min-h-screen text-[#1D1D1F]">
      <aside className="no-print fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/70 bg-white/74 px-4 py-6 shadow-[16px_0_60px_rgba(15,23,42,0.05)] backdrop-blur-2xl md:flex md:flex-col">
        <BrandLogo className="mb-8" logoClassName="h-14 w-auto" stacked tagline="Preventive health" />

        <div className="mb-6 rounded-2xl border border-[#0F766E]/10 bg-gradient-to-br from-white to-[#F1FBF6] p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[#0F766E] text-sm font-bold text-white shadow-[0_12px_28px_rgba(15,118,110,0.22)]">
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
                    ? "bg-[#E8F8EF] text-[#0F766E] shadow-[inset_0_0_0_1px_rgba(15,118,110,0.12)]"
                    : "text-[#6E6E73] hover:bg-white/72 hover:text-[#1D1D1F]"
                }`}
              >
                {active && <span className="absolute left-0 top-2 h-6 w-[3px] rounded-full bg-[#30D158]" />}
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3">
          <div className="rounded-2xl border border-[#0F766E]/12 bg-white/82 p-4 shadow-sm">
            <p className="text-sm font-semibold text-[#1D1D1F]">Next test due: {memberData.nextTestDue}</p>
            <p className="mt-2 inline-flex rounded-full bg-[#E6FFFB] px-3 py-1 text-xs font-semibold text-[#0F766E]">
              {memberData.daysToNextTest} days left
            </p>
          </div>
          <div className="rounded-2xl border border-[#FF9F0A]/20 bg-[#FFFBEB]/90 p-4">
            <p className="text-sm font-semibold text-[#B45309]">
              Checked in {memberData.streak} months in a row
            </p>
          </div>
        </div>
      </aside>

      <main className="pb-28 md:ml-64 md:pb-0">{children}</main>

      <BottomTabBar />

      <button
        onClick={() => window.print()}
        className="flowing-green-cta no-print fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] md:flex"
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
