import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  stacked?: boolean;
  tagline?: string;
  className?: string;
  iconClassName?: string;
  wordClassName?: string;
};

export function BrandLogo({
  href = "/",
  stacked = false,
  tagline,
  className = "",
  iconClassName = "size-9",
  wordClassName = "text-base",
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 ${className}`}
      aria-label="Organix home"
    >
      <OrganixIcon className={iconClassName} />
      {stacked ? (
        <span className="leading-tight">
          <span className={`organix-wordmark block text-[#1D1D1F] ${wordClassName}`}>Organix</span>
          {tagline && <span className="block text-xs text-[#86868B]">{tagline}</span>}
        </span>
      ) : (
        <span className={`organix-wordmark text-[#1D1D1F] ${wordClassName}`}>Organix</span>
      )}
    </Link>
  );
}

export function OrganixIcon({ className = "size-9" }: { className?: string }) {
  return (
    <span className={`inline-grid place-items-center ${className}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" className="h-full w-full" role="img">
        <defs>
          <linearGradient id="organixIconGradient" x1="8" x2="58" y1="12" y2="54">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="52%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
        </defs>
        <path
          d="M23.3 19.2C14.2 22.6 9 33 9 44.5c0 4.1 2.5 7.3 6.1 7.3 7.1 0 12-11.4 12.2-22.5.1-5.6-.9-9.9-4-10.1Z"
          fill="url(#organixIconGradient)"
          opacity="0.92"
        />
        <path
          d="M40.7 19.2c9.1 3.4 14.3 13.8 14.3 25.3 0 4.1-2.5 7.3-6.1 7.3-7.1 0-12-11.4-12.2-22.5-.1-5.6.9-9.9 4-10.1Z"
          fill="url(#organixIconGradient)"
          opacity="0.92"
        />
        <path
          d="M32 9v24.4m0 0c-5.8 4.5-8.8 9.9-8.8 16.4 0 4.7 2.2 8.1 5.2 10.2-.9-8.3 1.1-14.3 6-18.2 2.9-2.3 4.7-5 5.4-8.2-1.8 1.6-4.4 1.6-7.8-.2Zm0 0c5.8 4.5 8.8 9.9 8.8 16.4 0 4.7-2.2 8.1-5.2 10.2.9-8.3-1.1-14.3-6-18.2-2.9-2.3-4.7-5-5.4-8.2 1.8 1.6 4.4 1.6 7.8-.2Z"
          fill="none"
          stroke="url(#organixIconGradient)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <path
          d="M8.5 32C10.8 18.8 20 9.8 31 8M56 32C53.7 18.8 44.5 9.8 33.5 8M8.5 37.5h5M50.5 37.5h5M14 52.5c3.5 2.5 8 4 13.2 4M50 52.5c-3.5 2.5-8 4-13.2 4"
          fill="none"
          stroke="url(#organixIconGradient)"
          strokeLinecap="round"
          strokeWidth="4"
        />
      </svg>
    </span>
  );
}
