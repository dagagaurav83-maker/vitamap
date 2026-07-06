"use client";

import { motion } from "framer-motion";
import { memberData, statusStyles, type StatusColor } from "@/lib/data";

type VitaMapProps = {
  selectedOrgan: string | null;
  onSelect: (organ: string) => void;
  compact?: boolean;
};

type AnatomyOrgan = {
  id: string;
  label: string;
  marker?: string;
  status: StatusColor;
  callout?: { x: string; y: string; align: "left" | "right" };
};

const attentionOrgans: AnatomyOrgan[] = ([
  {
    id: "heart",
    label: "Heart",
    marker: "High cholesterol",
    status: memberData.organStatus.heart,
    callout: { x: "9%", y: "37%", align: "left" },
  },
  {
    id: "pancreas",
    label: "Pancreas",
    marker: "Blood sugar watch",
    status: memberData.organStatus.pancreas,
    callout: { x: "58%", y: "50%", align: "right" },
  },
  {
    id: "bones",
    label: "Bones",
    marker: "Low Vitamin D",
    status: memberData.organStatus.bones,
    callout: { x: "50%", y: "67%", align: "right" },
  },
] satisfies AnatomyOrgan[]).filter((organ) => organ.status !== "green");

function statusFill(status: StatusColor) {
  return statusStyles[status].fill;
}

function isActive(id: string, selectedOrgan: string | null) {
  return selectedOrgan === id;
}

export function VitaMap({ selectedOrgan, onSelect, compact = false }: VitaMapProps) {
  const shellHeightClass = compact
    ? "min-h-[420px] sm:min-h-[480px]"
    : "min-h-[560px] sm:min-h-[620px] lg:min-h-[680px]";

  return (
    <section
      className={`hologram-shell relative overflow-hidden rounded-2xl border border-cyan-300/10 bg-[#050A18] text-white sm:rounded-[20px] ${shellHeightClass}`}
      aria-label="VitaMap body map"
    >
      <div className="scan-line" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 hologram-floor" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(20,184,166,0.18),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0)_0%,rgba(2,6,23,0.42)_100%)]" />

      <div className="absolute left-4 top-4 z-20 sm:left-5 sm:top-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-200 sm:text-xs sm:tracking-[0.18em]">
          VitaMap body scan
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">Anatomy report map</h2>
        <p className="mt-1 max-w-[210px] text-xs leading-5 text-cyan-100/70 sm:max-w-none">
          Major internal organs shown in their natural body position. Only organs needing attention are highlighted.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 z-10 flex items-end justify-center px-2 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-24"
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
              left: organ.callout?.x,
              top: organ.callout?.y,
              ["--tag-color" as string]: statusFill(organ.status),
              transform: organ.callout?.align === "right" ? "translateX(-8%)" : undefined,
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
          <span key={status} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-slate-100 backdrop-blur">
            <span className="mr-2 inline-block size-2 rounded-full" style={{ background: statusFill(status) }} />
            {statusStyles[status].label}
          </span>
        ))}
        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-slate-100 backdrop-blur">
          <span className="mr-2 inline-block size-2 rounded-full bg-slate-300" />
          Normal organs muted
        </span>
      </div>
    </section>
  );
}

