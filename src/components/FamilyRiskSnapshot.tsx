"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, CalendarClock, ListChecks, UsersRound } from "lucide-react";
import { familyRiskSnapshot, statusStyles, type StatusColor } from "@/lib/data";

export function FamilyRiskSnapshot() {
  const [compareMode, setCompareMode] = useState(false);

  return (
    <motion.section
      id="family-risk"
      className="apple-card rounded-xl p-5 sm:p-6"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#E6FFFB] text-[#0F766E]">
            <UsersRound size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0F766E]">Family risk snapshot</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[#1D1D1F]">
              One view for shared risks
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6E6E73]">
              Track who needs attention, who is due for testing, and which family patterns are emerging.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={() => setCompareMode((current) => !current)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#0F766E]/20 bg-[#E6FFFB] px-4 py-3 text-sm font-semibold text-[#0F766E] transition duration-200 hover:-translate-y-0.5 hover:bg-[#CCFBF1]"
            aria-pressed={compareMode}
          >
            <ArrowRightLeft size={17} />
            {compareMode ? "Show snapshot" : "Compare family"}
          </button>
          <button className="inline-flex items-center justify-center rounded-lg bg-[#0F766E] px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#115E59]">
            Add family member
          </button>
        </div>
      </div>

      {compareMode ? <FamilyComparisonCards /> : <FamilySnapshotCards />}
    </motion.section>
  );
}

function FamilySnapshotCards() {
  return (
    <div className="mt-5 grid gap-3 lg:grid-cols-3">
      {familyRiskSnapshot.map((person, index) => {
        const styles = statusStyles[person.color as StatusColor];
        return (
          <motion.article
            key={person.name}
            className="rounded-lg border border-[#E5E5EA] bg-white p-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-[#1D1D1F]">{person.name}</h3>
                <p className="mt-1 text-xs font-semibold text-[#86868B]">{person.relation}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.bg} ${styles.text}`}>
                {person.status}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <ScoreRing score={person.score} color={styles.fill} delay={index * 0.08 + 0.15} />
              <div>
                <p className="text-sm font-semibold text-[#1D1D1F]">Next test: {person.nextTest}</p>
                <p className="mt-1 text-xs font-semibold text-[#86868B]">{person.sharedRisk}</p>
              </div>
            </div>

            <p className="mt-4 rounded-lg bg-[#F2F2F7] p-3 text-sm leading-6 text-[#6E6E73]">
              Focus: {person.focus}
            </p>
          </motion.article>
        );
      })}
    </div>
  );
}

function ScoreRing({ score, color, delay }: { score: number; color: string; delay: number }) {
  const radius = 23;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      className="relative grid size-14 shrink-0 place-items-center"
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      aria-label={`VitaScore ${score} out of 100`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
        <circle cx="28" cy="28" r={radius} fill="none" stroke="#E5E5EA" strokeWidth="6" />
        <motion.circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: progressOffset }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.12, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </svg>
      <span className="relative text-lg font-semibold text-[#1D1D1F]">{score}</span>
    </motion.div>
  );
}

function FamilyComparisonCards() {
  const highestScore = Math.max(...familyRiskSnapshot.map((person) => person.score));

  return (
    <div className="mt-5">
      <div className="mb-3 flex flex-col gap-2 rounded-lg border border-[#E5E5EA] bg-[#F8FAFC] p-3 text-sm leading-6 text-[#6E6E73] sm:flex-row sm:items-center sm:justify-between">
        <span>Comparing score, attention areas, shared family risk, and next test timing.</span>
        <span className="font-semibold text-[#1D1D1F]">Best score: {highestScore}</span>
      </div>

      <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
        {familyRiskSnapshot.map((person, index) => {
          const styles = statusStyles[person.color as StatusColor];
          const scoreWidth = `${Math.max(18, person.score)}%`;

          return (
            <motion.article
              key={person.name}
              className="min-w-[280px] rounded-xl border border-[#E5E5EA] bg-white p-4 shadow-sm lg:min-w-0"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#86868B]">
                    {person.relation}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-[-0.01em] text-[#1D1D1F]">
                    {person.name}
                  </h3>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.bg} ${styles.text}`}>
                  {person.status}
                </span>
              </div>

              <div className="mt-5">
                <div className="flex items-end justify-between">
                  <p className="text-sm font-semibold text-[#1D1D1F]">VitaScore</p>
                  <p className="text-2xl font-semibold tracking-[-0.02em] text-[#1D1D1F]">
                    {person.score}
                  </p>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E5E5EA]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: scoreWidth, backgroundColor: styles.fill }}
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-3 text-sm">
                <ComparisonRow icon={<CalendarClock size={16} />} label="Last tested" value={person.lastTested} />
                <ComparisonRow icon={<CalendarClock size={16} />} label="Next test" value={person.nextTest} />
                <ComparisonRow icon={<UsersRound size={16} />} label="Shared risk" value={person.sharedRisk} />
              </div>

              <div className="mt-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1D1D1F]">
                  <ListChecks size={16} className="text-[#0F766E]" />
                  Flagged markers
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {person.flaggedMarkers.map((marker) => (
                    <span
                      key={marker}
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${styles.border} ${styles.bg} ${styles.text}`}
                    >
                      {marker}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-3 rounded-lg bg-[#F2F2F7] p-3 text-sm leading-6">
                <p className="text-[#1D1D1F]">
                  <span className="font-semibold">Strong area:</span> {person.strongestArea}
                </p>
                <p className="text-[#6E6E73]">
                  <span className="font-semibold text-[#1D1D1F]">Next action:</span> {person.action}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

function ComparisonRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 text-[#0F766E]">{icon}</span>
      <div>
        <p className="text-xs font-semibold text-[#86868B]">{label}</p>
        <p className="mt-0.5 font-semibold text-[#1D1D1F]">{value}</p>
      </div>
    </div>
  );
}
