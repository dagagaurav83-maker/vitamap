"use client";

import { motion } from "framer-motion";
import { ClipboardList, FileText, Pill, Printer } from "lucide-react";
import {
  doctorReviewPack,
  memberData,
  statusStyles,
  supplementMedicationPlan,
  type StatusColor,
} from "@/lib/data";

export function DoctorReviewPack({ compact = false }: { compact?: boolean }) {
  return (
    <motion.section
      id="doctor-review"
      className="print-card premium-card rounded-[28px] p-5 sm:p-6"
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E]">Doctor review pack</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[#101412]">
            Take this to your next visit
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#65716B]">
            A plain-English summary of what changed, what to ask, and what goal to
            track before {memberData.nextTestDue}.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="no-print inline-flex items-center justify-center gap-2 rounded-xl border border-[#0F766E]/12 bg-white/82 px-4 py-3 text-sm font-semibold text-[#101412] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white"
        >
          <Printer size={17} />
          Print pack
        </button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-2xl bg-[#F3F7F5] p-4">
          <div className="flex items-start gap-3">
            <FileText className="mt-0.5 text-[#0F766E]" size={20} />
            <div>
              <p className="text-sm font-semibold text-[#1D1D1F]">Visit focus</p>
              <p className="mt-1 text-sm leading-6 text-[#6E6E73]">{doctorReviewPack.summary}</p>
            </div>
          </div>
          {!compact && (
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
              <Info label="Member" value={memberData.member} />
              <Info label="Last test" value={memberData.lastTested} />
              <Info label="Lab" value={memberData.labPartner} />
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-[#0F766E]/10 bg-white/78 p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <ClipboardList className="mt-0.5 text-[#0F766E]" size={20} />
            <div>
              <p className="text-sm font-semibold text-[#1D1D1F]">Member note</p>
              <p className="mt-1 text-sm leading-6 text-[#6E6E73]">{doctorReviewPack.memberNote}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {doctorReviewPack.markers.map((item, index) => {
          const styles = statusStyles[item.color as StatusColor];
          return (
            <motion.article
              key={item.marker}
              className={`rounded-2xl border p-4 ${styles.border} ${styles.bg}`}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-[#1D1D1F]">{item.marker}</h3>
                  <p className="mt-1 text-xs font-semibold text-[#6E6E73]">{item.current}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.text} bg-white/70`}>
                  {item.trend}
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold text-[#1D1D1F]">{item.goal}</p>
              <p className="mt-3 text-sm leading-6 text-[#6E6E73]">{item.ask}</p>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-[#0F766E]/10 bg-white/82 p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <Pill className="mt-0.5 text-[#0F766E]" size={20} />
          <div>
            <p className="text-sm font-semibold text-[#1D1D1F]">Care plan to review</p>
            <p className="mt-1 text-sm leading-6 text-[#6E6E73]">
              Supplements, medicines, or care habits Rahul is tracking before the next retest.
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {supplementMedicationPlan.map((item) => {
            const styles = statusStyles[item.color as StatusColor];
            return (
              <article key={item.id} className={`rounded-2xl border p-3 ${styles.border} ${styles.bg}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#1D1D1F]">{item.name}</p>
                    <p className="mt-1 text-xs font-semibold text-[#6E6E73]">{item.tiedTo}</p>
                  </div>
                  <span className={`rounded-full bg-white/75 px-2.5 py-1 text-xs font-semibold ${styles.text}`}>
                    {item.adherence}%
                  </span>
                </div>
                <p className="mt-3 text-xs leading-5 text-[#6E6E73]">{item.doctorNote}</p>
              </article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#86868B]">{label}</p>
      <p className="mt-1 font-semibold text-[#1D1D1F]">{value}</p>
    </div>
  );
}
