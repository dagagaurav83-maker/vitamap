"use client";

import { Share2, UserRound } from "lucide-react";
import { BottomTabBar } from "@/components/BottomTabBar";
import { AutoHideTopDock } from "@/components/TopDock";
import { memberData } from "@/lib/data";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="soft-page-bg min-h-screen text-[#1D1D1F]">
      <AutoHideTopDock />

      <main className="pb-28 pt-24 md:pb-0 md:pt-28">{children}</main>

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
