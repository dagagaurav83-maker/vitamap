"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Pill, ShieldCheck } from "lucide-react";
import { supplementMedicationPlan, statusStyles, type StatusColor } from "@/lib/data";

const STORAGE_KEY = "vitamap-care-plan-checkins";

type SavedCheckins = Record<string, boolean>;

export function SupplementMedicationTracker({ compact = false }: { compact?: boolean }) {
  const [checked, setChecked] = useState<SavedCheckins>({});

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved) as SavedCheckins);
    } catch {
      setChecked({});
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // localStorage can be unavailable in private browser modes.
    }
  }, [checked]);

  const checkinCount = useMemo(
    () => supplementMedicationPlan.filter((item) => checked[item.id]).length,
    [checked],
  );

  return (
    <motion.section
      className="print-card apple-card rounded-xl p-5 sm:p-6"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.42 }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#0F766E]">Supplement and medication tracker</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[#1D1D1F]">
            Track care plans tied to markers
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6E6E73]">
            Keep doctor-approved supplements, medicines, and care habits connected to the
            blood markers they are meant to improve.
          </p>
        </div>
        <div className="rounded-lg border border-[#E5E5EA] bg-[#F9FAFB] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#86868B]">Today</p>
          <p className="mt-1 text-sm font-semibold text-[#1D1D1F]">
            {checkinCount}/{supplementMedicationPlan.length} checked in
          </p>
        </div>
      </div>

      <div className={`mt-5 grid gap-4 ${compact ? "lg:grid-cols-3" : "xl:grid-cols-3"}`}>
        {supplementMedicationPlan.map((item, index) => {
          const styles = statusStyles[item.color as StatusColor];
          const isChecked = !!checked[item.id];

          return (
            <motion.article
              key={item.id}
              className={`rounded-lg border p-4 ${styles.border} ${isChecked ? "bg-[#F0FFF4]" : "bg-white"}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.32 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex size-10 items-center justify-center rounded-lg ${styles.bg} ${styles.text}`}>
                    <Pill size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#86868B]">{item.type}</p>
                    <h3 className="text-lg font-semibold text-[#1D1D1F]">{item.name}</h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setChecked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                  className={`no-print inline-flex size-10 items-center justify-center rounded-lg border transition ${
                    isChecked
                      ? "border-[#30D158]/40 bg-[#F0FFF4] text-[#15803D]"
                      : "border-[#D1D1D6] bg-white text-[#6E6E73] hover:border-[#0F766E] hover:text-[#0F766E]"
                  }`}
                  aria-label={`Toggle ${item.name} check-in`}
                >
                  <CheckCircle2 size={19} />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm leading-6 text-[#6E6E73]">
                <Info icon={ShieldCheck} label="Tied to" value={item.tiedTo} />
                <Info icon={CalendarDays} label="Started" value={item.startDate} />
                <p className="rounded-lg bg-[#F2F2F7] p-3">{item.doseNote}</p>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-semibold text-[#6E6E73]">
                  <span>Adherence</span>
                  <span>{isChecked ? Math.min(item.adherence + 4, 100) : item.adherence}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-[#E5E5EA]">
                  <div
                    className="h-full rounded-full bg-[#0F766E]"
                    style={{ width: `${isChecked ? Math.min(item.adherence + 4, 100) : item.adherence}%` }}
                  />
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#1D1D1F]">{item.retestImpact}</p>
              {!compact && (
                <p className="mt-3 rounded-lg border border-[#E5E5EA] bg-[#FAFAFA] p-3 text-xs leading-5 text-[#6E6E73]">
                  Doctor note: {item.doctorNote}
                </p>
              )}
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 text-[#0F766E]" size={16} />
      <p>
        <span className="font-semibold text-[#1D1D1F]">{label}: </span>
        {value}
      </p>
    </div>
  );
}
