"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { habitImpactForecasts, statusStyles, type StatusColor } from "@/lib/data";

export function HabitImpactForecast() {
  return (
    <motion.section
      id="habit-forecast"
      className="apple-card rounded-xl p-5 sm:p-6"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#E6FFFB] text-[#0F766E]">
          <TrendingUp size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#0F766E]">Habit impact forecast</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[#1D1D1F]">
            What your habits could move by the next test
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6E6E73]">
            These are estimates, not medical promises. The next blood test is the source of truth.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {habitImpactForecasts.map((forecast, index) => {
          const styles = statusStyles[forecast.color as StatusColor];
          return (
            <motion.article
              key={forecast.marker}
              className="rounded-lg border border-[#E5E5EA] bg-white p-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-[#1D1D1F]">{forecast.marker}</h3>
                  <p className="mt-1 text-xs font-semibold text-[#86868B]">Now: {forecast.current}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.bg} ${styles.text}`}>
                  {forecast.confidence}
                </span>
              </div>

              <div className="mt-4 rounded-lg bg-[#F2F2F7] p-3">
                <p className="text-sm font-semibold text-[#1D1D1F]">{forecast.estimate}</p>
                <p className="mt-1 text-xs font-semibold text-[#86868B]">{forecast.byWhen}</p>
              </div>

              <ul className="mt-4 space-y-2 text-sm leading-6 text-[#6E6E73]">
                {forecast.actions.map((action) => (
                  <li key={action} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: styles.fill }} />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-semibold leading-5 text-[#86868B]">{forecast.note}</p>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}
