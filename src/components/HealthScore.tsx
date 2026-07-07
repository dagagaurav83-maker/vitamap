"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/components/motion-utils";

export function HealthScore({ score }: { score: number }) {
  const radius = 76;
  const circumference = 2 * Math.PI * radius;
  const { ref, value } = useCountUp(score, 1500);

  return (
    <div className="print-card apple-card rounded-xl p-5">
      <h2 className="text-lg font-semibold tracking-[-0.01em] text-[#1D1D1F]">My Health Score</h2>
      <div className="relative mt-5 grid h-56 place-items-center">
        <svg width="190" height="190" viewBox="0 0 190 190" className="-rotate-90">
          <circle cx="95" cy="95" r={radius} fill="none" stroke="#E5E5EA" strokeWidth="16" />
          <motion.circle
            cx="95"
            cy="95"
            r={radius}
            fill="none"
            stroke="#0F766E"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference - (score / 100) * circumference }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </svg>
        <div className="absolute text-center">
          <span ref={ref} className="block text-5xl font-semibold tracking-[-0.03em] text-[#1D1D1F]">
            {value || score}
          </span>
          <p className="mt-1 text-sm font-semibold text-[#6E6E73]">Your Organix Score</p>
        </div>
      </div>
      <p className="rounded-lg bg-[#F2F2F7] p-3 text-center text-sm text-[#6E6E73]">
        3 things need attention. 7 markers look great.
      </p>
    </div>
  );
}
