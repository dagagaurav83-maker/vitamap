"use client";

import { motion } from "framer-motion";
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
  return (
    <svg
      viewBox="0 0 420 760"
      role="img"
      aria-label="Front-view human body anatomy illustration with skeleton, brain, lungs, heart, liver, stomach, pancreas, kidneys, intestines, bladder and pelvis"
      className="h-auto w-[248px] max-w-full sm:h-full sm:max-h-[650px] sm:w-full sm:max-w-[470px]"
    >
      <defs>
        <filter id="medicalRedGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="medicalYellowGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="skinTone" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFCDBD" />
          <stop offset="100%" stopColor="#F09B8D" />
        </linearGradient>
        <linearGradient id="softOrgan" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#F39B91" />
          <stop offset="100%" stopColor="#C85F5C" />
        </linearGradient>
      </defs>

      <BodySilhouette />
      <SkeletonLayer selectedOrgan={selectedOrgan} onSelect={onSelect} />

      <OrganButton
        id="brain"
        label="Brain"
        selected={selectedOrgan === "brain"}
        onSelect={onSelect}
        fill="#F4A0B7"
        path="M174 50c8-16 27-24 43-15 16-9 36-1 43 15 15 2 26 15 26 31 0 19-15 34-34 34h-84c-19 0-34-15-34-34 0-16 11-29 40-31Z"
      />

      <OrganButton
        id="thyroid"
        label="Thyroid"
        selected={selectedOrgan === "thyroid"}
        onSelect={onSelect}
        fill="#D9A17E"
        path="M190 151c9 9 31 9 40 0 8 8 7 26-5 34-8 6-23 6-31 0-12-8-13-26-4-34Z"
      />

      <OrganButton
        id="lungs"
        label="Lungs"
        selected={selectedOrgan === "lungs"}
        onSelect={onSelect}
        fill="#EC7C74"
        path="M205 207c-34-35-74-23-92 18-20 45-15 116 10 145 25 29 69 8 80-45 5-27 3-75 2-118Zm10 0c-1 43-3 91 2 118 11 53 55 74 80 45 25-29 30-100 10-145-18-41-58-53-92-18Z"
      />

      <OrganButton
        id="heart"
        label="Heart"
        selected={selectedOrgan === "heart"}
        onSelect={onSelect}
        status={memberData.organStatus.heart}
        path="M202 271c-21-26-60-11-60 23 0 42 45 62 68 96 23-34 68-54 68-96 0-34-39-49-60-23l-8 11-8-11Z"
      />

      <OrganButton
        id="liver"
        label="Liver"
        selected={selectedOrgan === "liver"}
        onSelect={onSelect}
        fill="#B94F46"
        path="M113 391c34-42 121-58 175-29 25 13 16 50-18 59-56 15-124 5-161-10-13-5-11-14 4-20Z"
      />

      <OrganButton
        id="stomach"
        label="Stomach"
        selected={false}
        onSelect={() => undefined}
        fill="#D58C8B"
        path="M252 382c34 11 55 43 44 78-11 36-49 54-80 38-28-15-27-44-12-66 13-21 30-29 48-50Z"
      />

      <OrganButton
        id="pancreas"
        label="Pancreas"
        selected={selectedOrgan === "pancreas"}
        onSelect={onSelect}
        status={memberData.organStatus.pancreas}
        path="M124 464c41-23 126-26 163-5 13 8 9 25-7 29-53 11-113 10-160-2-16-4-12-15 4-22Z"
      />

      <OrganButton
        id="spleen"
        label="Spleen"
        selected={false}
        onSelect={() => undefined}
        fill="#9B4C74"
        path="M300 412c19 7 28 31 20 52-8 21-30 31-47 19-17-12-15-37 1-55 7-8 16-14 26-16Z"
      />

      <OrganButton
        id="kidneys"
        label="Kidneys"
        selected={selectedOrgan === "kidneys"}
        onSelect={onSelect}
        fill="#C95F5D"
        path="M151 449c-23 0-41 22-41 53s18 54 41 54c25 0 38-25 34-55-4-29-12-52-34-52Zm118 0c23 0 41 22 41 53s-18 54-41 54c-25 0-38-25-34-55 4-29 12-52 34-52Z"
      />

      <OrganButton
        id="intestines"
        label="Intestines"
        selected={false}
        onSelect={() => undefined}
        fill="#D99D87"
        path="M143 513c35-27 99-27 134 0 29 22 33 73 5 106-29 35-115 35-144 0-28-33-24-84 5-106Zm23 42c24-18 64-18 88 0M158 590c33 14 71 14 104 0M181 530c-20 16-21 49-1 62M239 530c20 16 21 49 1 62"
      />

      <OrganButton
        id="bladder"
        label="Bladder"
        selected={false}
        onSelect={() => undefined}
        fill="#D87872"
        path="M187 638c14-15 32-15 46 0 14 14 13 41-2 54-13 11-29 11-42 0-15-13-16-40-2-54Z"
      />
    </svg>
  );
}

