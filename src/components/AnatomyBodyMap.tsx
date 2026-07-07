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

type OrganMaskPath = {
  d: string;
  strokeWidth?: number;
};

const maskDesignWidth = 1024;
const maskDesignHeight = 1792;
const imageWidth = anatomyReportMap.width;
const imageHeight = anatomyReportMap.height;
const maskScaleX = imageWidth / maskDesignWidth;
const maskScaleY = imageHeight / maskDesignHeight;

const organMasks: Record<string, { label: string; paths: OrganMaskPath[] }> = {
  heart: {
    label: "Heart and blood vessels",
    paths: [
      { d: "M472 454c-44 15-75 58-75 112 0 75 53 121 115 121 63 0 116-46 116-121 0-56-31-98-76-112-19-6-39-4-56 6-7-5-15-7-24-6Z" },
      { d: "M505 268v220", strokeWidth: 32 },
      { d: "M334 357c24 64 83 107 171 122 88-15 147-58 171-122", strokeWidth: 30 },
      { d: "M230 374c70 62 151 104 250 122", strokeWidth: 24 },
      { d: "M794 374c-70 62-151 104-250 122", strokeWidth: 24 },
    ],
  },
  pancreas: {
    label: "Pancreas",
    paths: [
      { d: "M407 708c45-23 128-30 201-14 42 9 76 28 80 54 4 27-25 48-77 58-65 13-163 3-216-20-38-17-34-54 12-78Z" },
      { d: "M536 650c35-10 79-4 103 17 19 17 14 46-9 56-31 14-91 7-120-12-30-20-17-49 26-61Z" },
    ],
  },
  bones: {
    label: "Bones",
    paths: [
      { d: "M398 104c68-46 160-46 228 0 44 30 67 74 67 125 0 92-74 166-181 166S331 321 331 229c0-51 23-95 67-125Z" },
      { d: "M512 386v293", strokeWidth: 28 },
      { d: "M345 422c104 58 230 58 334 0", strokeWidth: 28 },
      { d: "M330 526c118 62 246 62 364 0", strokeWidth: 24 },
      { d: "M302 655c136 46 284 46 420 0", strokeWidth: 24 },
      { d: "M252 438c-40 114-70 244-96 420", strokeWidth: 28 },
      { d: "M772 438c40 114 70 244 96 420", strokeWidth: 28 },
      { d: "M156 858l-76 134", strokeWidth: 30 },
      { d: "M868 858l76 134", strokeWidth: 30 },
      { d: "M350 888c58 42 266 42 324 0", strokeWidth: 34 },
      { d: "M376 932l-72 470", strokeWidth: 38 },
      { d: "M648 932l72 470", strokeWidth: 38 },
      { d: "M304 1402l-38 226", strokeWidth: 34 },
      { d: "M720 1402l38 226", strokeWidth: 34 },
      { d: "M238 1662c58 22 124 22 184 0", strokeWidth: 30 },
      { d: "M602 1662c60 22 126 22 184 0", strokeWidth: 30 },
    ],
  },
};

function reportFocusOrgans() {
  return memberData.flaggedMarkers
    .map((marker) => {
      const status = memberData.organStatus[marker.organ];

      if (!status || status === "green" || !organMasks[marker.organ]) {
        return null;
      }

      return {
        organ: marker.organ,
        status,
        color: statusStyles[status].fill,
        ...organMasks[marker.organ],
      };
    })
    .filter(Boolean) as Array<{
      organ: string;
      status: StatusColor;
      color: string;
      label: string;
      paths: OrganMaskPath[];
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
        alt="Greyed anatomy body map with report-focused organs"
        priority
        sizes="(max-width: 640px) 258px, 380px"
        className={`h-auto w-full select-none object-contain ${imageClassName}`}
      />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${imageWidth} ${imageHeight}`}
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {focusOrgans.map((organ) => (
            <mask key={organ.organ} id={`organMask-${organ.organ}`} maskUnits="userSpaceOnUse">
              <rect width={imageWidth} height={imageHeight} fill="black" />
              <g transform={`scale(${maskScaleX} ${maskScaleY})`}>
                {organ.paths.map((path, index) => (
                  <path
                    key={`${organ.organ}-${index}`}
                    d={path.d}
                    fill={path.strokeWidth ? "none" : "white"}
                    stroke={path.strokeWidth ? "white" : "none"}
                    strokeWidth={path.strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
              </g>
            </mask>
          ))}
          {focusOrgans.map((organ) => (
            <filter key={`${organ.organ}-glow`} id={`organGlow-${organ.organ}`} x="-35%" y="-35%" width="170%" height="170%">
              <feColorMatrix
                in="SourceGraphic"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -0.72 -0.72 -0.72 0 2.1"
                result="cutout"
              />
              <feDropShadow
                in="cutout"
                dx="0"
                dy="0"
                stdDeviation={organ.organ === "bones" ? 7 : 11}
                floodColor={organ.color}
                floodOpacity={organ.status === "yellow" ? 0.42 : 0.48}
                result="glow"
              />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="cutout" />
              </feMerge>
            </filter>
          ))}
        </defs>
        {focusOrgans.map((organ) => (
          <g key={organ.organ} className="anatomy-real-organ" mask={`url(#organMask-${organ.organ})`}>
            <image
              href={anatomyReportMap.src}
              width={imageWidth}
              height={imageHeight}
              preserveAspectRatio="xMidYMid meet"
              filter={`url(#organGlow-${organ.organ})`}
              style={{ mixBlendMode: "multiply" }}
            />
          </g>
        ))}
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