function AnatomySvg({ selectedOrgan, onSelect }: Pick<VitaMapProps, "selectedOrgan" | "onSelect">) {
  const heartStatus = memberData.organStatus.heart;
  const pancreasStatus = memberData.organStatus.pancreas;
  const bonesStatus = memberData.organStatus.bones;

  return (
    <svg
      viewBox="0 0 360 680"
      role="img"
      aria-label="Front-view human body anatomy map with heart, lungs, liver, stomach, pancreas, kidneys, intestines, bladder, spine, ribs, pelvis and leg bones"
      className="h-full max-h-[560px] w-full max-w-[430px] drop-shadow-[0_0_42px_rgba(34,211,238,0.16)]"
    >
      <defs>
        <filter id="redGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="yellowGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="bodyGlass" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#DFFBFF" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id="neutralOrgan" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.72" />
        </linearGradient>
      </defs>

      <g opacity="0.72">
        <path
          d="M180 22c31 0 53 24 53 55 0 29-21 54-53 54s-53-25-53-54c0-31 22-55 53-55Z"
          fill="url(#bodyGlass)"
          stroke="#A5F3FC"
          strokeOpacity="0.38"
          strokeWidth="2"
        />
        <path
          d="M129 132c-34 17-54 55-60 108L43 402c-3 18 9 34 27 37l6 1 35-176 20-62v124l-15 114-8 178c-1 22 14 39 34 39h2c17 0 31-13 33-31l19-162h8l19 162c2 18 16 31 33 31h2c20 0 35-17 34-39l-8-178-15-114V202l20 62 35 176 6-1c18-3 30-19 27-37l-26-162c-6-53-26-91-60-108-24-12-41-14-64-14h-48c-23 0-40 2-64 14Z"
          fill="url(#bodyGlass)"
          stroke="#A5F3FC"
          strokeOpacity="0.34"
          strokeWidth="2"
        />
      </g>

      <g opacity="0.48" stroke="#E0F2FE" strokeLinecap="round" strokeLinejoin="round">
        <path d="M180 128v470" strokeWidth="6" />
        <path d="M127 202c26 12 80 12 106 0" strokeWidth="4" fill="none" />
        <path d="M121 224c34 18 84 18 118 0" strokeWidth="4" fill="none" />
        <path d="M118 249c40 20 84 20 124 0" strokeWidth="4" fill="none" />
        <path d="M138 457c26 19 58 19 84 0" strokeWidth="7" fill="none" />
      </g>

      <AnatomyButton
        id="brain"
        label="Brain"
        selected={selectedOrgan === "brain"}
        onSelect={onSelect}
        path="M154 63c0-17 12-30 28-30 16 0 28 13 28 30 10 5 17 17 15 30-2 18-18 30-37 30h-16c-19 0-35-12-37-30-2-13 5-25 19-30Z"
      />
      <AnatomyButton
        id="thyroid"
        label="Thyroid"
        selected={selectedOrgan === "thyroid"}
        onSelect={onSelect}
        path="M164 142c8 8 24 8 32 0 7 9 5 24-4 29-7 4-17 4-24 0-9-5-11-20-4-29Z"
      />
      <AnatomyButton
        id="lungs"
        label="Lungs"
        selected={selectedOrgan === "lungs"}
        onSelect={onSelect}
        path="M174 183c-25-27-55-18-67 12-13 32-10 86 9 108 18 21 51 3 58-37V183Zm12 0v83c7 40 40 58 58 37 19-22 22-76 9-108-12-30-42-39-67-12Z"
      />

      <AnatomyButton
        id="heart"
        label="Heart"
        selected={selectedOrgan === "heart"}
        onSelect={onSelect}
        status={heartStatus}
        path="M174 241c-18-22-52-9-52 20 0 35 39 52 58 82 19-30 58-47 58-82 0-29-34-42-52-20l-6 8-6-8Z"
      />

      <AnatomyButton
        id="liver"
        label="Liver"
        selected={selectedOrgan === "liver"}
        onSelect={onSelect}
        path="M102 338c26-31 94-45 138-20 19 11 7 43-19 49-45 10-94 2-124-10-9-4-7-12 5-19Z"
      />
      <AnatomyButton
        id="stomach"
        label="Stomach"
        selected={false}
        onSelect={() => undefined}
        path="M213 323c26 7 45 31 36 61-8 30-37 44-62 31-22-12-21-35-10-52 12-19 23-23 36-40Z"
      />
      <AnatomyButton
        id="pancreas"
        label="Pancreas"
        selected={selectedOrgan === "pancreas"}
        onSelect={onSelect}
        status={pancreasStatus}
        path="M122 390c31-17 94-20 121-4 10 6 7 21-5 24-40 8-85 8-120-1-12-3-8-13 4-19Z"
      />
      <AnatomyButton
        id="spleen"
        label="Spleen"
        selected={false}
        onSelect={() => undefined}
        path="M258 347c17 5 25 25 18 43-7 17-25 24-38 14-13-10-10-31 3-45 5-6 11-11 17-12Z"
      />
      <AnatomyButton
        id="kidneys"
        label="Kidneys"
        selected={selectedOrgan === "kidneys"}
        onSelect={onSelect}
        path="M128 397c-17 0-31 18-31 41 0 24 14 42 31 42 19 0 29-19 26-43-2-23-9-40-26-40Zm104 0c17 0 31 18 31 41 0 24-14 42-31 42-19 0-29-19-26-43 2-23 9-40 26-40Z"
      />
      <AnatomyButton
        id="intestines"
        label="Intestines"
        selected={false}
        onSelect={() => undefined}
        path="M130 448c28-22 72-22 100 0 20 16 24 51 5 76-21 27-88 27-110 0-19-24-15-60 5-76Zm17 36c14-11 51-11 66 0M143 516c24 10 50 10 74 0"
      />
      <AnatomyButton
        id="bladder"
        label="Bladder"
        selected={false}
        onSelect={() => undefined}
        path="M159 550c13-12 29-12 42 0 12 11 11 34-2 45-11 10-27 10-38 0-13-11-14-34-2-45Z"
      />

      <AnatomyButton
        id="bones"
        label="Bones"
        selected={selectedOrgan === "bones"}
        onSelect={onSelect}
        status={bonesStatus}
        path="M180 132v470M128 202c26 12 78 12 104 0M121 224c34 18 84 18 118 0M118 249c40 20 84 20 124 0M138 457c26 19 58 19 84 0M157 476l-20 145M203 476l20 145"
        fill="none"
      />
    </svg>
  );
}

function AnatomyButton({
  id,
  label,
  path,
  selected,
  onSelect,
  status,
  fill = "url(#neutralOrgan)",
}: {
  id: string;
  label: string;
  path: string;
  selected: boolean;
  onSelect: (organ: string) => void;
  status?: StatusColor;
  fill?: string;
}) {
  const alert = status && status !== "green";
  const color = alert ? statusFill(status) : undefined;
  const glow = status === "red" ? "url(#redGlow)" : status === "yellow" ? "url(#yellowGlow)" : undefined;

  return (
    <g>
      <g
        role="button"
        tabIndex={0}
        onClick={() => onSelect(id)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect(id);
          }
        }}
        aria-label={`Open ${label} details`}
      >
        <path
          d={path}
          fill={fill}
          stroke={alert ? color : "#CBD5E1"}
          strokeWidth={alert ? 3.5 : 1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={glow}
          className={alert ? "anatomy-alert" : "transition-opacity duration-200 hover:opacity-100"}
          style={{
            color,
            opacity: alert ? 0.96 : selected ? 0.82 : 0.58,
            cursor: "pointer",
            fill: fill === "none" ? "none" : alert ? color : undefined,
          }}
        />
      </g>
      {selected && (
        <path
          d={path}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.74"
          pointerEvents="none"
        />
      )}
    </g>
  );
}