function BodySilhouette() {
  return (
    <g>
      <path
        d="M210 18c37 0 63 28 63 66 0 36-25 65-63 65s-63-29-63-65c0-38 26-66 63-66Z"
        fill="url(#skinTone)"
        opacity="0.98"
        stroke="#D98E83"
        strokeWidth="2"
      />
      <path
        d="M156 151c-45 21-70 65-78 132L49 459c-4 24 11 44 34 47l9 1 39-198 22-74v153l-18 126-10 199c-1 25 16 45 40 45 21 0 38-15 41-37l23-182h12l23 182c3 22 20 37 41 37 24 0 41-20 40-45l-10-199-18-126V235l22 74 39 198 9-1c23-3 38-23 34-47l-29-176c-8-67-33-111-78-132-31-15-52-18-83-18h-42c-31 0-52 3-83 18Z"
        fill="url(#skinTone)"
        opacity="0.94"
        stroke="#D98E83"
        strokeWidth="2"
      />
      <path d="M170 103c20 9 60 9 80 0" fill="none" stroke="#EAAFA6" strokeWidth="3" strokeLinecap="round" />
      <path d="M183 118c18 10 36 10 54 0" fill="none" stroke="#EAAFA6" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function SkeletonLayer({ selectedOrgan, onSelect }: Pick<VitaMapProps, "selectedOrgan" | "onSelect">) {
  const alert = memberData.organStatus.bones !== "green";
  const color = statusFill(memberData.organStatus.bones);

  return (
    <g
      role="button"
      tabIndex={0}
      onClick={() => onSelect("bones")}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect("bones");
        }
      }}
      aria-label="Open Bones details"
      className={alert ? "anatomy-alert" : undefined}
      filter={alert ? "url(#medicalRedGlow)" : undefined}
      opacity={alert ? 1 : 0.84}
      style={{ cursor: "pointer" }}
    >
      <g fill="none" stroke={alert ? color : "#FFF3D8"} strokeLinecap="round" strokeLinejoin="round">
        <path d="M210 145v503" strokeWidth="9" />
        <path d="M154 228c35 16 77 16 112 0" strokeWidth="5" />
        <path d="M146 253c43 20 85 20 128 0" strokeWidth="5" />
        <path d="M140 281c48 23 92 23 140 0" strokeWidth="5" />
        <path d="M153 321c39 14 75 14 114 0" strokeWidth="4" />
        <path d="M164 554c31 24 61 24 92 0" strokeWidth="10" />
        <path d="M187 558l-25 165M233 558l25 165" strokeWidth="8" />
        <path d="M155 154l-45 110M265 154l45 110" strokeWidth="8" />
        <path d="M110 264L82 465M310 264l28 201" strokeWidth="7" />
        <path d="M79 470l-21 41M341 470l21 41" strokeWidth="5" />
        <path d="M165 724c-20 6-35 10-49 20M255 724c20 6 35 10 49 20" strokeWidth="7" />
        <path d="M181 59c23-15 49-15 72 0M170 91c29 19 51 19 80 0" strokeWidth="5" />
      </g>
      {selectedOrgan === "bones" && (
        <g fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" pointerEvents="none">
          <path d="M210 145v503M164 554c31 24 61 24 92 0" strokeWidth="13" opacity="0.8" />
        </g>
      )}
    </g>
  );
}

function OrganButton({
  id,
  label,
  path,
  selected,
  onSelect,
  status,
  fill = "url(#softOrgan)",
}: {
  id: string;
  label: string;
  path: string;
  selected: boolean;
  onSelect: (organ: string) => void;
  status?: StatusColor;
  fill?: string;
}) {
  const alertStatus = status && status !== "green" ? status : null;
  const color = alertStatus ? statusFill(alertStatus) : fill;
  const glow = alertStatus === "red" ? "url(#medicalRedGlow)" : alertStatus === "yellow" ? "url(#medicalYellowGlow)" : undefined;

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
        style={{ cursor: "pointer" }}
      >
        <path
          d={path}
          fill={color}
          stroke={alertStatus ? statusFill(alertStatus) : "#9F6B67"}
          strokeWidth={alertStatus ? 4 : 1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={glow}
          className={alertStatus ? "anatomy-alert" : "transition-opacity duration-200 hover:opacity-100"}
          opacity={alertStatus ? 1 : selected ? 0.94 : 0.86}
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
          opacity="0.86"
          pointerEvents="none"
        />
      )}
    </g>
  );
}
