"use client";

import { motion } from "framer-motion";
import { AnatomyBodyMap } from "@/components/AnatomyBodyMap";
import { memberData, statusStyles, type StatusColor } from "@/lib/data";

type VitaMapProps = {
  selectedOrgan: string | null;
  onSelect: (organ: string) => void;
  compact?: boolean;
};

type AttentionOrgan = {
  id: string;
  label: string;
  marker: string;
  status: StatusColor;
  callout: { x: string; y: string; align: "left" | "right" };
};

const attentionOrgans: AttentionOrgan[] = ([
  {
    id: "heart",
    label: "Heart",
    marker: "High cholesterol",
    status: memberData.organStatus.heart,
    callout: { x: "12%", y: "36%", align: "left" },
  },
  {
    id: "pancreas",
    label: "Pancreas",
    marker: "Blood sugar watch",
    status: memberData.organStatus.pancreas,
    callout: { x: "59%", y: "49%", align: "right" },
  },
  {
    id: "bones",
    label: "Bones",
    marker: "Low Vitamin D",
    status: memberData.organStatus.bones,
    callout: { x: "54%", y: "69%", align: "right" },
  },
] satisfies AttentionOrgan[]).filter((organ) => organ.status !== "green");

function statusFill(status: StatusColor) {
  return statusStyles[status].fill;
}

function isActive(id: string, selectedOrgan: string | null) {
  return selectedOrgan === id;
}

export function VitaMap({ selectedOrgan, onSelect, compact = false }: VitaMapProps) {
  const shellHeightClass = compact
    ? "min-h-[500px] sm:min-h-[540px]"
    : "min-h-[660px] sm:min-h-[700px] lg:min-h-[720px]";

  return (
    <section
      className={`premium-card relative overflow-hidden rounded-[28px] text-[#1D1D1F] ${shellHeightClass}`}
      aria-label="Organix body map"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(15,118,110,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(245,250,248,0.88)_100%)]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#30D158]/70 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-[185px] h-[330px] w-[330px] -translate-x-1/2 rounded-full bg-[#E6F7F0]/70 blur-3xl" />

      <div className="absolute left-4 top-4 z-20 sm:left-5 sm:top-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0F766E] sm:text-xs sm:tracking-[0.18em]">
          Organix body scan
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#101412] sm:text-3xl">
          Anatomy report map
        </h2>
        <p className="mt-2 max-w-[250px] text-xs leading-5 text-[#65716B] sm:max-w-[370px]">
          Healthy areas stay muted. Organs linked to risky markers glow from the report.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 z-10 flex items-start justify-center px-0 pb-[84px] pt-[156px] sm:items-end sm:px-8 sm:pb-16 sm:pt-24"
      >
        <AnatomySvg selectedOrgan={selectedOrgan} onSelect={onSelect} />
      </motion.div>

      {attentionOrgans.map((organ) => {
        const active = isActive(organ.id, selectedOrgan);
        return (
          <button
            key={organ.id}
            type="button"
            onClick={() => onSelect(organ.id)}
            className={`hologram-tag absolute z-30 ${active ? "hologram-tag-active" : ""}`}
            style={{
              left: organ.callout.x,
              top: organ.callout.y,
              ["--tag-color" as string]: statusFill(organ.status),
              transform: organ.callout.align === "right" ? "translateX(-8%)" : undefined,
            }}
            aria-label={`Open ${organ.label} report details`}
          >
            <span className="pulse-dot" />
            <span>{organ.marker}</span>
          </button>
        );
      })}

      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2 text-[11px] sm:bottom-5 sm:left-5 sm:right-5 sm:text-xs">
        {(["red", "yellow"] as StatusColor[]).map((status) => (
          <span key={status} className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[#1D1D1F] shadow-sm backdrop-blur">
            <span className="mr-2 inline-block size-2 rounded-full" style={{ background: statusFill(status) }} />
            {statusStyles[status].label}
          </span>
        ))}
        <span className="rounded-full border border-white/70 bg-white/72 px-3 py-1 text-[#65716B] shadow-sm backdrop-blur">
          Healthy organs muted
        </span>
      </div>
    </section>
  );
}

function AnatomySvg({ selectedOrgan, onSelect }: Pick<VitaMapProps, "selectedOrgan" | "onSelect">) {
  return (
    <AnatomyBodyMap
      selectedOrgan={selectedOrgan}
      onSelect={onSelect}
      imageClassName="opacity-68 grayscale contrast-95 saturate-0 drop-shadow-[0_24px_45px_rgba(15,23,42,0.12)]"
    />
  );
}
