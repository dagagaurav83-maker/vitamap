"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Goal, HelpCircle, LineChart, MapPin, X } from "lucide-react";
import { statusStyles } from "@/lib/data";

type Marker = {
  friendlyName: string;
  name?: string;
  value: string;
  status: string;
  organ?: string;
  linkedOrgan?: string;
  pastValues?: string[];
  plainText: string;
  goal?: string;
  nextAction?: string;
  explain: string[];
};

export function MarkerCard({ marker }: { marker: Marker }) {
  const [open, setOpen] = useState(false);
  const color = marker.status === "good" ? "green" : marker.status === "borderline" ? "yellow" : "red";
  const styles = statusStyles[color];
  const percent = marker.status === "good" ? 78 : marker.status === "borderline" ? 58 : 82;

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`print-card apple-card min-w-[240px] rounded-xl p-4 ${styles.border}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-950">{marker.friendlyName}</h3>
            <p className="mt-1 text-xs text-slate-500">{marker.value}</p>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${styles.bg} ${styles.text}`}>
            {marker.status === "high"
              ? "High"
              : marker.status === "low"
                ? "Low"
                : marker.status === "good"
                  ? "Good"
                  : "Watch"}
          </span>
        </div>

        <div className="mt-5 h-16 overflow-hidden">
          <div className="relative mx-auto size-28 rounded-full border-[12px] border-slate-100">
            <motion.div
              className="absolute inset-[-12px] rounded-full border-[12px] border-transparent"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                borderTopColor: styles.fill,
                borderRightColor: percent > 50 ? styles.fill : "transparent",
                transform: "rotate(225deg)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-700">
              {percent}
            </div>
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">{marker.plainText}</p>
        <button
          onClick={() => setOpen(true)}
          className="no-print mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900"
        >
          <HelpCircle size={16} />
          Explain this to me
        </button>
      </motion.article>

      <AnimatePresence>
        {open && (
          <motion.div
            className="no-print fixed inset-0 z-50 bg-[#1D1D1F]/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute inset-0 cursor-default"
              onClick={() => setOpen(false)}
              aria-label="Close marker drawer"
            />
            <motion.aside
              className="absolute bottom-0 right-0 top-auto max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl sm:bottom-auto sm:left-auto sm:top-0 sm:h-full sm:max-h-none sm:max-w-[440px] sm:rounded-l-2xl sm:rounded-tr-none sm:p-6"
              initial={{ x: "100%", y: 24 }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: "100%", y: 24 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0F766E]">
                    Marker deep dive
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[#1D1D1F]">
                    {marker.friendlyName}
                  </h3>
                  <p className="mt-1 text-sm text-[#6E6E73]">{marker.name ?? marker.friendlyName}</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-[#E5E5EA] p-2 text-[#6E6E73] transition hover:bg-[#F2F2F7]"
                  aria-label="Close marker drawer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className={`mt-5 rounded-xl border p-4 ${styles.border} ${styles.bg}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-[#6E6E73]">Current value</p>
                    <p className="mt-1 text-3xl font-semibold tracking-[-0.03em] text-[#1D1D1F]">
                      {marker.value}
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${styles.bg} ${styles.text}`}>
                    {marker.status === "high"
                      ? "High"
                      : marker.status === "low"
                        ? "Low"
                        : marker.status === "good"
                          ? "Good"
                          : "Watch"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#1D1D1F]">{marker.plainText}</p>
              </div>

              <div className="mt-5 grid gap-3">
                <DrawerRow
                  icon={<MapPin size={17} />}
                  label="Linked organ"
                  value={marker.linkedOrgan ?? marker.organ ?? "Whole body"}
                />
                <DrawerRow
                  icon={<Goal size={17} />}
                  label="Goal"
                  value={marker.goal ?? "Keep this marker in range at the next test"}
                />
                <DrawerRow
                  icon={<ArrowRight size={17} />}
                  label="Next action"
                  value={marker.nextAction ?? "Keep your current plan steady this week."}
                />
              </div>

              <div className="mt-6 rounded-xl border border-[#E5E5EA] p-4">
                <div className="flex items-center gap-2">
                  <LineChart size={18} className="text-[#0F766E]" />
                  <h4 className="font-semibold text-[#1D1D1F]">Past values</h4>
                </div>
                <div className="mt-4 space-y-3">
                  {(marker.pastValues ?? ["Jan 2026: In range", "Mar 2026: In range", "Jun 2026: In range"]).map(
                    (value, index, values) => (
                      <div key={value} className="flex items-center gap-3">
                        <div
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: index === values.length - 1 ? styles.fill : "#D1D5DB" }}
                        />
                        <p className="text-sm font-semibold text-[#1D1D1F]">{value}</p>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-[#1D1D1F]">What this means</h4>
                <ul className="mt-3 space-y-3 text-sm leading-6 text-[#6E6E73]">
                  {marker.explain.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#0F766E]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DrawerRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#E5E5EA] p-3">
      <span className="mt-0.5 text-[#0F766E]">{icon}</span>
      <div>
        <p className="text-xs font-semibold text-[#86868B]">{label}</p>
        <p className="mt-1 text-sm font-semibold leading-6 text-[#1D1D1F]">{value}</p>
      </div>
    </div>
  );
}
