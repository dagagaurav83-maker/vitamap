"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, ClipboardCheck, Target } from "lucide-react";
import { weeklyCarePlanReview } from "@/lib/data";

export function WeeklyCarePlanReview({ compact = false }: { compact?: boolean }) {
  const metrics = [
    { label: "Habit adherence", value: weeklyCarePlanReview.habitAdherence },
    { label: "Supplement adherence", value: weeklyCarePlanReview.supplementAdherence },
  ];

  return (
    <motion.section
      className="apple-card rounded-xl p-5 sm:p-6"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#E6FFFB] text-[#0F766E]">
            <ClipboardCheck size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0F766E]">Weekly care plan review</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[#1D1D1F]">
              What to focus on this week
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6E6E73]">
              Week of {weeklyCarePlanReview.weekOf}. {weeklyCarePlanReview.overall}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-[#F2F2F7] px-3 py-1.5 text-xs font-semibold text-[#6E6E73]">
          {weeklyCarePlanReview.nextCheckIn}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border border-[#E5E5EA] bg-white p-4">
            <div className="flex items-end justify-between gap-3">
              <p className="text-sm font-semibold text-[#1D1D1F]">{metric.label}</p>
              <p className="text-2xl font-semibold tracking-[-0.02em] text-[#1D1D1F]">
                {metric.value}%
              </p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E5E5EA]">
              <div
                className="h-full rounded-full bg-[#0F766E]"
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-5 grid gap-4 ${compact ? "lg:grid-cols-2" : "lg:grid-cols-[1fr_1fr_1.1fr]"}`}>
        <ReviewList
          icon={<AlertCircle size={18} />}
          title="Missed actions"
          items={weeklyCarePlanReview.missedActions}
          tone="red"
        />
        <ReviewList
          icon={<CheckCircle2 size={18} />}
          title="Wins"
          items={weeklyCarePlanReview.wins}
          tone="green"
        />
        <div className={`rounded-xl border border-[#0F766E]/20 bg-[#E6FFFB] p-4 ${compact ? "lg:col-span-2" : ""}`}>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#0F766E]">
            <Target size={18} />
            One priority
          </div>
          <p className="mt-3 text-sm font-semibold leading-6 text-[#1D1D1F]">
            {weeklyCarePlanReview.priority}
          </p>
        </div>
      </div>
    </motion.section>
  );
}

function ReviewList({
  icon,
  title,
  items,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  tone: "red" | "green";
}) {
  const toneClass = tone === "red" ? "text-[#C92A22] bg-[#FFF1F0]" : "text-[#15803D] bg-[#F0FFF4]";

  return (
    <div className="rounded-xl border border-[#E5E5EA] bg-white p-4">
      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${toneClass}`}>
        {icon}
        {title}
      </div>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-[#6E6E73]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#0F766E]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
