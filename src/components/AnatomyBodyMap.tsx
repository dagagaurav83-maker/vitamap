"use client";

import Image from "next/image";
import anatomyReportMap from "../../public/images/anatomy-report-map-v1.png";
import { memberData, statusStyles, type StatusColor } from "@/lib/data";

type AnatomyBodyMapProps = {
  selectedOrgan?: string | null;
  onSelect?: (organ: string) => void;
  className?: string;
  imageClassName?: string;
};

const organPaths: Record<string, { label: string; path: string; strokeWidth?: number }> = {
  heart: {
    label: "Heart",
    path: "M498 560c-44-58-126-20-126 58 0 91 89 129 139 199 52-70 140-108 140-199 0-78-82-116-126-58l-14 20-13-20Z",
  },
  pancreas: {
    label: "Pancreas",
    path: "M394 828c54-34 160-46 234-28 42 10 57 42 31 65-35 31-147 33-243 8-52-13-56-24-22-45Z",
  },
  bones: {
    label: "Bones",
    path:
      "M512 130v350 M281 382c126 68 336 68 462 0 M267 483c146 78 344 78 490 0 M240 652c176 58 368 58 544 0 M358 1092c92 76 216 76 308 0 M385 1140l-82 478 M638 1140l82 478 M265 482L157 970 M759 482l108 488 M162 973l-86 115 M862 973l86 115 M260 1645c-76 34-135 52-203 76 M764 1645c76 34 135 52 203 76 M358 184c92-58 216-58 308 0 M326 287c122 82 250 82 372 0",
    strokeWidth: 12,
  },
};

function reportFocusOrgans() {
  return memberData.flaggedMarkers
    .map((marker) => {
      const status = memberData.organStatus[marker.organ];

      if (!status || status === "green" || !organPaths[marker.organ]) {
        return null;
      }

      return {
        organ: marker.organ,
        status,
        color: statusStyles[status].fill,
        ...organPaths[marker.organ],
      };
    })
    .filter(Boolean) as Array<{
      organ: string;
      status: StatusColor;
      color: string;
      label: string;
      path: string;
      strokeWidth?: number;
    }>;
}

export function AnatomyBodyMap({
  selectedOrgan,
  onSelect,
  className = "h-auto w-[258px] max-w-full sm:h-full sm:max-h-[650px] sm:w-full sm:max-w-[380px]",
  imageClassName = "opacity-34 grayscale contrast-75 saturate-0",
}: AnatomyBodyMapProps) {
  const focusOrgans = reportFocusOrgans();

  return (
    <div className={`relative ${className}`}>
      <Image
        src={anatomyReportMap}
        alt="Greyed anatomy body map with report-focused glowing organs"
        priority
        sizes="(max-width: 640px) 258px, 380px"
        className={`h-auto w-full select-none object-contain ${imageClassName}`}
      />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1024 1792"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {focusOrgans.map((organ) => (
            <filter key={organ.organ} id={`organGlow-${organ.organ}`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation={organ.organ === "bones" ? 8 : 24} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>
        {focusOrgans.map((organ) => {
          const isLine = organ.organ === "bones";

          return (
            <path
              key={organ.organ}
              d={organ.path}
              fill={isLine ? "none" : organ.color}
              stroke={organ.color}
              strokeWidth={organ.strokeWidth ?? 8}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#organGlow-${organ.organ})`}
              className="anatomy-alert"
              opacity={isLine ? 0.38 : 0.88}
            />
          );
        })}
      </svg>
      {focusOrgans.map((organ) => (
        <button
          key={organ.organ}
          type="button"
          onClick={() => onSelect?.(organ.organ)}
          className={`absolute rounded-full transition ${
            selectedOrgan === organ.organ ? "ring-2 ring-white/80 ring-offset-2 ring-offset-transparent" : ""
          }`}
          style={hitTargetStyle(organ.organ)}
          aria-label={`Open ${organ.label} details`}
        />
      ))}
    </div>
  );
}

function hitTargetStyle(organ: string) {
  if (organ === "heart") {
    return { left: "43%", top: "28%", width: "15%", height: "10%" };
  }

  if (organ === "pancreas") {
    return { left: "36%", top: "43%", width: "28%", height: "7%" };
  }

  return { left: "13%", top: "3%", width: "74%", height: "92%" };
}
