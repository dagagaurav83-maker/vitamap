import Link from "next/link";
import Image from "next/image";
import organixLogo from "../../public/images/organix-logo-horizontal.png";

type BrandLogoProps = {
  href?: string;
  stacked?: boolean;
  tagline?: string;
  className?: string;
  logoClassName?: string;
};

export function BrandLogo({
  href = "/",
  stacked = false,
  tagline,
  className = "",
  logoClassName = "h-12 w-auto",
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center ${className}`}
      aria-label="Organix home"
    >
      {stacked ? (
        <span className="inline-flex flex-col gap-1 leading-tight">
          <LogoImage className={logoClassName} />
          {tagline && <span className="block text-xs text-[#86868B]">{tagline}</span>}
        </span>
      ) : (
        <LogoImage className={logoClassName} />
      )}
    </Link>
  );
}

export function LogoImage({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <Image
      src={organixLogo}
      alt="Organix"
      className={className}
      priority
    />
  );
}
