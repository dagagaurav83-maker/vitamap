"use client";

import Image from "next/image";
import anatomyReportMap from "../../public/images/anatomy-report-map-v1.png";
import heartLayer from "../../public/images/organ-layer-heart.png";
import pancreasLayer from "../../public/images/organ-layer-pancreas.png";
import bonesLayer from "../../public/images/organ-layer-bones.png";
import { memberData, statusStyles, type StatusColor } from "@/lib/data";

type AnatomyBodyMapProps = {
  selectedOrgan?: string | null;
  onSelect?: (organ: string) => void;
  className?: string;
  imageClassName?: string;
};

const organLayers = {
  heart: {
    label: "Heart and blood vessels",
    image: heartLayer,
  },
  pancreas: {
    label: "Pancreas",
    image: pancreasLayer,
  },
  bones: {
    label: "Bones",
    image: bonesLayer,
  },
} as const;

function reportFocusOrgans() {
  return memberData.flaggedMarkers
    .map((marker) => {
      const status = memberData.organStatus[marker.organ];

      if (!status || status === "green" || !(marker.organ in organLayers)) {
        return null;
      }

      const layer = organLayers[marker.organ as keyof typeof organLayers];

      return {
        organ: marker.organ,
        status,
        color: statusStyles[status].fill,
        ...layer,
      };
    })
    .filter(Boolean) as Array<{
      organ: string;
      status: StatusColor;
      color: string;
      label: string;
      image: typeof heartLayer;
    }>;
}

export function AnatomyBodyMap({
  selectedOrgan,
  onSelect,
  className = "h-auto w-[258px] max-w-full sm:h-full sm:max-h-[650px] sm:w-full sm:max-w-[380px]",
  imageClassName = "opacity-55 grayscale contrast-90 saturate-0",
}: AnatomyBodyMapProps) {
  const focusOrgans = reportFocusOrgans();

  return (
    <div className={`relative ${className}`}>
      <Image
        src={anatomyReportMap}
        alt="Black-and-white anatomy body map with report-focused organs"
        priority
        sizes="(max-width: 640px) 258px, 380px"
        className={`h-auto w-full select-none object-contain ${imageClassName}`}
      />
      {focusOrgans.map((organ) => (
        <Image
          key={organ.organ}
          src={organ.image}
          alt=""
          aria-hidden="true"
          sizes="(max-width: 640px) 258px, 380px"
          className={`anatomy-organ-layer anatomy-organ-layer-${organ.status} pointer-events-none absolute inset-0 h-auto w-full select-none object-contain`}
          style={{ ["--organ-glow" as string]: organ.color }}
        />
      ))}
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
