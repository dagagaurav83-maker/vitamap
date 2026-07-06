"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { memberData, organIcons, organLabels, statusStyles } from "@/lib/data";

function getOrganStatus(id: string) {
  return memberData.organStatus[id] ?? "green";
}

export function OrganPanel({
  organ,
  onClose,
}: {
  organ: string;
  onClose: () => void;
}) {
  const status = getOrganStatus(organ);
  const marker = memberData.flaggedMarkers.find((item) => item.organ === organ);
  const styles = statusStyles[status];
  const Icon = organIcons[organ];

  return (
    <AnimatePresence>
      <motion.aside
        key={organ}
        initial={{ x: 420, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 420, opacity: 0 }}
        transition={{ duration: 0.36, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="no-print fixed inset-x-0 bottom-0 z-50 max-h-[88vh] overflow-y-auto rounded-t-2xl border-t border-[#E5E5EA] bg-white/95 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-6 md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-full md:max-w-[380px] md:rounded-none md:border-l md:border-t-0"
      >
        <div className="flex items-start justify-between gap-4">
          <div className={`flex size-14 items-center justify-center rounded-2xl ${styles.bg} ${styles.text}`}>
            <Icon size={28} />
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-[#E5E5EA] p-2 text-[#6E6E73] transition hover:bg-[#F2F2F7]"
            aria-label="Close organ panel"
          >
            <X size={18} />
          </button>
        </div>
        <p className={`mt-8 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles.bg} ${styles.text}`}>
          {styles.label}
        </p>
        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-[#1D1D1F]">
          {organLabels[organ]}
        </h3>
        <p className="mt-4 text-[15px] leading-7 text-[#6E6E73]">
          {marker?.plainText ?? "Everything linked to this area looks healthy in your latest test."}
        </p>
        <p className="mt-5 inline-flex rounded-lg bg-[#F2F2F7] px-3 py-2 font-mono text-xs text-[#6E6E73]">
          {marker ? `${marker.name}: ${marker.value}` : "No flagged marker"}
        </p>
        <button className="magnetic mt-7 w-full rounded-lg bg-[#0F766E] px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-[#115E59]">
          Track this marker
        </button>
      </motion.aside>
    </AnimatePresence>
  );
}
