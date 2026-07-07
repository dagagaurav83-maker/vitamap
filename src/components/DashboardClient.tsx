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
      <div className="px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <motion.div
          className="mb-6 flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E]">Member dashboard</p>
            <h1 className="mt-1 text-4xl font-semibold tracking-[-0.03em] text-[#101412] sm:text-5xl">
              My Organix
            </h1>
            <p className="mt-2 text-sm text-[#65716B]">
              Last full-body test: {memberData.lastTested} via {memberData.labPartner}
            </p>
          </div>
          <div id="next-test" className="premium-card w-full rounded-2xl p-4 sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-[#E8F8EF] text-[#0F766E]">
                <CalendarClock size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#101412]">Next test due: {memberData.nextTestDue}</p>
                <p className="text-xs text-[#65716B]">{memberData.daysToNextTest} days left</p>
              </div>
            </div>
          </div>
        </motion.div>

        {showFamilyBanner && (
          <motion.div
            className="no-print mb-6 flex flex-col gap-3 rounded-2xl border border-[#0F766E]/10 bg-[#F0FFF7]/82 p-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-sm font-semibold leading-6 text-[#1D1D1F]">
              Add a family member for Rs. 2,999/year - see their Organix map too.
            </p>
            <button
              onClick={() => setShowFamilyBanner(false)}
              className="self-start rounded-xl border border-[#0F766E]/10 bg-white/80 p-2 text-[#0F766E] transition hover:bg-white sm:self-auto"
              aria-label="Dismiss family add-on banner"
            >
              <X size={17} />
            </button>
          </motion.div>
        )}

        <section id="vitamap" className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
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
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#101412] sm:text-3xl">
                My 10 markers to track
              </h2>
              <p className="mt-1 text-sm text-[#65716B]">
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
