"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import anatomyReportMap from "../../public/images/anatomy-report-map-v1.png";
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
    ? "min-h-[470px] sm:min-h-[520px]"
    : "min-h-[640px] sm:min-h-[680px] lg:min-h-[720px]";

  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-[#E5E5EA] bg-white text-[#1D1D1F] shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[20px] ${shellHeightClass}`}
      aria-label="VitaMap body map"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#FF3B30] via-[#FF9F0A] to-[#30D158]" />

      <div className="absolute left-4 top-4 z-20 sm:left-5 sm:top-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0F766E] sm:text-xs sm:tracking-[0.18em]">
          VitaMap body scan
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#1D1D1F] sm:text-2xl">
          Anatomy report map
        </h2>
        <p className="mt-1 max-w-[240px] text-xs leading-5 text-[#6E6E73] sm:max-w-[360px]">
          Full-body organ map. Healthy areas stay soft; only organs that need attention are highlighted.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 z-10 flex items-start justify-center px-0 pb-[72px] pt-[148px] sm:items-end sm:px-8 sm:pb-16 sm:pt-24"
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
          <span key={status} className="rounded-full border border-[#E5E5EA] bg-white/90 px-3 py-1 text-[#1D1D1F] shadow-sm">
            <span className="mr-2 inline-block size-2 rounded-full" style={{ background: statusFill(status) }} />
            {statusStyles[status].label}
          </span>
        ))}
        <span className="rounded-full border border-[#E5E5EA] bg-white/90 px-3 py-1 text-[#6E6E73] shadow-sm">
          Healthy organs muted
        </span>
      </div>
    </section>
  );
}

function AnatomySvg({ selectedOrgan, onSelect }: Pick<VitaMapProps, "selectedOrgan" | "onSelect">) {
  const hotspots = [
    { id: "bones", label: "Bones", className: "left-[13%] top-[3%] h-[92%] w-[74%]" },
    { id: "heart", label: "Heart", className: "left-[43%] top-[27%] h-[10%] w-[16%]" },
    { id: "pancreas", label: "Pancreas", className: "left-[36%] top-[38%] h-[8%] w-[28%]" },
  ];

  return (
    <div className="relative h-auto w-[258px] max-w-full sm:h-full sm:max-h-[650px] sm:w-full sm:max-w-[380px]">
      <Image
        src={anatomyReportMap}
        alt="Front-view anatomy body scan with red cardiovascular and bone highlights, amber pancreas highlight, and muted healthy organs"
        priority
        sizes="(max-width: 640px) 258px, 380px"
        className="h-auto w-full select-none object-contain drop-shadow-[0_18px_35px_rgba(15,23,42,0.08)]"
      />
      {hotspots.map((hotspot) => (
        <button
          key={hotspot.id}
          type="button"
          onClick={() => onSelect(hotspot.id)}
          className={`absolute rounded-full transition ${
            selectedOrgan === hotspot.id ? "ring-2 ring-white/80 ring-offset-2 ring-offset-transparent" : ""
          } ${hotspot.className}`}
          aria-label={`Open ${hotspot.label} details`}
        />
      ))}
    </div>
  );
}
