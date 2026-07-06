"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { HabitImpactForecast } from "@/components/HabitImpactForecast";
import { SupplementMedicationTracker } from "@/components/SupplementMedicationTracker";
import { WeeklyCarePlanReview } from "@/components/WeeklyCarePlanReview";
import { recommendationCards, statusStyles } from "@/lib/data";

export default function RecommendationsPage() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState(false);

  function toggleHabit(key: string) {
    setDone((prev) => ({ ...prev, [key]: !prev[key] }));
    setToast(true);
    window.setTimeout(() => setToast(false), 3000);
  }

  return (
    <AppShell>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-semibold text-[#0F766E]">Recommendations</p>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[#1D1D1F]">
            Fix what is flagged
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6E6E73]">
            Simple lifestyle nudges tied directly to Rahul&apos;s latest test results.
          </p>
        </motion.div>

        <div className="mt-8">
          <WeeklyCarePlanReview />
        </div>

        <div className="mt-8">
          <HabitImpactForecast />
        </div>

        <div className="mt-8">
          <SupplementMedicationTracker />
        </div>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {recommendationCards.map((card, index) => {
            const styles = statusStyles[card.color as "red" | "yellow"];
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                className="apple-card rounded-xl border-l-4 p-5"
                style={{ borderLeftColor: styles.fill }}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
              >
                <Icon size={34} className={styles.text} />
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-[#1D1D1F]">
                  {card.title}
                </h2>
                <div className="mt-5 space-y-3">
                  {card.actions.map((action) => {
                    const key = `${card.title}-${action}`;
                    return (
                      <label
                        key={action}
                        className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#E5E5EA] p-3 text-sm text-[#6E6E73] transition duration-200 hover:-translate-y-0.5 hover:bg-[#F9FAFB]"
                      >
                        <input
                          type="checkbox"
                          checked={!!done[key]}
                          onChange={() => toggleHabit(key)}
                          className="mt-1 accent-[#0F766E]"
                        />
                        <span className={done[key] ? "text-[#86868B] line-through" : ""}>
                          {action}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <p className="mt-5 rounded-lg bg-[#F2F2F7] p-3 text-sm font-semibold text-[#6E6E73]">
                  {card.retest}
                </p>
              </motion.article>
            );
          })}
        </section>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-6 right-6 z-[60] rounded-xl bg-[#1D1D1F] px-4 py-3 text-sm font-semibold text-white shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
          >
            Added to your daily habits
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
