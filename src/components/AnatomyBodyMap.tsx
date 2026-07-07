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
      { d: "M408 357h208c39 0 70 31 70 70v254c0 39-31 70-70 70H408c-39 0-70-31-70-70V427c0-39 31-70 70-70Z" },
      { d: "M134 385c72 6 130 58 146 128l82 356c12 51-20 101-71 113-51 12-101-20-113-71L91 533c-17-74-1-127 43-148Z" },
      { d: "M890 385c-72 6-130 58-146 128l-82 356c-12 51 20 101 71 113 51 12 101-20 113-71l87-378c17-74 1-127-43-148Z" },
      { d: "M319 857c66-18 133 22 149 88l101 427c16 66-25 133-91 148-66 16-132-25-148-91l-101-427c-16-66 24-129 90-145Z" },
      { d: "M705 857c-66-18-133 22-149 88l-101 427c-16 66 25 133 91 148 66 16 132-25 148-91l101-427c16-66-24-129-90-145Z" },
      { d: "M246 1394h196c42 0 76 34 76 76v242c0 42-34 76-76 76H246c-42 0-76-34-76-76v-242c0-42 34-76 76-76Z" },
      { d: "M582 1394h196c42 0 76 34 76 76v242c0 42-34 76-76 76H582c-42 0-76-34-76-76v-242c0-42 34-76 76-76Z" },
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
        viewBox="0 0 1024 1792"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {focusOrgans.map((organ) => (
            <mask key={organ.organ} id={`organMask-${organ.organ}`} maskUnits="userSpaceOnUse">
              <rect width="1024" height="1792" fill="black" />
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
              width="1024"
              height="1792"
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
