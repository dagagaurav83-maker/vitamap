"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarClock, X } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { DoctorReviewPack } from "@/components/DoctorReviewPack";
import { FamilyRiskSnapshot } from "@/components/FamilyRiskSnapshot";
import { HealthScore } from "@/components/HealthScore";
import { MarkerCard } from "@/components/MarkerCard";
import { OrganPanel } from "@/components/OrganPanel";
import { VitaMap } from "@/components/VitaMap";
import { WeeklyCarePlanReview } from "@/components/WeeklyCarePlanReview";
import { markerCards, memberData } from "@/lib/data";

export function DashboardClient() {
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
  const [showFamilyBanner, setShowFamilyBanner] = useState(true);

  return (
    <AppShell>
      <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <motion.div
          className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div>
            <p className="text-sm font-semibold text-[#0F766E]">Member dashboard</p>
            <h1 className="text-3xl font-semibold tracking-[-0.02em] text-[#1D1D1F] sm:text-4xl sm:tracking-[-0.03em]">My Organix</h1>
            <p className="mt-1 text-sm text-[#6E6E73]">
              Last full-body test: {memberData.lastTested}
            </p>
          </div>
          <div id="next-test" className="apple-card w-full rounded-xl p-4 sm:w-auto">
            <div className="flex items-center gap-3">
              <CalendarClock className="text-[#0F766E]" size={20} />
              <div>
                <p className="text-sm font-semibold text-[#1D1D1F]">Next test due: {memberData.nextTestDue}</p>
                <p className="text-xs text-[#86868B]">{memberData.daysToNextTest} days left</p>
              </div>
            </div>
          </div>
        </motion.div>

        {showFamilyBanner && (
          <motion.div
            className="no-print mb-6 flex flex-col gap-3 rounded-xl border border-[#0F766E]/15 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-sm font-semibold leading-6 text-[#1D1D1F]">
              Add a family member for Rs. 2,999/year - see their Organix map too.
            </p>
            <button
              onClick={() => setShowFamilyBanner(false)}
              className="self-start rounded-lg border border-[#E5E5EA] bg-white p-2 text-[#0F766E] transition hover:bg-[#F2F2F7] sm:self-auto"
              aria-label="Dismiss family add-on banner"
            >
              <X size={17} />
            </button>
          </motion.div>
        )}

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <VitaMap selectedOrgan={selectedOrgan} onSelect={setSelectedOrgan} />
          <HealthScore score={memberData.score} />
        </section>
        {selectedOrgan && <OrganPanel organ={selectedOrgan} onClose={() => setSelectedOrgan(null)} />}

        <section className="mt-6">
          <FamilyRiskSnapshot />
        </section>

        <section className="mt-6">
          <WeeklyCarePlanReview compact />
        </section>

        <section id="markers" className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.01em] text-[#1D1D1F] sm:text-2xl sm:tracking-[-0.02em]">
                My 10 markers to track
              </h2>
              <p className="mt-1 text-sm text-[#6E6E73]">
                Plain-language cards for the numbers that matter most.
              </p>
            </div>
          </div>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-3">
            {markerCards.map((marker) => (
              <MarkerCard key={marker.friendlyName} marker={marker} />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <DoctorReviewPack />
        </section>
      </div>
    </AppShell>
  );
}
