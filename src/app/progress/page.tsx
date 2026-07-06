"use client";

import dynamic from "next/dynamic";
import { AppShell } from "@/components/AppShell";
import { DoctorReviewPack } from "@/components/DoctorReviewPack";
import { HabitImpactForecast } from "@/components/HabitImpactForecast";
import { SupplementMedicationTracker } from "@/components/SupplementMedicationTracker";
import { WeeklyCarePlanReview } from "@/components/WeeklyCarePlanReview";
import { progressData } from "@/lib/data";

const ProgressChartCard = dynamic(
  () => import("@/components/ProgressChartCard").then((mod) => mod.ProgressChartCard),
  {
    ssr: false,
    loading: () => <ProgressChartSkeleton />,
  },
);

export default function ProgressPage() {
  return (
    <AppShell>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-teal-700">Progress tracking</p>
          <h1 className="text-3xl font-bold text-slate-950">Your marker trends</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Compare each test against the last one and see whether the most important
            markers are improving, stable, or declining.
          </p>
        </div>

        <div className="mt-8">
          <HabitImpactForecast />
        </div>

        <div className="mt-8">
          <WeeklyCarePlanReview compact />
        </div>

        <div className="mt-8">
          <SupplementMedicationTracker compact />
        </div>

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
          {["June 2026", "Dec 2026", "Jun 2027"].map((date, index) => (
            <div
              key={date}
              className={`min-w-[180px] rounded-xl border p-4 shadow-sm ${
                index === 0 ? "border-teal-200 bg-teal-50" : "border-slate-200 bg-white"
              }`}
            >
              <p className="font-bold text-slate-950">{date}</p>
              <p className="mt-1 text-xs text-slate-500">
                {index === 0 ? "Completed test" : "Projected retest"}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {progressData.map((chart) => (
            <ProgressChartCard key={chart.marker} chart={chart} />
          ))}
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-slate-950">What changed since your last test?</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              "Vitamin D is moving up, but still needs steady sunlight and supplementation.",
              "LDL cholesterol has drifted higher, so your heart plan needs priority this month.",
              "Blood sugar is still borderline. A short walk after meals can make a visible dent by the next test.",
            ].map((insight) => (
              <article key={insight} className="rounded-xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600 shadow-sm">
                {insight}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <DoctorReviewPack compact />
        </section>
      </div>
    </AppShell>
  );
}

function ProgressChartSkeleton() {
  return (
    <article className="print-card rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="h-5 w-36 rounded skeleton" />
      <div className="mt-2 h-4 w-24 rounded skeleton" />
      <div className="mt-5 h-56 rounded-lg skeleton" />
      <div className="mt-4 h-12 rounded-lg skeleton" />
    </article>
  );
}
