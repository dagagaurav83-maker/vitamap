"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/components/motion-utils";

export function HealthScore({ score }: { score: number }) {
  const radius = 76;
  const circumference = 2 * Math.PI * radius;
  const { ref, value } = useCountUp(score, 1500);
  const flagged = 3;
  const healthy = 7;

  return (
    <div className="print-card premium-card rounded-[28px] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E]">Today</p>
          <h2 className="mt-1 text-xl font-semibold tracking-[-0.01em] text-[#101412]">Health score</h2>
        </div>
        <span className="rounded-full bg-[#FFF1F0] px-3 py-1 text-xs font-semibold text-[#C92A22]">
          Needs work
        </span>
      </div>
      <div className="relative mt-5 grid h-56 place-items-center">
        <svg width="190" height="190" viewBox="0 0 190 190" className="-rotate-90">
          <circle cx="95" cy="95" r={radius} fill="none" stroke="#E5EEE9" strokeWidth="16" />
          <motion.circle
            cx="95"
            cy="95"
            r={radius}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference - (score / 100) * circumference }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="190" y2="190">
              <stop offset="0%" stopColor="#FF3B30" />
              <stop offset="52%" stopColor="#FF9F0A" />
              <stop offset="100%" stopColor="#30D158" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute text-center">
          <span ref={ref} className="block text-6xl font-semibold tracking-[-0.04em] text-[#101412]">
            {value || score}
          </span>
          <p className="mt-1 text-sm font-semibold text-[#65716B]">Organix index</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-[#FFF1F0] p-3">
          <p className="text-2xl font-semibold text-[#C92A22]">{flagged}</p>
          <p className="text-xs font-semibold text-[#9A3412]">focus areas</p>
        </div>
        <div className="rounded-2xl bg-[#F0FFF4] p-3">
          <p className="text-2xl font-semibold text-[#15803D]">{healthy}</p>
          <p className="text-xs font-semibold text-[#166534]">markers steady</p>
        </div>
      </div>
    </div>
  );
}
